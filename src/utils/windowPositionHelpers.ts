import { APP_LAUNCHER_OVERFLOW_WINDOW, LAYOUTS_WINDOW } from '../config/windows';
import { Bounds, Dimensions, LauncherPosition, MonitorInfo, PrimaryDirectionalCoordinates } from '../types/commons';

const { Bottom: BOTTOM, Left: LEFT, Right: RIGHT, Top: TOP } = LauncherPosition;

const OFFSETS = {
  [APP_LAUNCHER_OVERFLOW_WINDOW]: {
    [LauncherPosition.Top]: () => ({
      offsetX: 50,
      offsetY: 0,
    }),
    [LauncherPosition.Right]: () => ({
      offsetX: 50,
      offsetY: 50,
    }),
    [LauncherPosition.Bottom]: () => ({
      offsetX: 50,
      offsetY: 50,
    }),
    [LauncherPosition.Left]: () => ({
      offsetX: 0,
      offsetY: 50,
    }),
  },
  [LAYOUTS_WINDOW]: {
    [LauncherPosition.Top]: (launcherBounds: Bounds) => ({
      offsetX: launcherBounds.width - 100,
      offsetY: 45,
    }),
    [LauncherPosition.Right]: (launcherBounds: Bounds) => ({
      offsetX: 0,
      offsetY: launcherBounds.height - 100,
    }),
    [LauncherPosition.Bottom]: (launcherBounds: Bounds) => ({
      offsetX: launcherBounds.width - 100,
      offsetY: 0,
    }),
    [LauncherPosition.Left]: (launcherBounds: Bounds) => ({
      offsetX: 45,
      offsetY: launcherBounds.height - 100,
    }),
  },
};

export const LAUNCHER_HIDDEN_VISIBILITY_DELTA = 5;

export const isBottom = (position: LauncherPosition) => position === BOTTOM;
export const isLeft = (position: LauncherPosition) => position === LEFT;
export const isRight = (position: LauncherPosition) => position === RIGHT;
export const isTop = (position: LauncherPosition) => position === TOP;
export const isTopOrBottom = (position: LauncherPosition) => isTop(position) || isBottom(position);
export const isLeftOrRight = (position: LauncherPosition) => isLeft(position) || isRight(position);
export const isBottomOrRight = (position: LauncherPosition) => isBottom(position) || isRight(position);

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
export const calcDimensionsByLauncherPosition = (bounds: Bounds, launcherPosition: LauncherPosition, invert: boolean = false): Dimensions => {
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
 * @param ctaCount - number of ctas in launcher
 * @param launcherPosition - current launcher position
 *
 * @returns {Dimensions}
 */
export const calcLauncherDimensions = (ctaCount: number, launcherPosition: LauncherPosition, autoHide: boolean, isExpanded: boolean): Dimensions => {
  const collapsed = autoHide && !isExpanded;
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const LOGO_SIZE = 50;
  const ICON_SIZE = 50;
  // const OVERFLOW = 25;
  const STATIC_DIMENSION = collapsed ? LAUNCHER_HIDDEN_VISIBILITY_DELTA : 50;
  // const dynamicDimension = ctaCount * ICON_SIZE + LOGO_SIZE + OVERFLOW;
  const dynamicDimension = ctaCount * ICON_SIZE + LOGO_SIZE;

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
  launcherPosition: LauncherPosition,
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

  switch (launcherPosition) {
    case LauncherPosition.Bottom: {
      // const delta = autoHide ? LAUNCHER_HIDDEN_VISIBILITY_DELTA : height;

      return {
        left: midpoint - edgeDelta,
        top: bottom - height,
      };
    }
    case LauncherPosition.Left: {
      // const delta = autoHide ? LAUNCHER_HIDDEN_VISIBILITY_DELTA - width : 0;

      return {
        left,
        top: midpoint - edgeDelta,
      };
    }
    case LauncherPosition.Right: {
      // const delta = autoHide ? LAUNCHER_HIDDEN_VISIBILITY_DELTA : width;

      return {
        left: right - width,
        top: midpoint - edgeDelta,
      };
    }
    default: {
      // const delta = autoHide ? LAUNCHER_HIDDEN_VISIBILITY_DELTA - height : 0;

      return {
        left: midpoint - edgeDelta,
        top,
      };
    }
  }
};

/**
 * Calculates launcher bounds.
 *
 * @param ctaCount - number of ctas in launcher
 * @param monitorInfo - monitor information
 * @param launcherPosition - current launcher position
 * @param autoHide - flag for weather or not launcher is in autohide mode
 *
 * @returns {Bounds}
 */
export const calcLauncherPosition = (
  ctaCount: number,
  monitorInfo: MonitorInfo,
  launcherPosition: LauncherPosition,
  autoHide: boolean,
  isExpanded: boolean,
): Bounds => {
  const dimensions = calcLauncherDimensions(ctaCount, launcherPosition, autoHide, isExpanded);
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
  launcherPosition: LauncherPosition,
): PrimaryDirectionalCoordinates => {
  const { left, top } = launcherBounds;

  const isBottomOffset = launcherPosition === LauncherPosition.Bottom ? dimensions.height : 0;
  const isRightOffset = launcherPosition === LauncherPosition.Right ? dimensions.width : 0;

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
export const calcBoundsRelativeToLauncher = (finName: string, bounds: Bounds, launcherBounds: Bounds, launcherPosition: LauncherPosition): Bounds => {
  const { offsetX, offsetY } = OFFSETS[finName] ? OFFSETS[finName][launcherPosition](launcherBounds) : { offsetX: 0, offsetY: 0 };
  const dimensions = calcDimensionsByLauncherPosition(bounds, launcherPosition, true);
  const coordinates = calcCoordinatesRelativeToLauncherBounds(dimensions, offsetX, offsetY, launcherBounds, launcherPosition);

  return {
    ...coordinates,
    ...dimensions,
  };
};
