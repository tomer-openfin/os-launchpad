import styled from 'styled-components';

import { Props } from './SvgIcon';

export const Icon = styled.div<Props>`
  display: inline-block;

  ${({ color, disabled, hoverColor, imgSrc, isActive, isBackground, onClick, size }) => {
    const propName = isBackground ? 'background' : 'mask';

    return `
      cursor: ${onClick && !disabled ? 'pointer' : 'inherit'};
      height: ${typeof size === 'string' ? size : `${size}px`};
      opacity: ${disabled ? 0.2 : 1};
      width: ${typeof size === 'string' ? size : `${size}px`};

      ${propName}-image: url(${imgSrc});
      ${propName}-size: contain;
      ${propName}-position: center;
      ${propName}-repeat: no-repeat;

      ${
        isBackground
          ? ''
          : `
          background-color: ${isActive ? hoverColor : color};
          &:hover {
            background-color: ${(onClick && !disabled) || isActive ? hoverColor : color};
          }`
      }
    `;
  }}
`;
