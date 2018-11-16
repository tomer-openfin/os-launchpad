import { LauncherPosition } from '../types/commons';

const { Bottom: BOTTOM, Left: LEFT, Right: RIGHT, Top: TOP } = LauncherPosition;

export const isTopOrBottom = (position: LauncherPosition) => position === TOP || position === BOTTOM;
export const isLeftOrRight = (position: LauncherPosition) => position === LEFT || position === RIGHT;
