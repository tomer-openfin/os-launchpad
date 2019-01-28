import { put, takeEvery } from 'redux-saga/effects';

import { unbindFinAppEventHanlders } from '../../utils/finAppEventHandlerHelpers';
import { reboundLauncherRequest } from '../application/index';
import { closeFinAppSuccess } from '../apps/index';
import { SET_MONITOR_INFO, SYSTEM_EVENT_APPLICATION_CLOSED, SYSTEM_EVENT_APPLICATION_CRASHED, SYSTEM_EVENT_APPLICATION_STARTED } from './actions';
import { SystemEventApplicationClosedAction, SystemEventApplicationCrashedAction, SystemEventApplicationStartedAction } from './types';

function* watchSetMonitorInfo() {
  yield put(reboundLauncherRequest(false, 0));
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
  yield takeEvery(SET_MONITOR_INFO, watchSetMonitorInfo);
  yield takeEvery(SYSTEM_EVENT_APPLICATION_CLOSED, watchSystemEventApplicationClosed);
  yield takeEvery(SYSTEM_EVENT_APPLICATION_CRASHED, watchSystemEventApplicationCrashed);
  // yield takeEvery(SYSTEM_EVENT_APPLICATION_STARTED, watchSystemEventApplicationStarted);
}
