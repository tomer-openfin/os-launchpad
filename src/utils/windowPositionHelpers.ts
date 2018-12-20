import { APP_LAUNCHER_OVERFLOW_WINDOW, LAYOUTS_WINDOW } from '../config/windows';
import { Bounds, Dimensions, DirectionalPosition, MonitorInfo, PrimaryDirectionalCoordinates } from '../types/commons';

import { SystemIcon } from './getSystemIcons';
import * as SIZE from './sizingConstants';

const { Bottom: BOTTOM, Left: LEFT, Right: RIGHT, Top: TOP } = DirectionalPosition;

const OFFSETS = {
  [APP_LAUNCHER_OVERFLOW_WINDOW]: {
    [DirectionalPosition.Top]: () => ({
      offsetX: SIZE.MAX_STATIC_DIMENSION,
      offsetY: 0,
    }),
    [DirectionalPosition.Right]: () => ({
      offsetX: SIZE.MAX_STATIC_DIMENSION,
      offsetY: SIZE.MAX_STATIC_DIMENSION,
    }),
    [DirectionalPosition.Bottom]: () => ({
      offsetX: SIZE.MAX_STATIC_DIMENSION,
      offsetY: SIZE.MAX_STATIC_DIMENSION,
    }),
    [DirectionalPosition.Left]: () => ({
      offsetX: 0,
      offsetY: SIZE.MAX_STATIC_DIMENSION,
    }),
  },
  [LAYOUTS_WINDOW]: {
    [DirectionalPosition.Top]: (launcherBounds: Bounds, isLauncherDrawerExpanded: boolean) => ({
      offsetX: launcherBounds.width - (isLauncherDrawerExpanded ? 160 : 135),
      offsetY: SIZE.MAX_STATIC_DIMENSION - SIZE.LAUNCHER_HIDDEN_VISIBILITY_DELTA,
    }),
    [DirectionalPosition.Right]: (launcherBounds: Bounds, isLauncherDrawerExpanded: boolean) => ({
      offsetX: SIZE.LAUNCHER_HIDDEN_VISIBILITY_DELTA,
      offsetY: launcherBounds.height - (isLauncherDrawerExpanded ? 160 : 135),
    }),
    [DirectionalPosition.Bottom]: (launcherBounds: Bounds, isLauncherDrawerExpanded: boolean) => ({
      offsetX: launcherBounds.width - (isLauncherDrawerExpanded ? 160 : 135),
      offsetY: SIZE.LAUNCHER_HIDDEN_VISIBILITY_DELTA,
    }),
    [DirectionalPosition.Left]: (launcherBounds: Bounds, isLauncherDrawerExpanded: boolean) => ({
      offsetX: SIZE.MAX_STATIC_DIMENSION - SIZE.LAUNCHER_HIDDEN_VISIBILITY_DELTA,
      offsetY: launcherBounds.height - (isLauncherDrawerExpanded ? 160 : 135),
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

export const calcExpandedSystemSize = (systemIcons: SystemIcon[]) => {
  const totalSystemIconSize = systemIcons.length * SIZE.SYSTEM_ICON;
  const totalExpandedSystemPadding = 2 * SIZE.EXPANDED_SYSTEM_PADDING;
  const totalSystemGutter = (systemIcons.length - 1) * SIZE.SYSTEM_GUTTER;

  return SIZE.COLLAPSE_ICON + totalSystemIconSize + totalExpandedSystemPadding + totalSystemGutter;
};

export const calcCollapsedSystemSize = (systemIcons: SystemIcon[]) => {
  const totalDefaultSystemIconSizes = systemIcons.reduce((acc, icon) => (icon.shownCollapsed ? acc + SIZE.SYSTEM_ICON : acc), 0);
  const totalCollapsedSystemPadding = 2 * SIZE.COLLAPSED_SYSTEM_PADDING;

  return SIZE.EXPAND_ICON + totalDefaultSystemIconSizes + totalCollapsedSystemPadding;
};

export const calcMaxAppCount = (launcherPosition: DirectionalPosition, systemIcons: SystemIcon[], monitorInfo: MonitorInfo) => {
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const totalDefaultSystemSize = calcCollapsedSystemSize(systemIcons);
  const {
    primaryMonitor: {
      availableRect: { bottom, left, right, top },
    },
  } = monitorInfo;
  const monitorGuttersSize = SIZE.LAUNCHER_MONITOR_GUTTER * 2;
  const maximumEdgeLength = (isOnTopOrBottom ? right - left : bottom - top) - monitorGuttersSize;
  const maximumAppSpace = maximumEdgeLength - SIZE.LOGO - totalDefaultSystemSize;

  return Math.floor((maximumAppSpace - SIZE.APP_GUTTER) / (SIZE.APP_ICON + SIZE.APP_GUTTER));
};

export const calcAppListDimensions = (appCount: number, launcherPosition: DirectionalPosition, systemIcons: SystemIcon[], monitorInfo: MonitorInfo) => {
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const maxAppCount = calcMaxAppCount(launcherPosition, systemIcons, monitorInfo);

  const appWithGutter = SIZE.APP_ICON + SIZE.APP_GUTTER;
  const totalAppSpace = appCount ? Math.min(maxAppCount, appCount) * appWithGutter + SIZE.APP_GUTTER : SIZE.APP_GUTTER * 2;

  const overflowRowOrColumnCount = Math.ceil(appCount / maxAppCount);
  const overflowRowOrColumnSize = overflowRowOrColumnCount * SIZE.LOGO;

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
  autoHide: boolean,
  isExpanded: boolean,
): Dimensions => {
  const collapsed = autoHide && !isExpanded;
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const STATIC_DIMENSION = collapsed ? SIZE.LAUNCHER_HIDDEN_VISIBILITY_DELTA : SIZE.LOGO;

  const totalDefaultSystemSize = calcCollapsedSystemSize(systemIcons);
  const totalSystemExpandedSize = calcExpandedSystemSize(systemIcons);

  const minimumDynamicDimension = SIZE.LOGO + totalSystemExpandedSize;
  const appListDimensions = calcAppListDimensions(appCount, launcherPosition, systemIcons, monitorInfo);
  const rawDynamicDimension = SIZE.LOGO + totalDefaultSystemSize + (isOnTopOrBottom ? appListDimensions.width : appListDimensions.height);
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
  autoHide: boolean,
  isExpanded: boolean,
): Bounds => {
  const dimensions = calcLauncherDimensions(appCount, systemIcons, monitorInfo, launcherPosition, autoHide, isExpanded);
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
  isLauncherDrawerExpanded: boolean,
  invert: boolean,
): Bounds => {
  const { offsetX, offsetY } = OFFSETS[finName] ? OFFSETS[finName][launcherPosition](launcherBounds, isLauncherDrawerExpanded) : { offsetX: 0, offsetY: 0 };
  const dimensions = calcDimensionsByLauncherPosition(bounds, launcherPosition, invert);
  const coordinates = calcCoordinatesRelativeToLauncherBounds(dimensions, offsetX, offsetY, launcherBounds, launcherPosition);

  return {
    ...coordinates,
    ...dimensions,
  };
};
