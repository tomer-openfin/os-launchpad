import { isTopOrBottom } from './launcherPosition';

export const isPosInBounds = (pos, bounds) => {
  const {
    left: posLeft,
    top: posTop,
  } = pos;
  const {
    height,
    left: boundsLeft,
    top: boundsTop,
    width,
  } = bounds;

  const isWithinX = (posLeft >= boundsLeft) && (posLeft <= boundsLeft + width);
  const isWithinY = (posTop >= boundsTop) && (posTop <= boundsTop + height);

  return isWithinX && isWithinY;
};

export const getNewPos = (bounds, launcherPosition, expand) => {
  const { width, height } = bounds;
  const isTopOrBottomPosition = isTopOrBottom(launcherPosition);
  const isTopOrLeft = launcherPosition === 'TOP' || launcherPosition === 'LEFT';
  const directionMultiplier = (expand && isTopOrLeft) || (!expand && !isTopOrLeft)
    ? 1
    : -1;

  const delta = (isTopOrBottomPosition ? height - 5 : width - 5) * directionMultiplier;

  return {
    left: isTopOrBottomPosition ? 0 : delta,
    top: isTopOrBottomPosition ? delta : 0,
  };
};
