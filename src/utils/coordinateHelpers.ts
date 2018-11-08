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
  const isHorizontal = launcherPosition === 'TOP' || launcherPosition === 'BOTTOM';
  const isTopOrLeft = launcherPosition === 'TOP' || launcherPosition === 'LEFT';
  const directionMultiplier = (expand && isTopOrLeft) || (!expand && !isTopOrLeft)
    ? 1
    : -1;

  const delta = (isHorizontal ? height - 5 : width - 5) * directionMultiplier;

  return {
    left: isHorizontal ? 0 : delta,
    top: isHorizontal ? delta : 0,
  };
};
