import { Application, Window } from '@giantmachines/redux-openfin';
import { all, call, delay, put, select, take, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';

import windowsConfig, { initOnStartWindows } from '../../config/windows';
import ApiService from '../../services/ApiService';
import { ApiResponseStatus } from '../../types/enums';
import { UnPromisfy } from '../../types/utils';
import eraseCookie from '../../utils/eraseCookie';
import getAppUuid from '../../utils/getAppUuid';
import { getLauncherFinWindow } from '../../utils/getLauncherFinWindow';
import { updateKeyInManifestOverride } from '../../utils/manifestOverride';
import { animateWindow, getCurrentOpenfinApplicationManifest } from '../../utils/openfinPromises';
import { hasDevToolsOnStartup, isDevelopmentEnv, isEnterpriseEnv } from '../../utils/processHelpers';
import { setupWindow } from '../../utils/setupWindow';
import { calcLauncherPosition } from '../../utils/windowPositionHelpers';
import { getAppDirectoryList } from '../apps';
import { registerGlobalDevHotKeys, registerGlobalHotkeys } from '../globalHotkeys/utils';
import { getAutoHide, getIsLoggedIn, getLauncherPosition, getLauncherSizeConfig } from '../me';
import { getAppsLauncherAppList, getCollapsedSystemDrawerSize, getExpandedSystemDrawerSize, getMonitorDetailsDerivedByUserSettings } from '../selectors';
import { setupSystemHandlers } from '../system';
import { getErrorFromCatch } from '../utils';
import { launchWindow } from '../windows';
import {
  applicationStarted,
  collapseApp,
  exitApplication,
  expandApp,
  fetchManifest,
  getManifest,
  getManifestOverride,
  initDevTools,
  launchAppLauncher,
  openfinReady,
  reboundLauncher,
  setIsEnterprise,
  setIsExpanded,
  updateManifestOverride,
} from './actions';
import { getApplicationIsExpanded, getApplicationManifestOverride } from './selectors';
import { executeAutoHideBehavior, initManifest, initMonitorInfo, initOrgSettings, initResources, initRuntimeVersion } from './utils';

const APP_UUID = getAppUuid();
const ANIMATION_DURATION = 285;

/**
 * Application Start
 */
function* applicationStart() {
  try {
    yield put(getAppDirectoryList.request());
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in applicationStart', error);
  }
}

function* watchExitApplication() {
  try {
    yield put(Application.close());
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchExitApplication', error);
  }
}

function* watchInitDevTools() {
  try {
    if (isDevelopmentEnv()) {
      // Register global dev hotkeys
      registerGlobalDevHotKeys(window.store.dispatch);

      const { fin } = window;
      if (fin && hasDevToolsOnStartup()) {
        // Show main windows dev tools on startup
        fin.desktop.System.showDeveloperTools(APP_UUID, APP_UUID);
      }
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchInitDevTools', error);
  }
}

function* watchLaunchAppLauncher() {
  try {
    // Register global hotkeys
    registerGlobalHotkeys(window.store.dispatch);

    // Wait for a full rebound to come through as either error or success before continuing execution
    yield all([
      take([reboundLauncher.failure.toString(), reboundLauncher.success.toString()]),
      put(reboundLauncher.request({ shouldAnimate: false, delay: 0 })),
    ]);

    // When all done show main app bar
    const { fin } = window;
    if (fin) {
      // Delay helps with the dom shuffling and initial animations
      yield delay(150);
      yield put(Window.showWindow({ id: APP_UUID }));
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchLaunchAppLauncher', error);
  }
}

/**
 * Watcher on when openfin is ready for a window by name
 */
function* openfinSetup(action: ReturnType<typeof openfinReady>) {
  try {
    // tslint:disable-next-line:no-console
    console.log('Openfin ready', action);

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
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in openfinSetup', error);
  }
}

function* watchCollapseApp() {
  try {
    const autoHide: ReturnType<typeof getAutoHide> = yield select(getAutoHide);
    const isExpanded: ReturnType<typeof getApplicationIsExpanded> = yield select(getApplicationIsExpanded);
    if (!autoHide && !isExpanded) {
      return;
    }

    const nextIsExpanded = false;
    const animationDuration = 333;
    yield call(executeAutoHideBehavior, nextIsExpanded, animationDuration);

    yield put(setIsExpanded(nextIsExpanded));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchCollapseApp', error);
  }
}

function* watchExpandApp() {
  try {
    const autoHide: ReturnType<typeof getAutoHide> = yield select(getAutoHide);
    const isExpanded: ReturnType<typeof getApplicationIsExpanded> = yield select(getApplicationIsExpanded);
    if (!autoHide && isExpanded) {
      return;
    }

    const nextIsExpanded = true;
    const animationDuration = 500;
    yield call(executeAutoHideBehavior, nextIsExpanded, animationDuration);

    yield put(setIsExpanded(nextIsExpanded));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchExpandApp', error);
  }
}

function* watchGetManifestOverrideRequest(action: ReturnType<typeof getManifestOverride.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.getAdminManifestOverrides>> = yield call(ApiService.getAdminManifestOverrides);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(getManifestOverride.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getManifestOverride.failure(error, action.meta));
  }
}

function* watchFetchManifest(action: ReturnType<typeof fetchManifest.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.getAdminManifest>> = yield call(ApiService.getAdminManifest);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(fetchManifest.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(fetchManifest.failure(error, action.meta));
  }
}

function* watchGetManifestRequest(action: ReturnType<typeof getManifest.request>) {
  try {
    const manifest: UnPromisfy<ReturnType<typeof getCurrentOpenfinApplicationManifest>> = yield call(getCurrentOpenfinApplicationManifest);
    yield put(getManifest.success(manifest, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getManifest.failure(error, action.meta));
  }
}

function* watchReboundLauncherRequest(action: ReturnType<typeof reboundLauncher.request>) {
  try {
    const launcherFinWindow: UnPromisfy<ReturnType<typeof getLauncherFinWindow>> = yield call(getLauncherFinWindow);
    if (!launcherFinWindow) {
      throw new Error('Could not find launcher fin window instance');
    }

    const [appList, monitorDetails, launcherPosition, launcherSizeConfig, autoHide, isExpanded, collapsedSystemDrawerSize, expandedSystemDrawerSize]: [
      ReturnType<typeof getAppsLauncherAppList>,
      ReturnType<typeof getMonitorDetailsDerivedByUserSettings>,
      ReturnType<typeof getLauncherPosition>,
      ReturnType<typeof getLauncherSizeConfig>,
      ReturnType<typeof getAutoHide>,
      ReturnType<typeof getApplicationIsExpanded>,
      ReturnType<typeof getCollapsedSystemDrawerSize>,
      ReturnType<typeof getExpandedSystemDrawerSize>
    ] = yield all([
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

    const { shouldAnimate, delay: animationDelay } = action.payload;
    if (animationDelay) {
      yield delay(animationDelay);
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

    yield put(reboundLauncher.success(undefined, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(reboundLauncher.failure(error, action.meta));
  }
}

function* watchUpdateManifestOverrideRequest(action: ReturnType<typeof updateManifestOverride.request>) {
  try {
    const overrideUpdates = action.payload;
    const manifestOverride: ReturnType<typeof getApplicationManifestOverride> = yield select(getApplicationManifestOverride);

    const updatedManifestOverride = Object.keys(action.payload).reduce(
      (acc, key) => updateKeyInManifestOverride(acc, key, overrideUpdates[key]),
      manifestOverride,
    );

    const response: UnPromisfy<ReturnType<typeof ApiService.saveAdminManifestOverrides>> = yield call(
      ApiService.saveAdminManifestOverrides,
      updatedManifestOverride,
    );

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(fetchManifest.request());
    yield put(updateManifestOverride.success(updatedManifestOverride, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(updateManifestOverride.failure(error, action.meta));
  }
}

export function* applicationSaga() {
  yield takeEvery(applicationStarted, applicationStart);
  yield takeEvery(exitApplication, watchExitApplication);
  yield takeEvery(initDevTools, watchInitDevTools);
  yield takeEvery(launchAppLauncher, watchLaunchAppLauncher);
  yield takeEvery(openfinReady, openfinSetup);
  yield takeLeading(collapseApp, watchCollapseApp);
  yield takeLeading(expandApp, watchExpandApp);

  yield takeLatest(getManifestOverride.request, watchGetManifestOverrideRequest);
  yield takeLatest(fetchManifest.request, watchFetchManifest);
  yield takeLatest(getManifest.request, watchGetManifestRequest);
  yield takeLatest(reboundLauncher.request, watchReboundLauncherRequest);
  yield takeLatest(updateManifestOverride.request, watchUpdateManifestOverrideRequest);
}
