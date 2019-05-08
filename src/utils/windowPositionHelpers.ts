import { APP_LAUNCHER_OVERFLOW_WINDOW, LAYOUTS_WINDOW, SETTINGS_MENU_WINDOW } from '../config/windows';
import { Bounds, Dimensions, DirectionalPosition, MonitorDetails, PointTopLeft } from '../types/commons';

import { getCoordinatesHeight, getCoordinatesWidth } from './coordinateHelpers';
import { LauncherSizeConfig } from './launcherSizeConfigs';
import * as SIZE from './sizingConstants';

const { Bottom: BOTTOM, Left: LEFT, Right: RIGHT, Top: TOP } = DirectionalPosition;

const OFFSETS = {
  [APP_LAUNCHER_OVERFLOW_WINDOW]: {
    [DirectionalPosition.Top]: (config: LauncherSizeConfig) => ({
      offsetX: config.launcher,
      offsetY: 0,
    }),
    [DirectionalPosition.Right]: (config: LauncherSizeConfig) => ({
      offsetX: config.launcher,
      offsetY: config.launcher,
    }),
    [DirectionalPosition.Bottom]: (config: LauncherSizeConfig) => ({
      offsetX: config.launcher,
      offsetY: config.launcher,
    }),
    [DirectionalPosition.Left]: (config: LauncherSizeConfig) => ({
      offsetX: 0,
      offsetY: config.launcher,
    }),
  },
  [LAYOUTS_WINDOW]: {
    [DirectionalPosition.Top]: (config: LauncherSizeConfig, bounds: Bounds, launcherBounds: Bounds) => ({
      offsetX: launcherBounds.width - bounds.width,
      offsetY: config.launcher,
    }),
    [DirectionalPosition.Right]: (config: LauncherSizeConfig, bounds: Bounds, launcherBounds: Bounds) => ({
      offsetX: 0,
      offsetY: launcherBounds.height - bounds.height,
    }),
    [DirectionalPosition.Bottom]: (config: LauncherSizeConfig, bounds: Bounds, launcherBounds: Bounds) => ({
      offsetX: launcherBounds.width - bounds.width,
      offsetY: 0,
    }),
    [DirectionalPosition.Left]: (config: LauncherSizeConfig, bounds: Bounds, launcherBounds: Bounds) => ({
      offsetX: config.launcher,
      offsetY: launcherBounds.height - bounds.height,
    }),
  },
  [SETTINGS_MENU_WINDOW]: {
    [DirectionalPosition.Top]: (config: LauncherSizeConfig, bounds: Bounds, launcherBounds: Bounds, systemDrawerSize: number) => ({
      offsetX: launcherBounds.width - systemDrawerSize - config.minimizeToTrayIcon,
      offsetY: config.launcher,
    }),
    [DirectionalPosition.Right]: (config: LauncherSizeConfig, bounds: Bounds, launcherBounds: Bounds, systemDrawerSize: number) => ({
      offsetX: 0,
      offsetY: launcherBounds.height - systemDrawerSize - config.minimizeToTrayIcon,
    }),
    [DirectionalPosition.Bottom]: (config: LauncherSizeConfig, bounds: Bounds, launcherBounds: Bounds, systemDrawerSize: number) => ({
      offsetX: launcherBounds.width - systemDrawerSize - config.minimizeToTrayIcon,
      offsetY: 0,
    }),
    [DirectionalPosition.Left]: (config: LauncherSizeConfig, bounds: Bounds, launcherBounds: Bounds, systemDrawerSize: number) => ({
      offsetX: config.launcher,
      offsetY: launcherBounds.height - systemDrawerSize - config.minimizeToTrayIcon,
    }),
  },
};

export const isBottom = (position: DirectionalPosition) => position === BOTTOM;
export const isLeft = (position: DirectionalPosition) => position === LEFT;
export const isRight = (position: DirectionalPosition) => position === RIGHT;
export const isTop = (position: DirectionalPosition) => position === TOP;
export const isTopOrBottom = (position: DirectionalPosition) => isTop(position) || isBottom(position);
export const isLeftOrRight = (position: DirectionalPosition) => isLeft(position) || isRight(position);
export const isBottomOrRight = (position: DirectionalPosition) => isBottom(position) || isRight(position);

export const calcMaxAppCount = (
  launcherPosition: DirectionalPosition,
  launcherSizeConfig: LauncherSizeConfig,
  systemDrawerSize: number,
  monitorDetails: MonitorDetails,
) => {
  const { appIcon, appIconGutter, launcher } = launcherSizeConfig;
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const { availableRect } = monitorDetails;
  const monitorGuttersSize = SIZE.LAUNCHER_MONITOR_GUTTER * 2;
  const maximumEdgeLength = (isOnTopOrBottom ? getCoordinatesWidth(availableRect) : getCoordinatesHeight(availableRect)) - monitorGuttersSize;
  const maximumAppSpace = maximumEdgeLength - launcher - systemDrawerSize;

  return Math.floor((maximumAppSpace - appIconGutter * 2) / (appIcon + appIconGutter * 2));
};

export const calcAppListDimensions = (
  appCount: number,
  launcherPosition: DirectionalPosition,
  launcherSizeConfig: LauncherSizeConfig,
  systemDrawerSize: number,
  monitorDetails: MonitorDetails,
) => {
  const { appIcon, appIconGutter, launcher } = launcherSizeConfig;
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const maxAppCount = calcMaxAppCount(launcherPosition, launcherSizeConfig, systemDrawerSize, monitorDetails);

  const appWithGutter = appIcon + appIconGutter * 2;
  const edgeGutter = appCount ? appIconGutter * 2 : 0;
  const totalAppSpace = Math.min(maxAppCount, appCount) * appWithGutter + edgeGutter;

  const overflowRowOrColumnCount = Math.ceil(appCount / maxAppCount);
  const overflowRowOrColumnSize = overflowRowOrColumnCount * launcher;

  const height = isOnTopOrBottom ? overflowRowOrColumnSize : totalAppSpace;
  const width = isOnTopOrBottom ? totalAppSpace : overflowRowOrColumnSize;
  return {
    height,
    width,
  };
};

/**
 * Returns the dimensions of the launcher based on the number of ctas and its position.
 *
 * @param appCount - number of apps in launcher
 * @param monitorDetails - monitor information
 * @param launcherPosition - current launcher position
 * @param launcherSizeConfig - current launcher sizing config
 * @param systemDrawerSize - size of SystemDrawer
 *
 * @returns {Dimensions}
 */
export const calcLauncherDimensions = (
  appCount: number,
  monitorDetails: MonitorDetails,
  launcherPosition: DirectionalPosition,
  launcherSizeConfig: LauncherSizeConfig,
  systemDrawerSize: number,
): Dimensions => {
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const { launcher, minimizeToTrayIcon } = launcherSizeConfig;
  const STATIC_DIMENSION = launcher;
  const minimizeToTray = minimizeToTrayIcon;

  const minimumDynamicDimension = launcher + systemDrawerSize + minimizeToTray;
  const appListDimensions = calcAppListDimensions(appCount, launcherPosition, launcherSizeConfig, systemDrawerSize + minimizeToTray, monitorDetails);
  const rawDynamicDimension = launcher + systemDrawerSize + (isOnTopOrBottom ? appListDimensions.width : appListDimensions.height) + minimizeToTray;
  const dynamicDimension = Math.max(minimumDynamicDimension, rawDynamicDimension);

  const height = isOnTopOrBottom ? STATIC_DIMENSION : dynamicDimension;
  const width = isOnTopOrBottom ? dynamicDimension : STATIC_DIMENSION;

  return {
    height,
    width,
  };
};

/**
 * Returns coordinates of where the launcher should be.
 *
 * @param dimensions - dimensions of window
 * @param monitorDetails - monitor information
 * @param launcherPosition - current launcher position
 *
 * @returns {PointTopLeft}
 */
export const calcLauncherCoordinates = (dimensions: Dimensions, monitorDetails: MonitorDetails, launcherPosition: DirectionalPosition): PointTopLeft => {
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const { height, width } = dimensions;
  const edgeLength = isOnTopOrBottom ? width : height;
  const edgeDelta = edgeLength / 2;

  const { availableRect } = monitorDetails;
  const { bottom, left, right, top } = availableRect;
  const midpoint = (isOnTopOrBottom ? getCoordinatesWidth(availableRect) : getCoordinatesHeight(availableRect)) / 2 + (isOnTopOrBottom ? left : top);

  let leftCoord;
  let topCoord;
  switch (launcherPosition) {
    case DirectionalPosition.Bottom: {
      leftCoord = midpoint - edgeDelta;
      topCoord = bottom - height;
      break;
    }
    case DirectionalPosition.Left: {
      leftCoord = left;
      topCoord = midpoint - edgeDelta;
      break;
    }
    case DirectionalPosition.Right: {
      leftCoord = right - width;
      topCoord = midpoint - edgeDelta;
      break;
    }
    default: {
      leftCoord = midpoint - edgeDelta;
      topCoord = top;
    }
  }

  return { left: Math.round(leftCoord), top: Math.round(topCoord) };
};

/**
 * Calculates launcher bounds.
 *
 * @param appCount - number of apps in launcher
 * @param monitorDetails - monitor information
 * @param launcherPosition - current launcher position
 * @param launcherSizeConfig - current launcher sizing config
 * @param systemDrawerSize - size of SystemDrawer
 *
 *
 * @returns {Bounds}
 */
export const calcLauncherPosition = (
  appCount: number,
  monitorDetails: MonitorDetails,
  launcherPosition: DirectionalPosition,
  launcherSizeConfig: LauncherSizeConfig,
  systemDrawerSize: number,
): Bounds => {
  const dimensions = calcLauncherDimensions(appCount, monitorDetails, launcherPosition, launcherSizeConfig, systemDrawerSize);
  const coordinates = calcLauncherCoordinates(dimensions, monitorDetails, launcherPosition);

  return {
    ...coordinates,
    ...dimensions,
  };
};

/**
 * Calculates directional coordinates relative to launcher.
 *
 * @param dimensions - window dimensions to be relative to launcher bounds
 * @param offsetX - offset applied to the x plane
 * @param offsetY - offset applied to the y plane
 * @param launcherBounds - launcher bounds
 * @param launcherPosition - launcher position
 *
 * @returns {PointTopLeft}
 */
export const calcCoordinatesRelativeToLauncherBounds = (
  dimensions: Dimensions,
  offsetX: number,
  offsetY: number,
  launcherBounds: Bounds,
  launcherPosition: DirectionalPosition,
): PointTopLeft => {
  const { left, top } = launcherBounds;

  const isBottomOffset = launcherPosition === DirectionalPosition.Bottom ? dimensions.height : 0;
  const isRightOffset = launcherPosition === DirectionalPosition.Right ? dimensions.width : 0;

  return {
    left: left + offsetX - isRightOffset,
    top: top + offsetY - isBottomOffset,
  };
};

/**
 * Calculates window bounds relative to launcher.
 *
 * @param finName - window fin name
 * @param bounds - window bounds relative to launcher
 * @param launcherBounds - launcher bounds
 * @param launcherPosition - launcher position
 * @param launcherSizeConfig - launcher configuration information
 * @param systemDrawerSize - system drawer size in pixels
 *
 * @returns {Bounds}
 */
export const calcBoundsRelativeToLauncher = (
  finName: string,
  bounds: Bounds,
  launcherBounds: Bounds,
  launcherPosition: DirectionalPosition,
  launcherSizeConfig: LauncherSizeConfig,
  systemDrawerSize: number,
): Bounds => {
  const { offsetX, offsetY } =
    OFFSETS[finName] && OFFSETS[finName][launcherPosition]
      ? OFFSETS[finName][launcherPosition](launcherSizeConfig, bounds, launcherBounds, systemDrawerSize)
      : { offsetX: 0, offsetY: 0 };
  const dimensions = { width: bounds.width, height: bounds.height };
  const coordinates = calcCoordinatesRelativeToLauncherBounds(dimensions, offsetX, offsetY, launcherBounds, launcherPosition);

  return {
    ...coordinates,
    ...dimensions,
  };
};
