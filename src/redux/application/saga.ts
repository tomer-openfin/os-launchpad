import { Window } from '@giantmachines/redux-openfin';
import { delay } from 'redux-saga';
import { all, call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';

import windowsConfig, { initOnStartWindows, LAYOUTS_WINDOW } from '../../config/windows';
import getAppUuid from '../../utils/getAppUuid';
import { getLauncherFinWindow } from '../../utils/getLauncherFinWindow';
import { animateWindow, getSystemMonitorInfo } from '../../utils/openfinPromises';
import { hasDevToolsOnStartup, isDevelopmentEnv, isEnterpriseEnv } from '../../utils/processHelpers';
import { setupWindow } from '../../utils/setupWindow';
import takeFirst from '../../utils/takeFirst';
import { calcLauncherPosition } from '../../utils/windowPositionHelpers';
import { getAppDirectoryList } from '../apps';
import { registerGlobalDevHotKeys, registerGlobalHotkeys } from '../globalHotkeys/utils';
import { getLayoutsRequest } from '../layouts';
import { getAutoHide, getLauncherPosition, getSettingsRequest } from '../me';
import { getOrgSettingsRequest } from '../organization';
import { getAppsLauncherAppList, getSystemIconsSelector } from '../selectors';
import { getMonitorInfo, setMonitorInfo, setupSystemHandlers } from '../system';
import { getWindowBounds, launchWindow } from '../windows';
import {
  APPLICATION_STARTED,
  COLLAPSE_APP,
  EXPAND_APP,
  INIT_DEV_TOOLS,
  initDevTools,
  LAUNCH_APP_LAUNCHER,
  launchAppLauncher,
  OPENFIN_READY,
  REBOUND_LAUNCHER,
  reboundLauncherError,
  reboundLauncherRequest,
  reboundLauncherSuccess,
  SET_IS_DRAWER_EXPANDED,
  setIsEnterprise,
  setIsExpanded,
} from './actions';
import { getApplicationIsExpanded } from './selectors';
import { OpenfinReadyAction, ReboundLauncherRequestAction } from './types';
import { animateLauncherCollapseExpand, setWindowRelativeToLauncherBounds } from './utils';

const APP_UUID = getAppUuid();
const ANIMATION_DURATION = 300;

/**w
 * Application Start
 */
function* applicationStart() {
  // tslint:disable-next-line:no-console
  console.log('application started');

  yield put(getAppDirectoryList());

  yield put(getOrgSettingsRequest());
}

function* watchInitDevTools() {
  if (isDevelopmentEnv()) {
    // Register global dev hotkeys
    registerGlobalDevHotKeys(window.store.dispatch);

    const { fin } = window;
    if (fin && hasDevToolsOnStartup()) {
      // Show main windows dev tools on startup
      fin.desktop.System.showDeveloperTools(APP_UUID, APP_UUID);
    }
  }
}

/**
 * Watcher on when openfin is ready for a window by name
 */
function* openfinSetup(action: OpenfinReadyAction) {
  // tslint:disable-next-line:no-console
  console.log('Openfin ready', action);

  if (!action.payload) {
    return;
  }

  const { finName } = action.payload;

  // Only main window should be doing setup.
  if (finName === APP_UUID) {
    if (isDevelopmentEnv()) {
      yield put(initDevTools());
    }

    const isLoggedIn = false;
    const isEnterprise = isEnterpriseEnv();
    yield put(setIsEnterprise(isEnterprise));

    const { fin } = window;
    // Initial system monitor info
    // and setup system event handlers
    try {
      const systemMonitorInfo = yield call(getSystemMonitorInfo);
      yield put(setMonitorInfo(systemMonitorInfo));
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log('Failed to get/set monitor information:', e);
    }

    if (fin) {
      yield call(setupSystemHandlers, fin, window.store || window.opener.store);
    }

    const launcherFinWindow = yield call(getLauncherFinWindow);
    // Hide launcher
    if (launcherFinWindow) {
      launcherFinWindow.hide();
    }

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

  // Add window specific setup
  yield setupWindow(finName);
}

function* watchLaunchAppLauncher() {
  // Register global hotkeys
  registerGlobalHotkeys(window.store.dispatch);

  // Wait for a full rebound to come through as either error or success before continuing execution
  yield all([take([REBOUND_LAUNCHER.ERROR, REBOUND_LAUNCHER.SUCCESS]), put(reboundLauncherRequest(false, 0))]);

  // When all done show main app bar
  const { fin } = window;
  if (fin) {
    // Delay helps with the dom shuffling and initial animations
    yield delay(150);
    yield put(Window.showWindow({ id: APP_UUID }));
  }
}

function* watchCollapseApp() {
  const autoHide = yield select(getAutoHide);
  const isExpanded = yield select(getApplicationIsExpanded);
  if (!autoHide && !isExpanded) {
    return;
  }

  const nextIsExpanded = false;
  yield call(animateLauncherCollapseExpand, nextIsExpanded, 333);

  yield put(setIsExpanded(nextIsExpanded));
}

function* watchExpandApp() {
  const autoHide = yield select(getAutoHide);
  const isExpanded = yield select(getApplicationIsExpanded);
  if (!autoHide && isExpanded) {
    return;
  }

  const nextIsExpanded = true;
  yield call(animateLauncherCollapseExpand, nextIsExpanded, 500);

  yield put(setIsExpanded(nextIsExpanded));
}

function* watchReboundLauncherRequest(action: ReboundLauncherRequestAction) {
  const { payload } = action;
  const launcherFinWindow = yield call(getLauncherFinWindow);
  if (!launcherFinWindow || !payload) {
    yield put(reboundLauncherError());
    return;
  }

  const [appList, systemIcons, monitorInfo, launcherPosition, autoHide, isExpanded] = yield all([
    select(getAppsLauncherAppList),
    select(getSystemIconsSelector),
    select(getMonitorInfo),
    select(getLauncherPosition),
    select(getAutoHide),
    select(getApplicationIsExpanded),
  ]);
  if (!monitorInfo) {
    return;
  }
  const { width, height, left, top } = calcLauncherPosition(appList.length, systemIcons, monitorInfo, launcherPosition, autoHide, isExpanded);

  const { shouldAnimate, delay: animationDelay } = payload;
  if (animationDelay) {
    yield call(delay, animationDelay);
  }
  yield call(
    animateWindow,
    launcherFinWindow,
    {
      position: {
        duration: shouldAnimate ? ANIMATION_DURATION : 0,
        left,
        relative: false,
        top,
      },
      size: {
        duration: shouldAnimate ? ANIMATION_DURATION : 0,
        height,
        relative: false,
        width,
      },
    },
    {
      interrupt: shouldAnimate ? false : true,
      tween: 'ease-in-out',
    },
  );

  yield put(reboundLauncherSuccess());
}

function* watchSetIsDrawerExpanded() {
  const bounds = yield select(getWindowBounds, APP_UUID);
  yield call(setWindowRelativeToLauncherBounds, LAYOUTS_WINDOW, bounds);
}

export function* applicationSaga() {
  yield takeEvery(APPLICATION_STARTED, applicationStart);
  yield takeEvery(INIT_DEV_TOOLS, watchInitDevTools);
  yield takeEvery(LAUNCH_APP_LAUNCHER, watchLaunchAppLauncher);
  yield takeEvery(OPENFIN_READY, openfinSetup);
  yield takeEvery(SET_IS_DRAWER_EXPANDED, watchSetIsDrawerExpanded);
  yield takeFirst(COLLAPSE_APP, watchCollapseApp);
  yield takeFirst(EXPAND_APP, watchExpandApp);
  yield takeLatest(REBOUND_LAUNCHER.REQUEST, watchReboundLauncherRequest);
}
