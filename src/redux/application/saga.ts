import { all, call, put, select, take, takeEvery } from 'redux-saga/effects';

import windowsConfig from '../../config/windows';
import config from '../../config/windows';
import { getNewPos } from '../../utils/coordinateHelpers';
import getAppUuid from '../../utils/getAppUuid';
import { animateWindow, getSystemMonitorInfo } from '../../utils/openfinPromises';
import takeFirst from '../../utils/takeFirst.js';
import { getAppDirectoryList, getLauncherAppIdsRequest } from '../apps';
import { getLayoutById, getLayoutsIds, getLayoutsRequest, restoreLayout } from '../layouts';
import { getAutoHide, getLauncherPosition, getSettingsRequest, setLauncherBounds } from '../me';
import { setMonitorInfo } from '../system';
import { getWindowBounds, launchWindow } from '../windows';
import {
  APPLICATION_STARTED,
  COLLAPSE_APP,
  EXPAND_APP,
  LAUNCH_APP_LAUNCHER,
  launchAppLauncher,
  OPENFIN_READY,
  setIsEnterprise,
  setIsExpanded,
} from './actions';
import { getApplicationIsExpanded } from './selectors';
import { OpenfinReadyAction } from './types';

const APP_UUID = getAppUuid();

const { ENTERPRISE = false } = process.env;

/**w
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

    // Setup main window and hide
    const monitorInfo = yield call(getSystemMonitorInfo);
    yield put(setMonitorInfo(monitorInfo));

    // sets to TOP on initial load
    yield setLauncherBounds();

    // TODO - Move to redux
    fin.desktop.Application.getCurrent()
      .getWindow()
      .hide();

    yield put(launchWindow(config.appDirectory));

    if (isEnterprise && !isLoggedIn) {
      // Show Login
      yield put(launchWindow(windowsConfig.login));
    } else {
      // Show Launchbar
      yield put(launchAppLauncher());
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

function* watchCollapseApp() {
  const autoHide = yield select(getAutoHide);
  const isExpanded = yield select(getApplicationIsExpanded);
  if (!autoHide && !isExpanded) {
    return;
  }

  const [bounds, launcherPosition] = yield all([select(getWindowBounds, APP_UUID), select(getLauncherPosition)]);
  const { left, top } = getNewPos(bounds, launcherPosition, false);

  yield call(
    animateWindow,
    fin.desktop.Application.getCurrent().getWindow(),
    {
      position: {
        duration: 200,
        left,
        relative: true,
        top,
      },
    },
    {
      interupt: false,
    },
  );
  yield put(setIsExpanded(false));
}

function* watchExpandApp() {
  const autoHide = yield select(getAutoHide);
  const isExpanded = yield select(getApplicationIsExpanded);
  if (!autoHide && isExpanded) {
    return;
  }

  const [bounds, launcherPosition] = yield all([select(getWindowBounds, APP_UUID), select(getLauncherPosition)]);
  const { left, top } = getNewPos(bounds, launcherPosition, true);

  yield call(
    animateWindow,
    fin.desktop.Application.getCurrent().getWindow(),
    {
      position: {
        duration: 200,
        left,
        relative: true,
        top,
      },
    },
    {
      interupt: false,
    },
  );

  yield put(setIsExpanded(true));
}

export function* applicationSaga() {
  yield takeEvery(APPLICATION_STARTED, applicationStart);
  yield takeEvery(LAUNCH_APP_LAUNCHER, watchLaunchAppLauncher);
  yield takeEvery(OPENFIN_READY, openfinSetup);
  yield takeFirst(COLLAPSE_APP, watchCollapseApp);
  yield takeFirst(EXPAND_APP, watchExpandApp);
}
