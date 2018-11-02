import { all } from 'redux-saga/effects';

import { applicationSaga } from './application/index';
import { meSaga } from './me/index';
import { windowsSaga } from './windows/index';

export default function* rootSaga() {
  yield all([
    applicationSaga(),
    meSaga(),
    windowsSaga(),
  ]);
}
