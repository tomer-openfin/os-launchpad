import { all, call, select } from 'redux-saga/effects';

import { Bounds } from '../../types/commons';
import getAppUuid from '../../utils/getAppUuid';
import { getFinWindowByName, getLauncherFinWindow } from '../../utils/getLauncherFinWindow';
import { setWindowBoundsPromise } from '../../utils/openfinPromises';
import { calcBoundsRelativeToLauncher, calcLauncherPosition } from '../../utils/windowPositionHelpers';
import { getAutoHide, getLauncherPosition } from '../me';
import { getMonitorInfo } from '../system';
import { getWindowBounds } from '../windows';

const APP_UUID = getAppUuid();

/**
 * Generator for setting the Launcher bounds
 */
export function* setLauncherBounds() {
  const launcherFinWindow = yield call(getLauncherFinWindow);
  if (!launcherFinWindow) {
    return;
  }

  const [bounds, monitorInfo, launcherPosition, autoHide] = yield all([
    select(getWindowBounds, APP_UUID),
    select(getMonitorInfo),
    select(getLauncherPosition),
    select(getAutoHide),
  ]);
  if (!bounds) {
    return;
  }
  const launcherBounds = calcLauncherPosition(bounds, monitorInfo, launcherPosition, autoHide);
  yield call(setWindowBoundsPromise, launcherFinWindow, launcherBounds);
}

/**
 * Generator for setting the windows relative to Launcher bounds
 */
export function* setWindowRelativeToLauncherBounds(finName: string, launcherBounds: Bounds) {
  const finWindow = yield call(getFinWindowByName, finName);

  if (!finWindow) {
    return;
  }

  const [windowBounds, launcherPosition] = yield all([select(getWindowBounds, finName), select(getLauncherPosition)]);
  if (!windowBounds) {
    return;
  }
  const bounds = calcBoundsRelativeToLauncher(finName, windowBounds, launcherBounds, launcherPosition);
  yield call(setWindowBoundsPromise, finWindow, bounds);
}
