import { Application, Window } from '@giantmachines/redux-openfin';
import { delay } from 'redux-saga';
import { all, call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';

import windowsConfig, { initOnStartWindows, LAYOUTS_WINDOW } from '../../config/windows';

import { getLocalStorage } from '../../services/localStorageAdapter';

import { OpenfinReadyAction, ReboundLauncherRequestAction } from './types';

import getAppUuid from '../../utils/getAppUuid';
import { getLauncherFinWindow } from '../../utils/getLauncherFinWindow';
import { animateWindow, getOpenfinApplicationInfo, getSystemMonitorInfo } from '../../utils/openfinPromises';
import { hasDevToolsOnStartup, isDevelopmentEnv, isEnterpriseEnv } from '../../utils/processHelpers';
import { setupWindow } from '../../utils/setupWindow';
import takeFirst from '../../utils/takeFirst';
import { calcLauncherPosition } from '../../utils/windowPositionHelpers';
import { registerGlobalDevHotKeys, registerGlobalHotkeys } from '../globalHotkeys/utils';
import { animateLauncherCollapseExpand } from './utils';

import { getAppDirectoryList } from '../apps';
import { GET_LAYOUTS, getLayoutsRequest } from '../layouts';
import { GET_ME, GET_SETTINGS, getAutoHide, getIsLoggedIn, getLauncherPosition, getLauncherSizeConfig, getMeRequest, getSettingsRequest } from '../me';
import { GET_ORG_SETTINGS, getOrganizationAutoLogin, getOrgSettingsRequest } from '../organization';
import { getAppsLauncherAppList, getSystemIconsSelector } from '../selectors';
import { getMonitorInfo, setMonitorInfo, setupSystemHandlers } from '../system';
import { launchWindow } from '../windows';
import {
  APPLICATION_STARTED,
  COLLAPSE_APP,
  EXIT_APPLICATION,
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
  setIsEnterprise,
  setIsExpanded,
  setRuntimeVersion,
} from './actions';
import { getApplicationIsExpanded } from './selectors';

const APP_UUID = getAppUuid();
const ANIMATION_DURATION = 300;

/**w
 * Application Start
 */
function* applicationStart() {
  // tslint:disable-next-line:no-console
  console.log('application started');

  yield put(getAppDirectoryList());
}

function* watchExitApplication() {
  yield put(Application.close());
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

    yield all([take([GET_ORG_SETTINGS.SUCCESS, GET_ORG_SETTINGS.ERROR]), put(getOrgSettingsRequest())]);

    // const autoLoginLocal = yield !!getLocalStorage('autoLogin');

    // const autoLoginOrg = yield select(getOrganizationAutoLogin);

    // if (document.cookie && autoLoginLocal && autoLoginOrg) {
    //   yield all([take([GET_ME.SUCCESS, GET_ME.ERROR]), put(getMeRequest())]);
    // }

    const isLoggedIn = yield select(getIsLoggedIn);

    const isEnterprise = isEnterpriseEnv();
    yield put(setIsEnterprise(isEnterprise));

    // Initial system monitor info
    // and setup system event handlers
    try {
      const systemMonitorInfo = yield call(getSystemMonitorInfo);
      yield put(setMonitorInfo(systemMonitorInfo));
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log('Failed to get/set monitor information:', e);
    }

    const { fin } = window;

    if (fin) {
      // Set Runtime Version
      const { runtime } = yield call(getOpenfinApplicationInfo);

      if (runtime) {
        yield put(setRuntimeVersion((runtime as { version: string }).version));
      }

      yield call(setupSystemHandlers, fin, window.store || window.opener.store);
    }

    const launcherFinWindow = yield call(getLauncherFinWindow);
    // Hide launcher
    if (launcherFinWindow) {
      launcherFinWindow.hide();
    }

    // Launch all windows on init, windows are hidden by default unless they have autoShow: true
    // TODO - block until all windows are created and move to post login
    yield all(Object.keys(initOnStartWindows).map(window => put(launchWindow(initOnStartWindows[window]))));

    if (isEnterprise && !isLoggedIn) {
      // Show Login
      yield put(launchWindow(windowsConfig.login));
    } else {
      yield all([
        take([GET_LAYOUTS.ERROR, GET_LAYOUTS.SUCCESS]),
        take([GET_SETTINGS.ERROR, GET_SETTINGS.SUCCESS]),
        put(getLayoutsRequest()),
        put(getSettingsRequest()),
      ]);

      // Show Launcher
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

  const [appList, systemIcons, monitorInfo, launcherPosition, launcherSizeConfig, autoHide, isExpanded] = yield all([
    select(getAppsLauncherAppList),
    select(getSystemIconsSelector),
    select(getMonitorInfo),
    select(getLauncherPosition),
    select(getLauncherSizeConfig),
    select(getAutoHide),
    select(getApplicationIsExpanded),
  ]);
  if (!monitorInfo) {
    return;
  }
  const { width, height, left, top } = calcLauncherPosition(
    appList.length,
    systemIcons,
    monitorInfo,
    launcherPosition,
    launcherSizeConfig,
    autoHide,
    isExpanded,
  );

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

export function* applicationSaga() {
  yield takeEvery(APPLICATION_STARTED, applicationStart);
  yield takeEvery(EXIT_APPLICATION, watchExitApplication);
  yield takeEvery(INIT_DEV_TOOLS, watchInitDevTools);
  yield takeEvery(LAUNCH_APP_LAUNCHER, watchLaunchAppLauncher);
  yield takeEvery(OPENFIN_READY, openfinSetup);
  yield takeFirst(COLLAPSE_APP, watchCollapseApp);
  yield takeFirst(EXPAND_APP, watchExpandApp);
  yield takeLatest(REBOUND_LAUNCHER.REQUEST, watchReboundLauncherRequest);
}
