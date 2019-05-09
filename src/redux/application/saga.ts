import { all, call, cancel, cancelled, delay, fork, put, race, select, take, takeEvery, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import { ApiResponseStatus } from '../../types/enums';
import { UnPromisfy } from '../../types/utils';
import { eraseCookie } from '../../utils/cookieUtils';
import { animateWindow, closeApplication, getApplicationManifest, hideWindow, showSystemDeveloperTools, showWindow } from '../../utils/finUtils';
import getOwnUuid from '../../utils/getOwnUuid';
import { updateKeyInManifestOverride } from '../../utils/manifestOverride';
import { GLOBAL_CHANNEL_ID } from '../../utils/openfinFdc3';
import { hasDevToolsOnStartup, isDevelopmentEnv, isEnterpriseEnv, isProductionEnv } from '../../utils/processHelpers';
import { setupWindow } from '../../utils/setupWindow';
import { calcLauncherPosition } from '../../utils/windowPositionHelpers';
import { getAppDirectoryList } from '../apps';
import { addWindowToChannel, getChannels, getChannelsMembersChannels, rejoinWindowToChannel } from '../channels';
import { registerGlobalDevHotKeys } from '../globalHotkeys/utils';
import { restoreLayout } from '../layouts';
import { getIsLoggedIn, getLauncherPosition, getLauncherSizeConfig } from '../me';
import { loginFlow } from '../me/utils';
import { getOrgSettings } from '../organization';
import { getAppsLauncherAppList, getMonitorDetailsDerivedByUserSettings, getSystemDrawerSize } from '../selectors';
import { getSystemWindowIsPresent, setupSystemHandlers } from '../system';
import { getErrorFromCatch } from '../utils';
import { getUniqueWindowId, getWindowIsShowing } from '../windows';
import {
  applicationStarted,
  exitApplication,
  fetchManifest,
  getManifest,
  getManifestOverride,
  initDevTools,
  launchAppLauncher,
  openfinReady,
  pollStart,
  pollStop,
  reboundLauncher,
  setIsEnterprise,
  toggleAppIsShowing,
  updateManifestOverride,
} from './actions';
import { getApplicationManifestOverride } from './selectors';
import {
  hideLauncherAndAttachments,
  initMachineId,
  initManifest,
  initManifestUrl,
  initMonitorInfo,
  initOrgSettings,
  initRuntimeVersion,
  initRvmVersion,
  initSystemWindows,
  setupLayoutsListeners,
} from './utils';

const APP_UUID = getOwnUuid();
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
    console.warn('Error in applicationStart', error);
  }
}

function* watchExitApplication() {
  try {
    // stop polling for updates on application close
    yield put(pollStop());
    yield call(closeApplication());
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchExitApplication', error);
  }
}

function* watchInitDevTools() {
  try {
    if (isDevelopmentEnv()) {
      // Register global dev hotkeys
      registerGlobalDevHotKeys(window.store.dispatch);

      if (hasDevToolsOnStartup()) {
        // Show main windows dev tools on startup
        showSystemDeveloperTools({ uuid: APP_UUID, name: APP_UUID });
      }
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchInitDevTools', error);
  }
}

function* watchLaunchAppLauncher() {
  try {
    // Wait for a full rebound to come through as either error or success before continuing execution
    yield all([
      take([reboundLauncher.failure.toString(), reboundLauncher.success.toString()]),
      put(reboundLauncher.request({ shouldAnimate: false, delay: 0 })),
    ]);

    // When all done show main app bar
    // Delay helps with the dom shuffling and initial animations
    yield delay(150);
    yield call(showWindow({ uuid: APP_UUID, name: APP_UUID }));

    // start polling once launcher is ready
    yield put(pollStart());
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchLaunchAppLauncher', error);
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
    const identity = { uuid: APP_UUID, name: finName };

    // Add window specific setup
    yield setupWindow(identity);

    // Only main window should be doing setup.
    if (finName === APP_UUID) {
      eraseCookie();

      if (isDevelopmentEnv()) {
        yield put(initDevTools());
      }

      yield call(hideWindow(identity));

      // Kick off getting channels, but no guarantee right now channel promise will resolve
      // so don't block here
      yield put(getChannels.request());

      yield all([
        call(initSystemWindows),
        call(initOrgSettings),
        call(initMachineId),
        call(initMonitorInfo),
        call(initRuntimeVersion),
        call(initRvmVersion),
        call(initManifest),
        call(initManifestUrl),
        call(setupSystemHandlers, window.fin, window.store || window.opener.store),
      ]);

      const isLoggedIn: ReturnType<typeof getIsLoggedIn> = yield select(getIsLoggedIn);

      const isEnterprise = isEnterpriseEnv();
      yield put(setIsEnterprise(isEnterprise));

      yield call(loginFlow, isLoggedIn || !isEnterprise);
      setupLayoutsListeners();
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in openfinSetup', error);
  }
}

function* watchPollStart() {
  const REFETCH_DELAY = isProductionEnv() ? 120000 : 600000;

  while (true) {
    try {
      // poll for app directory
      yield put(getAppDirectoryList.request());

      // poll for org settings
      yield put(getOrgSettings.request());

      // call indefinitely until app exit or on logout
      yield delay(REFETCH_DELAY);
    } finally {
      if (yield cancelled()) {
        // tslint:disable-next-line:no-console
        console.log('Stopped polling.');
      }
    }
  }
}

function* watchPolling() {
  try {
    // start polling in the background
    const pollStartTask = yield fork(watchPollStart);

    // wait for polling stop request
    yield take(pollStop);

    // cancel the pollStartTask, causes the
    // pollStartTask to jump to its finally block
    yield cancel(pollStartTask);
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchPolling', error);
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
    const manifest: UnPromisfy<ReturnType<ReturnType<typeof getApplicationManifest>>> = yield call(getApplicationManifest({ uuid: APP_UUID }));
    yield put(getManifest.success(manifest, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getManifest.failure(error, action.meta));
  }
}

function* watchReboundLauncherRequest(action: ReturnType<typeof reboundLauncher.request>) {
  try {
    const [appList, monitorDetails, launcherPosition, launcherSizeConfig, systemDrawerSize]: [
      ReturnType<typeof getAppsLauncherAppList>,
      ReturnType<typeof getMonitorDetailsDerivedByUserSettings>,
      ReturnType<typeof getLauncherPosition>,
      ReturnType<typeof getLauncherSizeConfig>,
      ReturnType<typeof getSystemDrawerSize>
    ] = yield all([
      select(getAppsLauncherAppList),
      select(getMonitorDetailsDerivedByUserSettings),
      select(getLauncherPosition),
      select(getLauncherSizeConfig),
      select(getSystemDrawerSize),
    ]);
    if (!monitorDetails) {
      return;
    }
    const { width, height, left, top } = calcLauncherPosition(appList.length, monitorDetails, launcherPosition, launcherSizeConfig, systemDrawerSize);

    const { shouldAnimate, delay: animationDelay } = action.payload;
    if (animationDelay) {
      yield delay(animationDelay);
    }
    yield call(
      animateWindow({ uuid: APP_UUID, name: APP_UUID }),
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

function* watchToggleAppIsShowing() {
  try {
    const isShowing = yield select(getWindowIsShowing, APP_UUID);
    if (isShowing) {
      yield call(hideLauncherAndAttachments);
    } else {
      yield call(showWindow({ uuid: APP_UUID, name: APP_UUID }));
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchToggleAppIsShowing', error);
  }
}

function* watchRejoinWindowToChannelRequest(action: ReturnType<typeof rejoinWindowToChannel.request>) {
  try {
    const { identity, channelId } = action.payload;

    const isPresent: ReturnType<typeof getSystemWindowIsPresent> = yield select(getSystemWindowIsPresent, identity);
    const windowId = getUniqueWindowId(identity);
    const channelsMembers: ReturnType<typeof getChannelsMembersChannels> = yield select(getChannelsMembersChannels);
    const currentId = channelsMembers[windowId] || GLOBAL_CHANNEL_ID;

    if (channelId === GLOBAL_CHANNEL_ID && !isPresent) return;
    if (currentId === channelId && isPresent) return;

    if (isPresent) {
      // case 1: window is open and not in channel
      // tslint:disable-next-line:no-console
      console.log(`%c ${identity.uuid}/${identity.name} joining ${channelId} channel.`, `background-color: ${channelId};`);

      yield put(addWindowToChannel.request({ currentId, nextId: channelId, identity }));
    } else {
      // case 2: window not yet open and not in channel
      const { failure } = yield race({
        failure: take(restoreLayout.failure),
        success: take(restoreLayout.success),
      });

      if (failure) {
        throw new Error('restoreLayout.failure in watchRejoinWindowToChannelRequest.');
      }

      // tslint:disable-next-line:no-console
      console.log(`%c ${identity.uuid}/${identity.name} joining ${channelId} channel.`, `background-color: ${channelId};`);
      yield put(addWindowToChannel.request({ currentId, nextId: channelId, identity }));
    }
    yield put(rejoinWindowToChannel.success());
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchRejoinWindowToChannelRequest', error);
    yield put(rejoinWindowToChannel.failure(error));
  }
}

export function* applicationSaga() {
  yield takeEvery(applicationStarted, applicationStart);
  yield takeEvery(exitApplication, watchExitApplication);
  yield takeEvery(initDevTools, watchInitDevTools);
  yield takeEvery(launchAppLauncher, watchLaunchAppLauncher);
  yield takeEvery(openfinReady, openfinSetup);
  yield takeEvery(rejoinWindowToChannel.request, watchRejoinWindowToChannelRequest);

  yield takeLatest(pollStart, watchPolling);
  yield takeLatest(toggleAppIsShowing, watchToggleAppIsShowing);
  yield takeLatest(getManifestOverride.request, watchGetManifestOverrideRequest);
  yield takeLatest(fetchManifest.request, watchFetchManifest);
  yield takeLatest(getManifest.request, watchGetManifestRequest);
  yield takeLatest(reboundLauncher.request, watchReboundLauncherRequest);
  yield takeLatest(updateManifestOverride.request, watchUpdateManifestOverrideRequest);
}
