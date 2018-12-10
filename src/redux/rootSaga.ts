import { all } from 'redux-saga/effects';

import { adminSaga } from './admin';
import { applicationSaga } from './application';
import { appsSaga } from './apps';
import { contextMenuSaga } from './contextMenu';
import { globalHotkeysSaga } from './globalHotkeys';
import { layoutsSaga } from './layouts';
import { meSaga } from './me';
import { notificationsSaga } from './notifications';
import { windowsSaga } from './windows';

export default function* rootSaga() {
  yield all([adminSaga(), applicationSaga(), appsSaga(), contextMenuSaga(), layoutsSaga(), meSaga(), notificationsSaga(), globalHotkeysSaga(), windowsSaga()]);
}
