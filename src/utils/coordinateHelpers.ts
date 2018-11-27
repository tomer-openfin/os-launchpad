import { Bounds, DirectionalCoordinates, LauncherPosition } from '../types/commons';
import { isTopOrBottom } from './windowPositionHelpers';

export const getNewPosDelta = (bounds: Bounds, launcherPosition: LauncherPosition, expand: boolean, visbilityDelta: number = 0): DirectionalCoordinates => {
  const { width, height } = bounds;
  const isTopOrBottomPosition = isTopOrBottom(launcherPosition);
  const isTopOrLeft = launcherPosition === LauncherPosition.Top || launcherPosition === LauncherPosition.Left;
  const directionMultiplier = (expand && isTopOrLeft) || (!expand && !isTopOrLeft) ? 1 : -1;

  const delta = (isTopOrBottomPosition ? height - visbilityDelta : width - visbilityDelta) * directionMultiplier;

  return {
    left: isTopOrBottomPosition ? 0 : delta,
    top: isTopOrBottomPosition ? delta : 0,
  };
};

export const isPosInBounds = (pos: DirectionalCoordinates, bounds: Bounds) => {
  const { left: posLeft, top: posTop } = pos;
  const { height, left: boundsLeft, top: boundsTop, width } = bounds;

  const isWithinX = posLeft >= boundsLeft && posLeft <= boundsLeft + width;
  const isWithinY = posTop >= boundsTop && posTop <= boundsTop + height;

  return isWithinX && isWithinY;
};
