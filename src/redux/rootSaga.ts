import { all } from 'redux-saga/effects';

import { adminSaga } from './admin';
import { applicationSaga } from './application';
import { appsSaga } from './apps';
import { channelsSaga } from './channels';
import { contextMenuSaga } from './contextMenu';
import { globalHotkeysSaga } from './globalHotkeys';
import { layoutsSaga } from './layouts';
import { meSaga } from './me';
import { notificationsSaga } from './notifications';
import { organizationSaga } from './organization';
import { supportSaga } from './support';
import { systemSaga } from './system';
import { asyncActionsSaga } from './utils';
import { windowsSaga } from './windows';

export default function* rootSaga() {
  yield all([
    adminSaga(),
    applicationSaga(),
    appsSaga(),
    channelsSaga(),
    contextMenuSaga(),
    globalHotkeysSaga(),
    layoutsSaga(),
    meSaga(),
    notificationsSaga(),
    organizationSaga(),
    supportSaga(),
    systemSaga(),
    windowsSaga(),
    asyncActionsSaga(),
  ]);
}
