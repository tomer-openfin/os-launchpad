import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { UnPromisfy } from '../../types/utils';
import { unbindFinAppEventHanlders } from '../../utils/finAppEventHandlerHelpers';
import getOwnUuid from '../../utils/getOwnUuid';
import {
  getSystemAllWindows,
  getSystemMachineId,
  getSystemMonitorInfo,
  getWindowBounds,
  getWindowGroup,
  getWindowIsShowingPromise,
  wrapWindow,
} from '../../utils/openfinPromises';
import { reboundLauncher } from '../application';
import { closeFinApp } from '../apps';
import { getMonitorDetailsDerivedByUserSettings } from '../selectors';
import { getErrorFromCatch } from '../utils';
import { recoverLostWindows } from '../windows';
import {
  getAllWindows,
  getAndSetMonitorInfo,
  getMachineId,
  setMonitorInfo,
  storeAllSystemWindows,
  systemEventApplicationClosed,
  systemEventApplicationCrashed,
  systemEventWindowCreated,
  systemWindowCreatedWithDetails,
} from './actions';
import { getMonitorDetails, getSystem } from './selectors';
import { SystemWindow } from './types';
import { gatherWindows } from './utils';

function* watchGetAllWindowsRequest() {
  try {
    const systemState = yield select(getSystem);

    const monitorDetails: ReturnType<typeof getMonitorDetails> = yield select(getMonitorDetails);
    const launcherMonitorDetails: ReturnType<typeof getMonitorDetailsDerivedByUserSettings> = yield select(getMonitorDetailsDerivedByUserSettings);
    if (!monitorDetails.length || !launcherMonitorDetails) {
      throw new Error('monitorDetails and launcherMonitorDetails are required to recover windows');
    }
    console.log('monitor deets', launcherMonitorDetails);

    yield call(gatherWindows, monitorDetails, launcherMonitorDetails);
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getAllWindows.failure(error));
  }
}

function* watchGetMachineId() {
  try {
    const machineId: UnPromisfy<ReturnType<typeof getSystemMachineId>> = yield call(getSystemMachineId);

    yield put(getMachineId.success({ machineId }));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getMachineId.failure(error));
  }
}

function* watchGetAndSetMonitorInfo() {
  try {
    const systemMonitorInfo: UnPromisfy<ReturnType<typeof getSystemMonitorInfo>> = yield call(getSystemMonitorInfo);
    yield put(setMonitorInfo(systemMonitorInfo));
    yield put(getAndSetMonitorInfo.success(systemMonitorInfo));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getAndSetMonitorInfo.failure(error));
  }
}

function* watchSetMonitorInfo() {
  try {
    yield put(reboundLauncher.request({ shouldAnimate: false, delay: 0 }));
    yield put(recoverLostWindows());
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchSetMonitorInfo', error);
  }
}

function* watchSystemEventApplicationClosed(action: ReturnType<typeof systemEventApplicationClosed>) {
  try {
    const { uuid } = action.payload;
    unbindFinAppEventHanlders(uuid);
    yield put(closeFinApp.success({ uuid }));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchSystemEventApplicationClosed', error);
  }
}

function* watchSystemEventApplicationCrashed(action: ReturnType<typeof systemEventApplicationCrashed>) {
  try {
    const { uuid } = action.payload;
    unbindFinAppEventHanlders(uuid);
    yield put(closeFinApp.success({ uuid }));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchSystemEventApplicationCrashed', error);
  }
}

// function* watchSystemEventApplicationStarted(action: SystemEventApplicationStartedAction) {
//   const eventPayload = action.payload;

//   if (!eventPayload) {
//     return;
//   }

//   const { uuid } = eventPayload;
// }

function* watchStoreAllSystemWindows() {
  try {
    const allWindows: UnPromisfy<ReturnType<typeof getSystemAllWindows>> = yield call(getSystemAllWindows);
    const systemWindows = allWindows.reduce(
      (acc, windowInfo) => {
        const { childWindows, mainWindow, uuid } = windowInfo;

        if (uuid === getOwnUuid()) {
          return acc;
        }

        acc.push({ ...mainWindow, uuid });

        childWindows.forEach(windowDetail => {
          acc.push({ ...windowDetail, uuid });
        });
        return acc;
      },
      [] as SystemWindow[],
    );
    const systemWindowsWithIsGrouped = yield Promise.all(
      systemWindows.map(async systemWindow => {
        try {
          const finWindow = await wrapWindow(systemWindow);
          const group = await getWindowGroup(finWindow);
          return {
            ...systemWindow,
            isGrouped: !!group.length,
          };
        } catch (e) {
          return systemWindow;
        }
      }),
    );

    yield put(storeAllSystemWindows.success(systemWindowsWithIsGrouped));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(storeAllSystemWindows.failure(error));
  }
}

function* watchSystemEventWindowCreated(action: ReturnType<typeof systemEventWindowCreated>) {
  try {
    const { name, uuid } = action.payload;
    const finWindow: UnPromisfy<ReturnType<typeof wrapWindow>> = yield call(wrapWindow, { name, uuid });
    const [bounds, isShowing]: [UnPromisfy<ReturnType<typeof getWindowBounds>>, UnPromisfy<ReturnType<typeof getWindowIsShowingPromise>>] = yield all([
      call(getWindowBounds, finWindow),
      call(getWindowIsShowingPromise, finWindow),
    ]);
    yield put(
      systemWindowCreatedWithDetails({
        height: bounds ? bounds.height : 0,
        isShowing: !!isShowing,
        left: bounds ? bounds.left : 0,
        name,
        top: bounds ? bounds.top : 0,
        uuid,
        width: bounds ? bounds.width : 0,
      }),
    );
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchSystemEventWindowCreated', error);
  }
}

export function* systemSaga() {
  yield takeEvery(getMachineId.request, watchGetMachineId);
  yield takeEvery(getAndSetMonitorInfo.request, watchGetAndSetMonitorInfo);
  yield takeEvery(setMonitorInfo, watchSetMonitorInfo);
  yield takeEvery(systemEventApplicationClosed, watchSystemEventApplicationClosed);
  yield takeEvery(systemEventApplicationCrashed, watchSystemEventApplicationCrashed);
  // yield takeEvery(SYSTEM_EVENT_APPLICATION_STARTED, watchSystemEventApplicationStarted);
  yield takeEvery(systemEventWindowCreated, watchSystemEventWindowCreated);
  yield takeLatest(getAllWindows.request, watchGetAllWindowsRequest);
  yield takeLatest(storeAllSystemWindows.request, watchStoreAllSystemWindows);
}
