import { all, call, CallEffectDescriptor, put, select, SimpleEffect, takeEvery, takeLatest } from 'redux-saga/effects';

import { MonitorDetails, OpenFinWindow, WindowDetail, WindowInfo } from '../../types/fin';
import { UnPromisfy } from '../../types/utils';
import { getBoundsMoveIntoCoordinates, isBoundsInCoordinates, RESIZE_OFFSET_X, RESIZE_OFFSET_Y } from '../../utils/coordinateHelpers';
import { unbindFinAppEventHanlders } from '../../utils/finAppEventHandlerHelpers';
import getOwnUuid from '../../utils/getOwnUuid';
import { getSystemAllWindows, getSystemMachineId, getSystemMonitorInfo, getWindowBounds, wrapWindow } from '../../utils/openfinPromises';
import { reboundLauncher } from '../application';
import { closeFinApp } from '../apps';
import { getMonitorDetailsDerivedByUserSettings } from '../selectors';
import { getErrorFromCatch } from '../utils';
import { recoverLostWindows } from '../windows';
import { getAllWindows, getAndSetMonitorInfo, getMachineId, setMonitorInfo, systemEventApplicationClosed, systemEventApplicationCrashed } from './actions';
import { getMonitorDetails } from './selectors';

function* watchGetAllWindowsRequest() {
  try {
    // select monitor details from state
    const monitorDetails: ReturnType<typeof getMonitorDetails> = yield select(getMonitorDetails);
    const launcherMonitorDetails: ReturnType<typeof getMonitorDetailsDerivedByUserSettings> = yield select(getMonitorDetailsDerivedByUserSettings);
    if (!monitorDetails.length || !launcherMonitorDetails) {
      throw new Error('monitorDetails and launcherMonitorDetails are required to recover windows');
    }

    const allWindows: WindowInfo[] = yield call(getSystemAllWindows);
    yield put(getAllWindows.success(allWindows));

    // filter out service windows and internal windows
    const NOTIFICATIONS_UUID = 'notifications-service';
    const LAYOUTS_UUID = 'layouts-service';

    const result = allWindows.reduce((acc: Array<SimpleEffect<'CALL', CallEffectDescriptor>>, el: WindowInfo) => {
      if (el.uuid === NOTIFICATIONS_UUID || el.uuid === LAYOUTS_UUID) {
        return acc;
      }

      const main =
        el.mainWindow.name !== getOwnUuid()
          ? [call(watchMoveAndResizeWindowIntoCoordinates, { ...el.mainWindow, uuid: el.uuid }, monitorDetails, launcherMonitorDetails)]
          : [];

      // move and resize all the windows together in unison
      return [
        ...acc,
        ...el.childWindows.map(child => call(watchMoveAndResizeWindowIntoCoordinates, { ...child, uuid: el.uuid }, monitorDetails, launcherMonitorDetails)),
        ...main,
      ];
    }, []);

    yield all(result);
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Failed to getAllWindows in watchGetAllWindowsRequest:', e);
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
    // tslint:disable-next-line:no-console
    console.log('Failed to get machineId:', e);
    yield put(getMachineId.failure(e));
  }
}

function* watchGetAndSetMonitorInfo() {
  try {
    const systemMonitorInfo: UnPromisfy<ReturnType<typeof getSystemMonitorInfo>> = yield call(getSystemMonitorInfo);
    yield put(setMonitorInfo(systemMonitorInfo));
    yield put(getAndSetMonitorInfo.success(systemMonitorInfo));
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log('Failed to get/set monitor information:', e);
    yield put(getAndSetMonitorInfo.failure(e));
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

export function* systemSaga() {
  yield takeEvery(getMachineId.request, watchGetMachineId);
  yield takeEvery(getAndSetMonitorInfo.request, watchGetAndSetMonitorInfo);
  yield takeEvery(setMonitorInfo, watchSetMonitorInfo);
  yield takeEvery(systemEventApplicationClosed, watchSystemEventApplicationClosed);
  yield takeEvery(systemEventApplicationCrashed, watchSystemEventApplicationCrashed);
  // yield takeEvery(SYSTEM_EVENT_APPLICATION_STARTED, watchSystemEventApplicationStarted);
  yield takeLatest(getAllWindows.request, watchGetAllWindowsRequest);
}
