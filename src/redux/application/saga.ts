import { Application, Window } from '@giantmachines/redux-openfin';
import { delay } from 'redux-saga';
import { all, call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';

import windowsConfig, { initOnStartWindows } from '../../config/windows';
import eraseCookie from '../../utils/eraseCookie';
import getAppUuid from '../../utils/getAppUuid';
import { getLauncherFinWindow } from '../../utils/getLauncherFinWindow';
import { animateWindow } from '../../utils/openfinPromises';
import { hasDevToolsOnStartup, isDevelopmentEnv, isEnterpriseEnv } from '../../utils/processHelpers';
import { setupWindow } from '../../utils/setupWindow';
import takeFirst from '../../utils/takeFirst';
import { calcLauncherPosition } from '../../utils/windowPositionHelpers';
import { registerGlobalDevHotKeys, registerGlobalHotkeys } from '../globalHotkeys/utils';
import { GetManifestOverrideRequestAction, OpenfinReadyAction, ReboundLauncherRequestAction, UpdateManifestOverrideRequestAction } from './types';
import { animateLauncherCollapseExpand, initManifest, initMonitorInfo, initOrgSettings, initResources, initRuntimeVersion } from './utils';

import ApiService from '../../services/ApiService/index';
import { ResponseStatus } from '../../types/enums';
import { updateManifestOverride } from '../../utils/manifestOverride';
import { getAppDirectoryListRequest } from '../apps';
import { getAutoHide, getIsLoggedIn, getLauncherPosition, getLauncherSizeConfig } from '../me';
import { getAppsLauncherAppList, getCollapsedSystemDrawerSize, getExpandedSystemDrawerSize, getMonitorDetailsDerivedByUserSettings } from '../selectors';
import { setupSystemHandlers } from '../system';
import { launchWindow } from '../windows';
import {
  APPLICATION_STARTED,
  COLLAPSE_APP,
  EXIT_APPLICATION,
  EXPAND_APP,
  FETCH_MANIFEST,
  fetchManifestError,
  fetchManifestRequest,
  fetchManifestSuccess,
  GET_MANIFEST,
  GET_MANIFEST_OVERRIDE,
  getManifestError,
  getManifestOverrideError,
  getManifestOverrideSuccess,
  getManifestSuccess,
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
  UPDATE_MANIFEST_OVERRIDE,
  updateManifestOverrideError,
  updateManifestOverrideSuccess,
} from './actions';
import { getApplicationIsExpanded, getManifestOverride } from './selectors';

const APP_UUID = getAppUuid();
const ANIMATION_DURATION = 300;

/**w
 * Application Start
 */
function* applicationStart() {
  yield put(getAppDirectoryListRequest());
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
    eraseCookie();

    if (isDevelopmentEnv()) {
      yield put(initDevTools());
    }

    yield put(Window.hideWindow({ id: finName }));

    yield all([
      call(initOrgSettings),
      call(initMonitorInfo),
      call(initRuntimeVersion),
      call(initManifest),

      call(setupSystemHandlers, window.fin, window.store || window.opener.store),
    ]);

    const isLoggedIn: ReturnType<typeof getIsLoggedIn> = yield select(getIsLoggedIn);

    const isEnterprise = isEnterpriseEnv();
    yield put(setIsEnterprise(isEnterprise));

    // Launch all windows on init, windows are hidden by default unless they have autoShow: true
    // TODO - block until all windows are created and move to post login
    yield all(Object.keys(initOnStartWindows).map(window => put(launchWindow(initOnStartWindows[window]))));

    if (isEnterprise && !isLoggedIn) {
      // Show Login
      yield put(launchWindow(windowsConfig.login));
    } else {
      yield call(initResources);

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

  const [appList, monitorDetails, launcherPosition, launcherSizeConfig, autoHide, isExpanded, collapsedSystemDrawerSize, expandedSystemDrawerSize] = yield all([
    select(getAppsLauncherAppList),
    select(getMonitorDetailsDerivedByUserSettings),
    select(getLauncherPosition),
    select(getLauncherSizeConfig),
    select(getAutoHide),
    select(getApplicationIsExpanded),
    select(getCollapsedSystemDrawerSize),
    select(getExpandedSystemDrawerSize),
  ]);
  if (!monitorDetails) {
    return;
  }
  const { width, height, left, top } = calcLauncherPosition(
    appList.length,
    monitorDetails,
    launcherPosition,
    launcherSizeConfig,
    autoHide,
    isExpanded,
    collapsedSystemDrawerSize,
    expandedSystemDrawerSize,
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

function* watchGetManifestRequest() {
  const { fin } = window;

  if (!fin) return;

  const successCb = manifest => window.store.dispatch(getManifestSuccess(manifest));

  const errorCb = err => window.store.dispatch(getManifestError(err));

  fin.desktop.Application.getCurrent().getManifest(successCb, errorCb);
}

function* watchFetchManifest() {
  const response = yield call(ApiService.getAdminManifest);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error') {
    yield put(fetchManifestError(response));
  } else {
    yield put(fetchManifestSuccess(response));
  }
}

function* watchGetManifestOverrideRequest() {
  const response = yield call(ApiService.getAdminManifestOverrides);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error') {
    yield put(getManifestOverrideError(response));
  } else {
    yield put(getManifestOverrideSuccess(response));
  }
}

function* watchUpdateManifestOverrideRequest(action: UpdateManifestOverrideRequestAction) {
  const overrideUpdates = action.payload;

  if (!overrideUpdates) return;

  const manifestOverride = yield select(getManifestOverride);

  const updatedManifestOverride = Object.keys(overrideUpdates).reduce((acc, key) => updateManifestOverride(acc, key, overrideUpdates[key]), manifestOverride);

  const response = yield call(ApiService.saveAdminManifestOverrides, updatedManifestOverride);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error') {
    yield put(updateManifestOverrideError(response));
  } else {
    yield put(fetchManifestRequest());

    yield put(updateManifestOverrideSuccess(updatedManifestOverride, action.meta));
  }
}

function* watchRequestError(action) {
  const error = action.payload;

  const errorMessage = error ? error.message || error : 'Unknown Error';

  // tslint:disable-next-line:no-console
  console.error('Error on', action.type, ':', errorMessage, '\n');

  if (action.meta && action.meta.errorCb) {
    action.meta.errorCb(errorMessage);
  }
}

function* watchRequestSuccess(action) {
  if (action.meta && action.meta.successCb) {
    action.meta.successCb();
  }
}

export function* applicationSaga() {
  yield takeEvery(APPLICATION_STARTED, applicationStart);
  yield takeEvery(EXIT_APPLICATION, watchExitApplication);
  yield takeEvery(INIT_DEV_TOOLS, watchInitDevTools);
  yield takeEvery(LAUNCH_APP_LAUNCHER, watchLaunchAppLauncher);
  yield takeEvery(OPENFIN_READY, openfinSetup);
  yield takeFirst(COLLAPSE_APP, watchCollapseApp);
  yield takeFirst(EXPAND_APP, watchExpandApp);

  yield takeLatest(GET_MANIFEST_OVERRIDE.REQUEST, watchGetManifestOverrideRequest);
  yield takeLatest(FETCH_MANIFEST.REQUEST, watchFetchManifest);
  yield takeLatest(GET_MANIFEST.REQUEST, watchGetManifestRequest);
  yield takeLatest(REBOUND_LAUNCHER.REQUEST, watchReboundLauncherRequest);
  yield takeLatest(UPDATE_MANIFEST_OVERRIDE.REQUEST, watchUpdateManifestOverrideRequest);

  yield takeLatest(GET_MANIFEST_OVERRIDE.SUCCESS, watchRequestSuccess);
  yield takeLatest(GET_MANIFEST.SUCCESS, watchRequestSuccess);
  yield takeLatest(FETCH_MANIFEST.SUCCESS, watchRequestSuccess);
  yield takeLatest(UPDATE_MANIFEST_OVERRIDE.SUCCESS, watchRequestSuccess);

  yield takeLatest(GET_MANIFEST_OVERRIDE.ERROR, watchRequestError);
  yield takeLatest(GET_MANIFEST.ERROR, watchRequestError);
  yield takeLatest(FETCH_MANIFEST.ERROR, watchRequestError);
  yield takeLatest(UPDATE_MANIFEST_OVERRIDE.ERROR, watchRequestError);
}
