import { all, call, select } from 'redux-saga/effects';

import { Bounds } from '../../types/commons';
import { getFinWindowByName, getLauncherFinWindow } from '../../utils/getLauncherFinWindow';
import { animateWindow, setWindowBoundsPromise } from '../../utils/openfinPromises';
import { calcBoundsRelativeToLauncher, calcLauncherPosition, isBottom, isRight } from '../../utils/windowPositionHelpers';
import { getAutoHide, getLauncherPosition } from '../me';
import { getTotalLauncherCtas } from '../selectors';
import { getMonitorInfo } from '../system/index';
import { State } from '../types';
import { getWindowBounds } from '../windows';

export function* animateLauncherCollapseExpand(isExpanded: State['application']['isExpanded'], duration: number) {
  const launcherFinWindow = yield call(getLauncherFinWindow);
  if (!launcherFinWindow) {
    return;
  }

  const [totalCtas, monitorInfo, launcherPosition, autoHide] = yield all([
    select(getTotalLauncherCtas),
    select(getMonitorInfo),
    select(getLauncherPosition),
    select(getAutoHide),
  ]);
  const { height, width, top, left } = calcLauncherPosition(totalCtas, monitorInfo, launcherPosition, autoHide, isExpanded);
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

  const [windowBounds, launcherPosition] = yield all([select(getWindowBounds, finName), select(getLauncherPosition)]);
  if (!windowBounds) {
    return;
  }
  const bounds = calcBoundsRelativeToLauncher(finName, windowBounds, launcherBounds, launcherPosition);
  yield call(setWindowBoundsPromise, finWindow, bounds);
}
