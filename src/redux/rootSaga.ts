import { all } from 'redux-saga/effects';

import { applicationSaga } from './application';
import { appsSaga } from './apps';
import { layoutsSaga } from './layouts';
import { meSaga } from './me';
import { windowsSaga } from './windows';

export default function* rootSaga() {
  yield all([
    applicationSaga(),
    appsSaga(),
    layoutsSaga(),
    meSaga(),
    windowsSaga(),
  ]);
}
