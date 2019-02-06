import styled, { css, keyframes } from 'styled-components';

import { Color } from '../../styles';

const ANIMATION_DURATION = 900;

interface DotProps {
  count: number;
  index: number;
}

interface WrapperProps {
  size: number;
}

const loading = (count: number) => {
  const end = 100 / count;
  const mid = end / 2;

  return keyframes`
    0%,
    ${end}%,
    100% {
      transform: scale(0.6);
    }

    ${mid}% {
      transform: scale(1);
    }
  `;
};

// css function required for keyframe injection in styled-components v4
export const Dot = styled.div<DotProps>`
  ${({ count, index }) => css`
    animation-delay: ${index * ANIMATION_DURATION}ms;
    animation-duration: ${count * ANIMATION_DURATION}ms;
    animation-name: ${loading(count)};
  `}

  animation-easing-function: ease-in-out;
  animation-iteration-count: infinite;
  background-color: ${Color.SUN};
  border-radius: 100%;
  display: inline-block;
  margin: 0px 2.5px;
  transform: scale(0.5);
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
