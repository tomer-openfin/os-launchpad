import { APP_LAUNCHER_OVERFLOW_WINDOW, LAYOUTS_WINDOW } from '../config/windows';
import { Bounds, Dimensions, DirectionalPosition, MonitorInfo, PrimaryDirectionalCoordinates } from '../types/commons';

import { calcSystemDrawerSize } from '../components/SystemDrawer/utils';
import { SystemIcon } from './getSystemIcons';
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
  systemIcons: SystemIcon[],
  monitorInfo: MonitorInfo,
) => {
  const { appIcon, appIconGutter, launcher } = launcherSizeConfig;
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const totalDefaultSystemSize = calcSystemDrawerSize(systemIcons, false, launcherSizeConfig);
  const {
    primaryMonitor: {
      availableRect: { bottom, left, right, top },
    },
  } = monitorInfo;
  const monitorGuttersSize = SIZE.LAUNCHER_MONITOR_GUTTER * 2;
  const maximumEdgeLength = (isOnTopOrBottom ? right - left : bottom - top) - monitorGuttersSize;
  const maximumAppSpace = maximumEdgeLength - launcher - totalDefaultSystemSize;

  return Math.floor((maximumAppSpace - appIconGutter * 2) / (appIcon + appIconGutter * 2));
};

export const calcAppListDimensions = (
  appCount: number,
  launcherPosition: DirectionalPosition,
  launcherSizeConfig: LauncherSizeConfig,
  systemIcons: SystemIcon[],
  monitorInfo: MonitorInfo,
) => {
  const { appIcon, appIconGutter, launcher } = launcherSizeConfig;
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const maxAppCount = calcMaxAppCount(launcherPosition, launcherSizeConfig, systemIcons, monitorInfo);

  const appWithGutter = appIcon + appIconGutter * 2;
  const totalAppSpace = Math.min(maxAppCount, appCount) * appWithGutter + appIconGutter * 2;

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
 * Returns new dimensions based on launcher position.
 *
 * @param bounds - window bounds to be converted to dimensions
 * @param launcherPosition - current launcher position
 * @param invert - in reference to top/bottom,
 *                 false: width is larger
 *                 true: height is larger
 *
 * @returns {Dimensions}
 */
export const calcDimensionsByLauncherPosition = (bounds: Bounds, launcherPosition: DirectionalPosition, invert: boolean = false): Dimensions => {
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const { height, width } = bounds;

  const largestDimension = Math.max(width, height);
  const smallestDimension = Math.min(width, height);

  const dimensions = {
    height: isOnTopOrBottom ? smallestDimension : largestDimension,
    width: isOnTopOrBottom ? largestDimension : smallestDimension,
  };

  return invert ? { height: dimensions.width, width: dimensions.height } : dimensions;
};

/**
 * Returns the dimensions of the launcher based on the number of ctas and its position.
 *
 * @param appCount - number of apps in launcher
 * @param systemIcons - SystemIcon[]
 * @param launcherPosition - current launcher position
 *
 * @returns {Dimensions}
 */
export const calcLauncherDimensions = (
  appCount: number,
  systemIcons: SystemIcon[],
  monitorInfo: MonitorInfo,
  launcherPosition: DirectionalPosition,
  launcherSizeConfig: LauncherSizeConfig,
  autoHide: boolean,
  isExpanded: boolean,
): Dimensions => {
  const collapsed = autoHide && !isExpanded;
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const { launcher } = launcherSizeConfig;
  const STATIC_DIMENSION = collapsed ? SIZE.LAUNCHER_HIDDEN_VISIBILITY_DELTA : launcher;

  const totalDefaultSystemSize = calcSystemDrawerSize(systemIcons, false, launcherSizeConfig);
  const totalSystemExpandedSize = calcSystemDrawerSize(systemIcons, true, launcherSizeConfig);

  const minimumDynamicDimension = launcher + totalSystemExpandedSize;
  const appListDimensions = calcAppListDimensions(appCount, launcherPosition, launcherSizeConfig, systemIcons, monitorInfo);
  const rawDynamicDimension = launcher + totalDefaultSystemSize + (isOnTopOrBottom ? appListDimensions.width : appListDimensions.height);
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
 * @param monitorInfo - monitor information
 * @param launcherPosition - current launcher position
 * @param autoHide - flag for weather or not launcher is in autohide mode
 *
 * @returns {PrimaryDirectionalCoordinates}
 */
export const calcLauncherCoordinates = (
  dimensions: Dimensions,
  monitorInfo: MonitorInfo,
  launcherPosition: DirectionalPosition,
): PrimaryDirectionalCoordinates => {
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const { height, width } = dimensions;
  const edgeLength = isOnTopOrBottom ? width : height;
  const edgeDelta = edgeLength / 2;

  const {
    primaryMonitor: {
      availableRect: { bottom, left, right, top },
    },
  } = monitorInfo;
  const midpoint = (isOnTopOrBottom ? right - left : bottom - top) / 2;

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
 * @param systemIcons - SystemIcon[]
 * @param monitorInfo - monitor information
 * @param launcherPosition - current launcher position
 * @param autoHide - flag for weather or not launcher is in autohide mode
 *
 * @returns {Bounds}
 */
export const calcLauncherPosition = (
  appCount: number,
  systemIcons: SystemIcon[],
  monitorInfo: MonitorInfo,
  launcherPosition: DirectionalPosition,
  launcherSizeConfig: LauncherSizeConfig,
  autoHide: boolean,
  isExpanded: boolean,
): Bounds => {
  const dimensions = calcLauncherDimensions(appCount, systemIcons, monitorInfo, launcherPosition, launcherSizeConfig, autoHide, isExpanded);
  const coordinates = calcLauncherCoordinates(dimensions, monitorInfo, launcherPosition);

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
 * @returns {PrimaryDirectionalCoordinates}
 */
export const calcCoordinatesRelativeToLauncherBounds = (
  dimensions: Dimensions,
  offsetX: number,
  offsetY: number,
  launcherBounds: Bounds,
  launcherPosition: DirectionalPosition,
): PrimaryDirectionalCoordinates => {
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
 * @param bounds - window bounds to be relative to launcher
 * @param launcherBounds - launcher bounds
 * @param launcherPosition - launcher position
 *
 * @returns {Bounds}
 */
export const calcBoundsRelativeToLauncher = (
  finName: string,
  bounds: Bounds,
  launcherBounds: Bounds,
  launcherPosition: DirectionalPosition,
  launcherSizeConfig: LauncherSizeConfig,
): Bounds => {
  const { offsetX, offsetY } =
    OFFSETS[finName] && OFFSETS[finName][launcherPosition]
      ? OFFSETS[finName][launcherPosition](launcherSizeConfig, bounds, launcherBounds)
      : { offsetX: 0, offsetY: 0 };
  const dimensions = { width: bounds.width, height: bounds.height };
  const coordinates = calcCoordinatesRelativeToLauncherBounds(dimensions, offsetX, offsetY, launcherBounds, launcherPosition);

  return {
    ...coordinates,
    ...dimensions,
  };
};
