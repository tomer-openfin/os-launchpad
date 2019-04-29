import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { UnPromisfy } from '../../types/utils';
import { unbindFinAppEventHanlders } from '../../utils/finAppEventHandlerHelpers';
import { getAllSystemWindows, getSystemMachineId, getSystemMonitorInfo, getWindowBounds, getWindowGroup, isWindowShowing } from '../../utils/finUtils';
import getOwnUuid from '../../utils/getOwnUuid';
import { reboundLauncher, toggleAppIsShowing } from '../application';
import { closeFinApp } from '../apps';
import { getMonitorDetailsDerivedByUserSettings } from '../selectors';
import { getErrorFromCatch } from '../utils';
import { recoverLostWindows } from '../windows';
import {
  gatherAllWindows,
  getAndSetMonitorInfo,
  getMachineId,
  setMonitorInfo,
  storeAllSystemWindows,
  systemEventApplicationClosed,
  systemEventApplicationCrashed,
  systemEventApplicationTrayIconClicked,
  systemEventWindowCreated,
  systemWindowCreatedWithDetails,
} from './actions';
import { getMonitorDetails } from './selectors';
import { SystemWindow } from './types';
import { gatherWindows } from './utils';

function* watchGatherAllWindowsRequest() {
  try {
    const monitorDetails: ReturnType<typeof getMonitorDetails> = yield select(getMonitorDetails);
    const launcherMonitorDetails: ReturnType<typeof getMonitorDetailsDerivedByUserSettings> = yield select(getMonitorDetailsDerivedByUserSettings);
    if (!monitorDetails.length || !launcherMonitorDetails) {
      throw new Error('monitorDetails and launcherMonitorDetails are required to recover windows');
    }

    yield call(gatherWindows, monitorDetails, launcherMonitorDetails);
    yield put(gatherAllWindows.success());
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(gatherAllWindows.failure(error));
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

function* watchSystemEventApplicationTrayIconClicked() {
  try {
    yield put(toggleAppIsShowing());
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchSystemEventApplicationTrayIconClicked', error);
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
    const allWindows: UnPromisfy<ReturnType<typeof getAllSystemWindows>> = yield call(getAllSystemWindows);
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
          const group = await getWindowGroup(systemWindow)();
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
    const { uuid } = action.payload;
    const [bounds, isShowing]: [
      UnPromisfy<ReturnType<ReturnType<typeof getWindowBounds>>>,
      UnPromisfy<ReturnType<ReturnType<typeof isWindowShowing>>>
    ] = yield all([call(getWindowBounds(action.payload)), call(isWindowShowing(action.payload))]);
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
  yield takeEvery(systemEventApplicationTrayIconClicked, watchSystemEventApplicationTrayIconClicked);
  // yield takeEvery(SYSTEM_EVENT_APPLICATION_STARTED, watchSystemEventApplicationStarted);
  yield takeEvery(systemEventWindowCreated, watchSystemEventWindowCreated);
  yield takeLatest(gatherAllWindows.request, watchGatherAllWindowsRequest);
  yield takeLatest(storeAllSystemWindows.request, watchStoreAllSystemWindows);
}
