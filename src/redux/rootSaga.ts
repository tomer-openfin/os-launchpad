import { all } from 'redux-saga/effects';

import { adminSaga } from './admin';
import { applicationSaga } from './application';
import { appsSaga } from './apps';
import { contextMenuSaga } from './contextMenu';
import { globalHotkeysSaga } from './globalHotkeys';
import { layoutsSaga } from './layouts';
import { meSaga } from './me';
import { notificationsSaga } from './notifications';
import { organizationSaga } from './organization';
import { systemSaga } from './system';
import { windowsSaga } from './windows';

export default function* rootSaga() {
  yield all([
    adminSaga(),
    applicationSaga(),
    appsSaga(),
    contextMenuSaga(),
    globalHotkeysSaga(),
    layoutsSaga(),
    meSaga(),
    notificationsSaga(),
    organizationSaga(),
    systemSaga(),
    windowsSaga(),
  ]);
}
