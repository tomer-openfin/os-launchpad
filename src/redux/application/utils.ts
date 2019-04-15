import { Window } from '@giantmachines/redux-openfin';
import { all, call, delay, put, race, select, take } from 'redux-saga/effects';

import { APP_LAUNCHER_OVERFLOW_WINDOW } from '../../config/windows';
import { Bounds, Transition } from '../../types/commons';
import { getFinWindowByName, getLauncherFinWindow } from '../../utils/getLauncherFinWindow';
import getOwnUuid from '../../utils/getOwnUuid';
import { animateWindow, getCurrentOpenfinApplicationInfo, setWindowBoundsPromise } from '../../utils/openfinPromises';
import { calcBoundsRelativeToLauncher, calcLauncherPosition, isBottom, isRight } from '../../utils/windowPositionHelpers';
import { getAppDirectoryList, resetAppDirectoryList } from '../apps';
import { getChannels } from '../channels';
import { getLayouts, resetLayouts } from '../layouts';
import { getAutoHide, getLauncherPosition, getLauncherSizeConfig, getSettings, resetSettings } from '../me';
import { getOrgSettings } from '../organization';
import {
  getAppListDimensions,
  getAppsLauncherAppList,
  getCollapsedSystemDrawerSize,
  getExpandedSystemDrawerSize,
  getMonitorDetailsDerivedByUserSettings,
} from '../selectors';
import { getAndSetMonitorInfo, getMachineId } from '../system';
import { State } from '../types';
import { getWindowBounds } from '../windows';
import { getManifest, resetApplicationUi, setRuntimeVersion } from './actions';

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

/**
 * Reset resources gathered in initResources to their default state.
 */
export function* resetResources() {
  yield all([put(resetApplicationUi()), put(resetAppDirectoryList()), put(resetLayouts()), put(resetSettings())]);
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

export function* executeAutoHideBehavior(nextIsExpanded: boolean, animationDuration: number) {
  // Wait for bounds changed event or bail if changed event takes too long
  yield all([
    race([
      take(action => action.type === Window.BOUNDS_CHANGED && action.payload && action.payload.options && action.payload.options.id === getOwnUuid()),
      delay(animationDuration + 100),
    ]),
    call(animateLauncherCollapseExpand, nextIsExpanded, animationDuration),
  ]);

  // Added delay so user cannot trigger a collapse right after expand
  yield delay(50);
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
