import { all, call, select } from 'redux-saga/effects';

import { APP_LAUNCHER_OVERFLOW_WINDOW } from '../../config/windows';
import { Bounds } from '../../types/commons';
import { getFinWindowByName, getLauncherFinWindow } from '../../utils/getLauncherFinWindow';
import { animateWindow, setWindowBoundsPromise } from '../../utils/openfinPromises';
import { calcBoundsRelativeToLauncher, calcLauncherPosition, isBottom, isRight } from '../../utils/windowPositionHelpers';
import { getAutoHide, getLauncherPosition } from '../me';
import { getAppListDimensions, getAppsLauncherAppList, getSystemIconsSelector } from '../selectors';
import { getMonitorInfo } from '../system/index';
import { State } from '../types';
import { getWindowBounds } from '../windows';
import { getDrawerIsExpanded } from './selectors';

export function* animateLauncherCollapseExpand(isExpanded: State['application']['isExpanded'], duration: number) {
  const launcherFinWindow = yield call(getLauncherFinWindow);
  if (!launcherFinWindow) {
    return;
  }

  const [appList, systemIcons, monitorInfo, launcherPosition, autoHide] = yield all([
    select(getAppsLauncherAppList),
    select(getSystemIconsSelector),
    select(getMonitorInfo),
    select(getLauncherPosition),
    select(getAutoHide),
  ]);
  const { height, width, top, left } = calcLauncherPosition(appList.length, systemIcons, monitorInfo, launcherPosition, autoHide, isExpanded);
  const transitions: fin.Transition = {
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
  const [launcherPosition, isLauncherDrawerExpanded] = yield all([select(getLauncherPosition), select(getDrawerIsExpanded)]);
  if (!windowBounds) {
    return;
  }

  let invert = true;
  if (finName === APP_LAUNCHER_OVERFLOW_WINDOW) {
    const appListDimensions = yield select(getAppListDimensions);

    windowBounds = {
      ...windowBounds,
      ...appListDimensions,
    };
    invert = false;
  }

  const bounds = calcBoundsRelativeToLauncher(finName, windowBounds, launcherBounds, launcherPosition, isLauncherDrawerExpanded, invert);
  yield call(setWindowBoundsPromise, finWindow, bounds);
}
