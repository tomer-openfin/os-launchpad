import { takeLatest } from 'redux-saga/effects';
import { APPLICATION_STARTED, OPENFIN_READY } from './';

function* applicationStart() {
  console.log('application started');
}

function* openfinSetup() {
  console.log('openfin ready');
}

export function* applicationSaga() {
  yield takeLatest(APPLICATION_STARTED, applicationStart);
  yield takeLatest(OPENFIN_READY, openfinSetup);
}
