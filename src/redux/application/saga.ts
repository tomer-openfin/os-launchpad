import { all, put, select, takeEvery } from 'redux-saga/effects';

import windowsConfig from '../../config/windows';
import { getAppDirectoryList } from '../apps';
import { getLauncherAppIdsRequest } from '../apps/saga';
import { getLayoutById, getLayoutsIds, getLayoutsRequest, restoreLayout } from '../layouts';
import { getSettingsRequest, setLauncherBounds } from '../me';
import { launchWindow } from '../windows';
import { launchAppLauncher } from './actions';

import { APPLICATION_STARTED, LAUNCH_APP_LAUNCHER, OPENFIN_READY, OpenfinReadyAction, setIsEnterprise } from './';

const { APP_UUID, ENTERPRISE = false } = process.env;

/**
 * Applcation Start
 */
function* applicationStart() {
  // tslint:disable-next-line:no-console
  console.log('application started');

  yield all([put(getAppDirectoryList()), put(getLayoutsRequest()), put(getLauncherAppIdsRequest()), put(getSettingsRequest())]);
}

/**
 * Watcher on when openfin is ready for a window by name
 */
function* openfinSetup(action: OpenfinReadyAction) {
  // tslint:disable-next-line:no-console
  console.log('Openfin ready', action);

  if (action.payload!.finName === APP_UUID) {
    const isLoggedIn = false;
    const isEnterprise = ENTERPRISE === 'true';
    yield put(setIsEnterprise(isEnterprise));

    if (!isEnterprise || isLoggedIn) {
      // Show main app bar
      // TODO - Move to redux

      // sets to TOP on initial load
      yield setLauncherBounds();

      // TODO - Move to redux
      fin.desktop.Application.getCurrent()
        .getWindow()
        .show();
      yield put(launchAppLauncher());
    } else {
      // Show login
      yield put(launchWindow(windowsConfig.login));
    }
  }
}

function* watchLaunchAppLauncher() {
  const ids = yield select(getLayoutsIds);
  if (ids[0]) {
    const layout = yield select(getLayoutById, ids[0]);
    yield put(restoreLayout(layout));
  }

  // When all done show main app bar
  const { fin } = window;
  if (fin) {
    // TODO - Maybe move to a redux action
    fin.desktop.Application.getCurrent()
      .getWindow()
      .show();
  }
}

export function* applicationSaga() {
  yield takeEvery(APPLICATION_STARTED, applicationStart);
  yield takeEvery(LAUNCH_APP_LAUNCHER, watchLaunchAppLauncher);
  yield takeEvery(OPENFIN_READY, openfinSetup);
}
