import { Bounds, DirectionalCoordinates, DirectionalPosition, Point, PrimaryDirectionalCoordinates, WindowDetail } from '../types/commons';
import { isTopOrBottom } from './windowPositionHelpers';

export const RESIZE_OFFSET_X = 50;
export const RESIZE_OFFSET_Y = 50;

export const getCoordinatesHeight = (coordinates: { bottom: number; top: number }): number => {
  const { bottom, top } = coordinates;
  return bottom - top;
};

export const getCoordinatesWidth = (coordinates: { left: number; right: number }): number => {
  const { left, right } = coordinates;
  return right - left;
};

export const getCoordinatesMidPoint = (coordinates: DirectionalCoordinates): Point => {
  const x = getCoordinatesWidth(coordinates) / 2;
  const y = getCoordinatesHeight(coordinates) / 2;

  return { x, y };
};

export const getArea = ({ height, width }: { height: number; width: number }) => height * width;

export const getNewPosDelta = (
  bounds: Bounds,
  launcherPosition: DirectionalPosition,
  expand: boolean,
  visbilityDelta: number = 0,
): PrimaryDirectionalCoordinates => {
  const { width, height } = bounds;
  const isTopOrBottomPosition = isTopOrBottom(launcherPosition);
  const isTopOrLeft = launcherPosition === DirectionalPosition.Top || launcherPosition === DirectionalPosition.Left;
  const directionMultiplier = (expand && isTopOrLeft) || (!expand && !isTopOrLeft) ? 1 : -1;

  const delta = (isTopOrBottomPosition ? height - visbilityDelta : width - visbilityDelta) * directionMultiplier;

  return {
    left: isTopOrBottomPosition ? 0 : delta,
    top: isTopOrBottomPosition ? delta : 0,
  };
};

export const isPosInBounds = (pos: PrimaryDirectionalCoordinates, bounds: Bounds) => {
  const { left: posLeft, top: posTop } = pos;
  const { height, left: boundsLeft, top: boundsTop, width } = bounds;

  const isWithinX = posLeft >= boundsLeft && posLeft <= boundsLeft + width;
  const isWithinY = posTop >= boundsTop && posTop <= boundsTop + height;

  return isWithinX && isWithinY;
};

export const isPosInCoordinates = (pos: PrimaryDirectionalCoordinates, coordinates: DirectionalCoordinates) => {
  const { left: posLeft, top: posTop } = pos;
  const { bottom: coordBottom, left: coordLeft, right: coordRight, top: coordTop } = coordinates;

  const isWithinX = posLeft >= coordLeft && posLeft <= coordRight;
  const isWithinY = posTop >= coordTop && posTop <= coordBottom;

  return isWithinX && isWithinY;
};

export const isPointInCoordinates = (point: Point, coordinates: DirectionalCoordinates) => isPosInCoordinates({ left: point.x, top: point.y }, coordinates);

export const isBoundsInCoordinates = (bounds: Bounds, coordinates: DirectionalCoordinates) => {
  const { height, left, top, width } = bounds;

  const topLeftPos = { left, top };
  const topRightPos = { left: left + width, top };
  const bottomRightPos = { left: left + width, top: top + height };
  const bottomLeftPos = { left, top: top + height };

  return (
    isPosInCoordinates(topLeftPos, coordinates) &&
    isPosInCoordinates(topRightPos, coordinates) &&
    isPosInCoordinates(bottomRightPos, coordinates) &&
    isPosInCoordinates(bottomLeftPos, coordinates)
  );
};

export const getBoundsCenterInCoordinates = (bounds: Bounds, coordinates: DirectionalCoordinates): PrimaryDirectionalCoordinates => {
  const { x, y } = getCoordinatesMidPoint(coordinates);
  const xDelta = bounds.width / 2;
  const yDelta = bounds.height / 2;

  return { left: x - xDelta, top: y - yDelta };
};

export const getDestinationBoundsInCoordinates = (
  bounds: Bounds,
  coordinates: DirectionalCoordinates,
  offsetX: number = 0,
  offsetY: number = 0,
): PrimaryDirectionalCoordinates => {
  let newTop = bounds.top;
  let newLeft = bounds.left;

  // window above monitor;
  if (bounds.top < coordinates.top) {
    newTop = coordinates.top + offsetY;
  }

  // window below monitor;
  const windowBottom = bounds.top + bounds.height;
  if (windowBottom > coordinates.bottom) {
    newTop = coordinates.bottom - bounds.height - offsetY;
  }

  // window to left of monitor;
  if (bounds.left < coordinates.left) {
    newLeft = coordinates.left + offsetX;
  }

  // window to right of monitor;
  const windowRight = bounds.left + bounds.width;
  if (windowRight > coordinates.right) {
    newLeft = coordinates.right - bounds.width - offsetX;
  }

  return { left: newLeft, top: newTop };
};

export const getGroupBounds = (windows: WindowDetail[]) => {
  const left = Math.min(...windows.map(win => win.left));
  const top = Math.min(...windows.map(win => win.top));
  const right = Math.max(...windows.map(win => win.right));
  const bottom = Math.max(...windows.map(win => win.bottom));
  const width = right - left;
  const height = bottom - top;

  return {
    bottom,
    height,
    left,
    right,
    top,
    width,
  };
};
