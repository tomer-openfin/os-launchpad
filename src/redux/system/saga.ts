import { call, put, takeEvery } from 'redux-saga/effects';

import { unbindFinAppEventHanlders } from '../../utils/finAppEventHandlerHelpers';
import { getSystemMonitorInfo } from '../../utils/openfinPromises';
import { reboundLauncherRequest } from '../application';
import { closeFinAppSuccess } from '../apps';
import { recoverLostWindows } from '../windows';
import {
  GET_AND_SET_MONITOR_INFO,
  getAndSetMonitorInfoError,
  getAndSetMonitorInfoSuccess,
  SET_MONITOR_INFO,
  setMonitorInfo,
  SYSTEM_EVENT_APPLICATION_CLOSED,
  SYSTEM_EVENT_APPLICATION_CRASHED,
} from './actions';
import { SystemEventApplicationClosedAction, SystemEventApplicationCrashedAction } from './types';

function* watchGetAndSetMonitorInfo() {
  try {
    const systemMonitorInfo = yield call(getSystemMonitorInfo);
    yield put(setMonitorInfo(systemMonitorInfo));
    yield put(getAndSetMonitorInfoSuccess(systemMonitorInfo));
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log('Failed to get/set monitor information:', e);
    yield put(getAndSetMonitorInfoError(e));
  }
}

function* watchSetMonitorInfo() {
  yield put(reboundLauncherRequest(false, 0));
  yield put(recoverLostWindows());
}

function* watchSystemEventApplicationClosed(action: SystemEventApplicationClosedAction) {
  const eventPayload = action.payload;

  if (!eventPayload) {
    return;
  }

  const { uuid } = eventPayload;
  unbindFinAppEventHanlders(uuid);
  yield put(closeFinAppSuccess({ uuid }));
}

function* watchSystemEventApplicationCrashed(action: SystemEventApplicationCrashedAction) {
  const eventPayload = action.payload;

  if (!eventPayload) {
    return;
  }

  const { uuid } = eventPayload;
  unbindFinAppEventHanlders(uuid);
  yield put(closeFinAppSuccess({ uuid }));
}

// function* watchSystemEventApplicationStarted(action: SystemEventApplicationStartedAction) {
//   const eventPayload = action.payload;

//   if (!eventPayload) {
//     return;
//   }

//   const { uuid } = eventPayload;
// }

export function* systemSaga() {
  yield takeEvery(GET_AND_SET_MONITOR_INFO.REQUEST, watchGetAndSetMonitorInfo);
  yield takeEvery(SET_MONITOR_INFO, watchSetMonitorInfo);
  yield takeEvery(SYSTEM_EVENT_APPLICATION_CLOSED, watchSystemEventApplicationClosed);
  yield takeEvery(SYSTEM_EVENT_APPLICATION_CRASHED, watchSystemEventApplicationCrashed);
  // yield takeEvery(SYSTEM_EVENT_APPLICATION_STARTED, watchSystemEventApplicationStarted);
}
