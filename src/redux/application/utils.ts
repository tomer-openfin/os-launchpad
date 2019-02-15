import { all, call, put, select, take } from 'redux-saga/effects';

import { APP_LAUNCHER_OVERFLOW_WINDOW } from '../../config/windows';
import { Bounds, Transition } from '../../types/commons';
import { getFinWindowByName, getLauncherFinWindow } from '../../utils/getLauncherFinWindow';
import { animateWindow, getCurrentOpenfinApplicationInfo, setWindowBoundsPromise } from '../../utils/openfinPromises';
import { calcBoundsRelativeToLauncher, calcLauncherPosition, isBottom, isRight } from '../../utils/windowPositionHelpers';
import { GET_APP_DIRECTORY_LIST, getAppDirectoryListRequest } from '../apps';
import { GET_LAYOUTS, getLayoutsRequest } from '../layouts';
import { GET_SETTINGS, getAutoHide, getLauncherPosition, getLauncherSizeConfig, getSettingsRequest } from '../me';
import { GET_ORG_SETTINGS, getOrgSettingsRequest } from '../organization';
import {
  getAppListDimensions,
  getAppsLauncherAppList,
  getCollapsedSystemDrawerSize,
  getExpandedSystemDrawerSize,
  getMonitorDetailsDerivedByUserSettings,
} from '../selectors';
import { GET_AND_SET_MONITOR_INFO, getAndSetMonitorInfoRequest } from '../system';
import { State } from '../types';
import { getWindowBounds } from '../windows';
import { GET_MANIFEST, getManifestRequest, setRuntimeVersion } from './actions';

export function* initMonitorInfo() {
  yield all([take([GET_AND_SET_MONITOR_INFO.SUCCESS, GET_AND_SET_MONITOR_INFO.ERROR]), put(getAndSetMonitorInfoRequest())]);
}

export function* initManifest() {
  yield all([take([GET_MANIFEST.SUCCESS, GET_MANIFEST.ERROR]), put(getManifestRequest())]);
}

export function* initOrgSettings() {
  yield all([take([GET_ORG_SETTINGS.SUCCESS, GET_ORG_SETTINGS.ERROR]), put(getOrgSettingsRequest())]);
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
    take([GET_APP_DIRECTORY_LIST.SUCCESS, GET_APP_DIRECTORY_LIST.ERROR]),
    take([GET_LAYOUTS.SUCCESS, GET_LAYOUTS.ERROR]),
    take([GET_SETTINGS.SUCCESS, GET_SETTINGS.ERROR]),
    put(getAppDirectoryListRequest()),
    put(getLayoutsRequest()),
    put(getSettingsRequest()),
  ]);
}

export function* animateLauncherCollapseExpand(isExpanded: State['application']['isExpanded'], duration: number) {
  const launcherFinWindow = yield call(getLauncherFinWindow);
  if (!launcherFinWindow) {
    return;
  }

  const [appList, monitorDetails, launcherPosition, launcherSizeConfig, autoHide, collapsedSystemDrawerSize, expandedSystemDrawerSize] = yield all([
    select(getAppsLauncherAppList),
    select(getMonitorDetailsDerivedByUserSettings),
    select(getLauncherPosition),
    select(getLauncherSizeConfig),
    select(getAutoHide),
    select(getCollapsedSystemDrawerSize),
    select(getExpandedSystemDrawerSize),
  ]);
  const { height, width, top, left } = calcLauncherPosition(
    appList.length,
    monitorDetails,
    launcherPosition,
    launcherSizeConfig,
    autoHide,
    isExpanded,
    collapsedSystemDrawerSize,
    expandedSystemDrawerSize,
  );
  const transitions: Transition = {
    size: {
      duration,
      height,
      relative: false,
      width,
    },
  };
  if (isBottom(launcherPosition)) {
    transitions.position = {
      duration,
      left,
      relative: false,
      top,
    };
  } else if (isRight(launcherPosition)) {
    transitions.position = {
      duration,
      left,
      relative: false,
      top,
    };
  }

  yield call(animateWindow, launcherFinWindow, transitions, {
    interrupt: false,
  });
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
