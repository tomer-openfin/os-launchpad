import styled, { css, keyframes } from 'styled-components';

import { DirectionalPosition } from '../../types/enums';
import { isTopOrBottom } from '../../utils/windowPositionHelpers';

import { LoadingAnimatorStatus } from './LoadingAnimator';

interface AnimatorProps {
  animatingCount: number;
  direction: DirectionalPosition;
  status: LoadingAnimatorStatus;
}

const SCALE_PERCENT = 0.9;
const TRANSLATE_ORIGIN = 'translate3d(0, 0, 0)';
const TRANSLATE_TO_DELTA = '10%';

const getTranslateTo = (direction: DirectionalPosition) => {
  const isOnTopOrBottom = isTopOrBottom(direction);
  const xAxis = isOnTopOrBottom ? 0 : TRANSLATE_TO_DELTA;
  const yAxis = isOnTopOrBottom ? TRANSLATE_TO_DELTA : 0;

  return `translate3d(${xAxis}, ${yAxis}, 0)`;
};

export const scaleDownKeyframe = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(${SCALE_PERCENT});
  }
`;

export const bounceKeyframe = (direction: DirectionalPosition) => keyframes`
  from {
    transform: scale(${SCALE_PERCENT}) ${TRANSLATE_ORIGIN};
  }

  to {
    transform: scale(${SCALE_PERCENT}) ${getTranslateTo(direction)};
  }
`;

export const scaleUpKeyframe = (animatingCount: number, direction: DirectionalPosition) => keyframes`
  from {
    transform: ${animatingCount % 2 ? getTranslateTo(direction) : ''} scale(${SCALE_PERCENT});
  }

  to {
    transform: ${animatingCount % 2 ? TRANSLATE_ORIGIN : ''} scale(1);
  }
`;

export const Animator = styled.div<AnimatorProps>`
  ${({ direction }) => {
    const isOnTopOrBottom = isTopOrBottom(direction);
    const xAxis = isOnTopOrBottom ? 'center' : direction;
    const yAxis = isOnTopOrBottom ? direction : 'center';

    return `transform-origin: ${xAxis} ${yAxis};`;
  }}

  ${({ animatingCount, direction, status }) => {
    if (status === LoadingAnimatorStatus.Starting) {
      return css`
        animation-duration: 333ms;
        animation-iteration-count: 1;
        animation-name: ${scaleDownKeyframe};
        animation-timing-function ease-in;
      `;
    }

    if (status === LoadingAnimatorStatus.Animating) {
      return css`
        animation-direction: alternate;
        animation-duration: 333ms;
        animation-iteration-count: infinite;
        animation-name: ${bounceKeyframe(direction)};
        animation-timing-function linear;
      `;
    }

    if (status === LoadingAnimatorStatus.Ending) {
      return css`
        animation-duration: 333ms;
        animation-iteration-count: 1;
        animation-name: ${scaleUpKeyframe(animatingCount, direction)};
        animation-timing-function ease-out;
      `;
    }

    return ``;
  }}
`;
