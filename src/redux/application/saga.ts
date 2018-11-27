import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import windowsConfig, { initOnStartWindows } from '../../config/windows';
import { getNewPosDelta } from '../../utils/coordinateHelpers';
import getAppUuid from '../../utils/getAppUuid';
import { getLauncherFinWindow } from '../../utils/getLauncherFinWindow';
import { animateWindow, getSystemMonitorInfo } from '../../utils/openfinPromises';
import takeFirst from '../../utils/takeFirst';
import { LAUNCHER_HIDDEN_VISIBILITY_DELTA } from '../../utils/windowPositionHelpers';
import { getAppDirectoryList } from '../apps';
import { getLayoutById, getLayoutsIds, getLayoutsRequest, restoreLayout } from '../layouts';
import { getAutoHide, getLauncherPosition, getSettingsRequest } from '../me';
import { setMonitorInfo, setupSystemHandlers } from '../system';
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
import { setLauncherBounds } from './utils';

const APP_UUID = getAppUuid();

const { ENTERPRISE = false } = process.env;

/**w
 * Applcation Start
 */
function* applicationStart() {
  // tslint:disable-next-line:no-console
  console.log('application started');

  yield put(getAppDirectoryList());
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

    // Initial system monitor info
    // and setup system event handlers
    const systemMonitorInfo = yield call(getSystemMonitorInfo);
    yield all([put(setMonitorInfo(systemMonitorInfo)), call(setupSystemHandlers, fin, window.store || window.opener.store)]);

    const launcherFinWindow = yield call(getLauncherFinWindow);
    // Hide launcher
    if (launcherFinWindow) {
      launcherFinWindow.hide();
    }

    // Position launcher
    yield call(setLauncherBounds);

    // Launch all windows on init, windows are hidden by default unless they have autoShow: true
    yield all(Object.keys(initOnStartWindows).map(window => put(launchWindow(initOnStartWindows[window]))));

    if (isEnterprise && !isLoggedIn) {
      // Show Login
      yield put(launchWindow(windowsConfig.login));
    } else {
      yield all([put(getLayoutsRequest()), put(getSettingsRequest())]);

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
    const launcherFinWindow = yield call(getLauncherFinWindow);
    if (launcherFinWindow) {
      launcherFinWindow.show();
    }
  }
}

function* watchCollapseApp() {
  const autoHide = yield select(getAutoHide);
  const isExpanded = yield select(getApplicationIsExpanded);
  if (!autoHide && !isExpanded) {
    return;
  }

  const launcherFinWindow = yield call(getLauncherFinWindow);
  if (!launcherFinWindow) {
    return;
  }
  const [bounds, launcherPosition] = yield all([select(getWindowBounds, APP_UUID), select(getLauncherPosition)]);
  const { left, top } = getNewPosDelta(bounds, launcherPosition, false, LAUNCHER_HIDDEN_VISIBILITY_DELTA);

  yield call(
    animateWindow,
    launcherFinWindow,
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

  const launcherFinWindow = yield call(getLauncherFinWindow);
  const [bounds, launcherPosition] = yield all([select(getWindowBounds, APP_UUID), select(getLauncherPosition)]);
  if (!launcherFinWindow || !bounds) {
    return;
  }
  const { left, top } = getNewPosDelta(bounds, launcherPosition, true, LAUNCHER_HIDDEN_VISIBILITY_DELTA);

  yield call(
    animateWindow,
    launcherFinWindow,
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
