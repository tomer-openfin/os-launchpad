import { all, call, CallEffectDescriptor, put, select, SimpleEffect, takeEvery, takeLatest } from 'redux-saga/effects';

import { MonitorDetails, OpenFinWindow, WindowDetail, WindowInfo } from '../../types/fin';
import { UnPromisfy } from '../../types/utils';
import { getBoundsMoveIntoCoordinates, isBoundsInCoordinates, RESIZE_OFFSET_X, RESIZE_OFFSET_Y } from '../../utils/coordinateHelpers';
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

function* watchGetAllWindowsRequest2() {
  try {
    // select monitor details from state
    const monitorDetails: ReturnType<typeof getMonitorDetails> = yield select(getMonitorDetails);
    const launcherMonitorDetails: ReturnType<typeof getMonitorDetailsDerivedByUserSettings> = yield select(getMonitorDetailsDerivedByUserSettings);
    if (!monitorDetails.length || !launcherMonitorDetails) {
      throw new Error('monitorDetails and launcherMonitorDetails are required to recover windows');
    }
    console.log('monitor deets', launcherMonitorDetails);

    const allWindows: WindowInfo[] = yield call(getSystemAllWindows);
    yield put(getAllWindows.success(allWindows));

    // filter out service windows and internal windows
    const NOTIFICATIONS_UUID = 'notifications-service';
    const LAYOUTS_UUID = 'layouts-service';

    /// DRAFT
    const memoizedGroupedWindows = {};
    const ungroupedWindows: Array<SimpleEffect<'CALL', CallEffectDescriptor>> = [];
    const groupedWindows: any[] = [];

    for (const el of allWindows) {
      if (el.uuid === NOTIFICATIONS_UUID || el.uuid === LAYOUTS_UUID) {
        continue;
      }

      const combinedWindows = [
        ...(el.mainWindow.name !== getOwnUuid() ? [{ ...el.mainWindow, uuid: el.uuid, idName: `${el.uuid}::${el.mainWindow.name}` }] : []),
        ...el.childWindows.map((childWin: WindowDetail) => ({ ...childWin, uuid: el.uuid, idName: `${el.uuid}::${childWin.name}` })),
      ];

      for (const targetWindow of combinedWindows) {
        if (memoizedGroupedWindows[targetWindow.idName]) {
          console.log('memoized reject', targetWindow, memoizedGroupedWindows);
          continue;
        }
        const wrappedWindow: OpenFinWindow = yield call(wrapWindow, { uuid: targetWindow.uuid, name: targetWindow.name });
        const groupArr: OpenFinWindow[] = yield call(getWindowGroup, wrappedWindow);
        console.log('group arr is', groupArr);
        if (groupArr.length) {
          groupArr.forEach(gw => (memoizedGroupedWindows[`${gw.uuid}::${gw.name}`] = gw));
          // add to memoize
          // map into calls and push onto grouped windows.
          groupedWindows.push(groupArr);
        }
        ungroupedWindows.push(call(watchMoveAndResizeWindowIntoCoordinates, { ...targetWindow, uuid: el.uuid }, monitorDetails, launcherMonitorDetails));

        // ungroupedWindows.push(call(watchMoveAndResizeWindowIntoCoordinates, { ...targetWindow uuid: el.uuid }, monitorDetails, launcherMonitorDetails))
      }
    }
    console.log('grouped:', groupedWindows);
    console.log('ungrouped:', ungroupedWindows);
    console.log('memoizedGrouped:', memoizedGroupedWindows);
    yield all(ungroupedWindows);
    // reduce into:
    // {
    //   grouped: [[windows]],
    //   ungrouped: [window, window]
    // }

    // console log the groups, move the rest as is.

    /// END DRAFT

    // const result = allWindows.reduce((acc: Array<SimpleEffect<'CALL', CallEffectDescriptor>>, el: WindowInfo) => {
    //   if (el.uuid === NOTIFICATIONS_UUID || el.uuid === LAYOUTS_UUID) {
    //     return acc;
    //   }

    //   // const combinedWindows = [...(el.mainWindow.name !== getOwnUuid() ? [el.mainWindow] : []), ...el.childWindows];
    //   // const memoizedGroupedWindows = {};
    //   // const ungroupedWindows = [];
    //   // const groupedWindows = [];
    //   // // use reduce here?
    //   // for (const win of combinedWindows) {
    //   //   if (memoizedGroupedWindows[win.name])
    //   //   //check if grouped.
    //   //     // if no, add to ungrouped
    //   //     // if yes, memoize the window names of each grouped window.  add the group array to groupedWindows.

    //   // }

    //   const main =
    //     el.mainWindow.name !== getOwnUuid()
    //       ? [call(watchMoveAndResizeWindowIntoCoordinates, { ...el.mainWindow, uuid: el.uuid }, monitorDetails, launcherMonitorDetails)]
    //       : [];

    //   // move and resize all the windows together in unison
    //   return [
    //     ...acc,
    //     ...el.childWindows.map(child => call(watchMoveAndResizeWindowIntoCoordinates, { ...child, uuid: el.uuid }, monitorDetails, launcherMonitorDetails)),
    //     ...main,
    //   ];
    // }, []);

    // yield all(result);
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getAllWindows.failure(error));
  }
}

function* watchMoveAndResizeWindowIntoCoordinates(
  targetWindow: WindowDetail & { uuid: WindowInfo['uuid'] },
  monitorDetails: MonitorDetails[],
  launcherMonitorDetails: MonitorDetails,
) {
  const { availableRect } = launcherMonitorDetails;

  const bounds = {
    height: targetWindow.height,
    left: targetWindow.left,
    top: targetWindow.top,
    width: targetWindow.width,
  };

  const foundMonitorDetails = monitorDetails.find(monitorDetail => isBoundsInCoordinates(bounds, monitorDetail.monitorRect));
  // If window is still within one of the monitors bounds
  // No need to do anything, bail
  if (foundMonitorDetails) {
    return;
  }

  const wrappedWindow: OpenFinWindow = yield call(wrapWindow, { uuid: targetWindow.uuid, name: targetWindow.name });
  // @TODO - resize GROUP
  // resize window if necessary
  if (bounds.width > availableRect.right || bounds.height > availableRect.bottom) {
    yield call(
      [wrappedWindow, wrappedWindow.resizeTo],
      Math.min(bounds.width, availableRect.right - RESIZE_OFFSET_X),
      Math.min(bounds.height, availableRect.bottom - RESIZE_OFFSET_Y),
      'top-left',
    );
  }

  const newBounds = yield call(getWindowBounds, wrappedWindow);

  // If monitor does not fall within one of the monitor bounds
  // Recover to where the launcher is
  const { left, top } = getBoundsMoveIntoCoordinates(newBounds, availableRect);

  yield call([wrappedWindow, wrappedWindow.moveTo], left, top);
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
