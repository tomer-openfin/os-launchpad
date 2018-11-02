import { put, takeEvery } from 'redux-saga/effects';

import {
  APPLICATION_STARTED,
  OPENFIN_READY,
  OpenfinReadyAction,
} from './';

import windowsConfig from '../../config/windows';
import { launchWindow } from '../windows';

const { APP_UUID, ENTERPRISE = false } = process.env;

/**
 * Applcation Start
 */
function* applicationStart() {
  // tslint:disable-next-line:no-console
  console.log('application started');
}

/**
 * Watcher on when openfin is ready for a window by name
 */
function* openfinSetup(action: OpenfinReadyAction) {
  // tslint:disable-next-line:no-console
  console.log('Openfin ready', action);

  if (action.payload!.finName === APP_UUID) {
    const isEnterprise = ENTERPRISE === 'true';
    const isLoggedIn = false;

    if (!isEnterprise || isLoggedIn) {
      // Show main app bar
      // TODO - Move to redux
      fin.desktop.Application.getCurrent().getWindow().show();
    } else {
      // Show login
      yield put(launchWindow(windowsConfig.login));
    }
  }
}

export function* applicationSaga() {
  yield takeEvery(APPLICATION_STARTED, applicationStart);
  yield takeEvery(OPENFIN_READY, openfinSetup);
}
