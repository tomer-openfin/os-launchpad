import { Window } from '@giantmachines/redux-openfin';
import { all, call, put, select, take } from 'redux-saga/effects';

import { APP_LAUNCHER_OVERFLOW_WINDOW, LAYOUTS_WINDOW, LOGOUT_WINDOW } from '../../config/windows';
import { Bounds } from '../../types/commons';
import { getFinWindowByName } from '../../utils/getLauncherFinWindow';
import getOwnUuid from '../../utils/getOwnUuid';
import { getCurrentOpenfinApplicationInfo, setWindowBoundsPromise } from '../../utils/openfinPromises';
import { calcBoundsRelativeToLauncher } from '../../utils/windowPositionHelpers';
import { getAppDirectoryList, resetAppDirectoryList } from '../apps';
import { getChannels } from '../channels';
import { getLayouts, resetLayouts } from '../layouts';
import { getLauncherPosition, getLauncherSizeConfig, getSettings, resetSettings } from '../me';
import { getOrgSettings } from '../organization';
import { getAppListDimensions, getExpandedSystemDrawerSize } from '../selectors';
import { getAndSetMonitorInfo, getMachineId, storeAllSystemWindows } from '../system';
import { getWindowBounds } from '../windows';
import { getManifest, resetApplicationUi, setRuntimeVersion } from './actions';

export function* hideLauncherAndAttachments() {
  yield put(Window.hideWindow({ id: getOwnUuid() }));
  yield put(Window.hideWindow({ id: APP_LAUNCHER_OVERFLOW_WINDOW }));
  yield put(Window.hideWindow({ id: LAYOUTS_WINDOW }));
  yield put(Window.hideWindow({ id: LOGOUT_WINDOW }));
}

export function* initChannels() {
  yield all([take([getChannels.success.toString(), getChannels.failure.toString()]), put(getChannels.request())]);
}

export function* initMachineId() {
  yield all([take([getMachineId.success.toString(), getMachineId.failure.toString()]), put(getMachineId.request())]);
}

export function* initMonitorInfo() {
  yield all([take([getAndSetMonitorInfo.success.toString(), getAndSetMonitorInfo.failure.toString()]), put(getAndSetMonitorInfo.request())]);
}

export function* initManifest() {
  yield all([take([getManifest.success.toString(), getManifest.failure.toString()]), put(getManifest.request())]);
}

export function* initOrgSettings() {
  yield all([take([getOrgSettings.success.toString(), getOrgSettings.failure.toString()]), put(getOrgSettings.request())]);
}

export function* initRuntimeVersion() {
  const { fin } = window;
  if (!fin) {
    return;
  }

  // Set Runtime Version
  const { runtime } = yield call(getCurrentOpenfinApplicationInfo);
  if (runtime) {
    yield put(setRuntimeVersion((runtime as { version: string }).version));
  }
}

/**
 * Resources needed in order for the application to start.
 */
export function* initResources() {
  yield all([
    take([getAppDirectoryList.success.toString(), getAppDirectoryList.failure.toString()]),
    take([getLayouts.success.toString(), getLayouts.failure.toString()]),
    take([getSettings.success.toString(), getSettings.failure.toString()]),
    put(getAppDirectoryList.request()),
    put(getLayouts.request()),
    put(getSettings.request()),
  ]);
}

export function* initSystemWindows() {
  yield all([take([storeAllSystemWindows.success.toString(), storeAllSystemWindows.failure.toString()]), put(storeAllSystemWindows.request())]);
}

/**
 * Reset resources gathered in initResources to their default state.
 */
export function* resetResources() {
  yield all([put(resetApplicationUi()), put(resetAppDirectoryList()), put(resetLayouts()), put(resetSettings())]);
}

/**
 * Generator for setting the windows relative to Launcher bounds
 */
export function* setWindowRelativeToLauncherBounds(finName: string, launcherBounds: Bounds) {
  const finWindow = yield call(getFinWindowByName, finName);

  if (!finWindow) {
    return;
  }

  let windowBounds = yield select(getWindowBounds, finName);
  if (!windowBounds) {
    return;
  }

  const launcherPosition = yield select(getLauncherPosition);
  const launcherSizeConfig = yield select(getLauncherSizeConfig);
  const expandedSystemDrawerSize = yield select(getExpandedSystemDrawerSize);

  if (finName === APP_LAUNCHER_OVERFLOW_WINDOW) {
    const appListDimensions = yield select(getAppListDimensions);

    windowBounds = {
      ...windowBounds,
      ...appListDimensions,
    };
  }

  const bounds = calcBoundsRelativeToLauncher(finName, windowBounds, launcherBounds, launcherPosition, launcherSizeConfig, expandedSystemDrawerSize);
  yield call(setWindowBoundsPromise, finWindow, bounds);
}
