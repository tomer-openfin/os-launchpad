import styled from 'styled-components';

import { Props } from './SvgIcon';

export const Icon = styled.div<Props>`
  display: inline-block;
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;

  ${({ color, disabled, hoverColor, imgSrc, isActive, onClick, size }) => `
    background-color: ${isActive ? hoverColor : color};
    cursor: ${onClick && !disabled ? 'pointer' : 'default'};
    height: ${typeof size === 'string' ? size : `${size}px`};
    mask-image: url(${imgSrc});
    width: ${typeof size === 'string' ? size : `${size}px`};

    &:hover {
      background-color: ${(onClick && !disabled) || isActive ? hoverColor : color};
    }
  `}
`;
