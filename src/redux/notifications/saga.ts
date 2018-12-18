import { call, takeEvery } from 'redux-saga/effects';

import { TOGGLE_NOTIFICATION_CENTER } from './actions';
import { toggleNotificatonCenter } from './utils';

function* watchToggleNotificationCenterRequest() {
  yield call(toggleNotificatonCenter);
}

export function* notificationsSaga() {
  yield takeEvery(TOGGLE_NOTIFICATION_CENTER.REQUEST, watchToggleNotificationCenterRequest);
}
