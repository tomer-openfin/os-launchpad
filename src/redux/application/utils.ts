import { Window } from '@giantmachines/redux-openfin';
import { all, call, put, select, take } from 'redux-saga/effects';

import { APP_LAUNCHER_OVERFLOW_WINDOW, LAYOUTS_WINDOW, SETTINGS_MENU_WINDOW } from '../../config/windows';
import { Bounds } from '../../types/commons';
import { UnPromisfy } from '../../types/utils';
import { getApplicationInfo, getSystemRvmInfo, getWindowBounds, resizeWindowTo, setWindowBounds } from '../../utils/finUtils';
import getOwnUuid from '../../utils/getOwnUuid';
import { calcBoundsRelativeToLauncher } from '../../utils/windowPositionHelpers';
import { getAppDirectoryList, resetAppDirectoryList } from '../apps';
import { getChannels } from '../channels';
import { getLayouts, resetLayouts } from '../layouts';
import { getLauncherPosition, getLauncherSizeConfig, getSettings, resetSettings } from '../me';
import { getOrgSettings } from '../organization';
import { getAppListDimensions, getSettingsMenuHeight, getSystemDrawerSize } from '../selectors';
import { getAndSetMonitorInfo, getMachineId, storeAllSystemWindows } from '../system';
import { getWindowBounds as getWindowBoundsSelector } from '../windows';
import { getManifest, resetApplicationUi, setManifestUrl, setRuntimeVersion, setRvmVersion } from './actions';

export function* hideLauncherAndAttachments() {
  yield put(Window.hideWindow({ id: getOwnUuid() }));
  yield put(Window.hideWindow({ id: APP_LAUNCHER_OVERFLOW_WINDOW }));
  yield put(Window.hideWindow({ id: LAYOUTS_WINDOW }));
  yield put(Window.hideWindow({ id: SETTINGS_MENU_WINDOW }));
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
  const { runtime }: UnPromisfy<ReturnType<ReturnType<typeof getApplicationInfo>>> = yield call(getApplicationInfo({ uuid: getOwnUuid() }));
  if (runtime) {
    yield put(setRuntimeVersion((runtime as { version: string }).version));
  }
}

export function* initRvmVersion() {
  const { version: rvmVersion } = yield call(getSystemRvmInfo);
  if (rvmVersion) {
    yield put(setRvmVersion(rvmVersion));
  }
}

export function* initManifestUrl() {
  const { manifestUrl }: UnPromisfy<ReturnType<ReturnType<typeof getApplicationInfo>>> = yield call(getApplicationInfo({ uuid: getOwnUuid() }));
  if (manifestUrl) {
    yield put(setManifestUrl(manifestUrl));
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

export function* resizeSettingsMenu() {
  const height: ReturnType<typeof getSettingsMenuHeight> = yield select(getSettingsMenuHeight);
  const identity = { uuid: getOwnUuid(), name: SETTINGS_MENU_WINDOW };
  const bounds: UnPromisfy<ReturnType<ReturnType<typeof getWindowBounds>>> = yield call(getWindowBounds(identity));
  yield call(resizeWindowTo({ uuid: getOwnUuid(), name: SETTINGS_MENU_WINDOW }), bounds.width, height, 'top-left');
}

/**
 * Generator for setting the windows relative to Launcher bounds
 */
export function* setWindowRelativeToLauncherBounds(finName: string, launcherBounds: Bounds) {
  let windowBounds: ReturnType<typeof getWindowBoundsSelector> = yield select(getWindowBoundsSelector, finName);

  if (!windowBounds) {
    return;
  }

  const launcherPosition: ReturnType<typeof getLauncherPosition> = yield select(getLauncherPosition);
  const launcherSizeConfig: ReturnType<typeof getLauncherSizeConfig> = yield select(getLauncherSizeConfig);
  const systemDrawerSize: ReturnType<typeof getSystemDrawerSize> = yield select(getSystemDrawerSize);

  if (finName === APP_LAUNCHER_OVERFLOW_WINDOW) {
    const appListDimensions: ReturnType<typeof getAppListDimensions> = yield select(getAppListDimensions);

    windowBounds = {
      ...windowBounds,
      ...appListDimensions,
    };
  }

  if (finName === SETTINGS_MENU_WINDOW) {
    const height: ReturnType<typeof getSettingsMenuHeight> = yield select(getSettingsMenuHeight);
    windowBounds.height = height;
  }

  const bounds = calcBoundsRelativeToLauncher(finName, windowBounds, launcherBounds, launcherPosition, launcherSizeConfig, systemDrawerSize);
  yield call(setWindowBounds({ uuid: getOwnUuid(), name: finName }), bounds);
}
