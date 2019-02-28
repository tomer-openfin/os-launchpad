import styled, { css, keyframes } from 'styled-components';

import { Color } from '../../styles';

const ANIMATION_DURATION = 900;
const MIDDLE_DURATION = ANIMATION_DURATION / 2;
const SCALE_FACTOR = 0.6;

interface DotProps {
  count: number;
  index: number;
}

interface WrapperProps {
  size: number;
}

const loading = () => {
  const end = (ANIMATION_DURATION / (ANIMATION_DURATION + MIDDLE_DURATION)) * 100;
  const mid = end / 2;

  return keyframes`
    0%,
    ${end}%,
    100% {
      transform: scale(${SCALE_FACTOR});
    }

    ${mid}% {
      transform: scale(1);
    }
  `;
};

// cases 1 and 2 dot are a special case, ensure that total duration lines up with ANIMATION_DURATION
// each additional dot adds half of the ANIMATION_DURATION to total animation-duration
export const Dot = styled.div<DotProps>`
  ${({ count, index }) => css`
    animation-delay: ${MIDDLE_DURATION * index}ms;
    animation-duration: ${ANIMATION_DURATION * Math.max(1, 0.5 * count)}ms;
    animation-name: ${loading()};
  `}

  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  background-color: ${Color.SUN};
  border-radius: 100%;
  display: inline-block;
  margin: 0px 2.5px;
  transform: scale(${SCALE_FACTOR});
`;

export const Wrapper = styled.div<WrapperProps>`
  display: inline-block;
  line-height: 0;
  position: relative;

  ${Dot}:first-of-type {
    margin-left: 0;
  }

  ${Dot}:last-of-type {
    margin-right: 0;
  }

  ${Dot} {
    ${({ size }) => `
      height: ${size}px;
      width: ${size}px;
    `}
  }
`;
