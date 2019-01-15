import { put, takeLatest } from 'redux-saga/effects';

import { reboundLauncherRequest } from '../application/index';
import { SET_MONITOR_INFO } from './actions';

function* watchSetMonitorInfo() {
  yield put(reboundLauncherRequest(false, 0));
}

export function* systemSaga() {
  yield takeLatest(SET_MONITOR_INFO, watchSetMonitorInfo);
}
