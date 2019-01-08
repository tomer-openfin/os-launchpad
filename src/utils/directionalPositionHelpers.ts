import { DirectionalPosition } from '../types/commons';

export const getOppositeDirection = (directionalPosition: DirectionalPosition) => {
  switch (directionalPosition) {
    case DirectionalPosition.Bottom: {
      return DirectionalPosition.Top;
    }
    case DirectionalPosition.Left: {
      return DirectionalPosition.Right;
    }
    case DirectionalPosition.Right: {
      return DirectionalPosition.Left;
    }
    case DirectionalPosition.Top: {
      return DirectionalPosition.Bottom;
    }
    default: {
      return DirectionalPosition.Bottom;
    }
  }
};
