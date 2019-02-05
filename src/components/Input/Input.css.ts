import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import { Color, hexToRgb, Typography } from '../../styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export default styled.input<InputProps>`
  ${Typography.TypeStyleCanopus}

  background-color: ${Color.SUN};
  border-style: solid;
  border-width: 3px;
  margin: 0;
  outline: none;
  padding: 4px 9px 6px;
  position: relative;

  ::placeholder {
    color: ${Color.VACUUM};
    opacity: 0.5;
  }

  ${({ hasError }) => {
    const { r, g, b } = hexToRgb(Color.JUPITER);
    const errorRgb = hexToRgb(Color.MARS);
    const errorBorderColor = `rgba(${errorRgb.r}, ${errorRgb.g}, ${errorRgb.b}, 0.5)`;

    return `
      border-color: ${hasError ? `${errorBorderColor}` : 'transparent'};
      color: ${hasError ? Color.MARS : Color.VACUUM};

      &:focus{
        border-color: ${hasError ? `${errorBorderColor}` : `rgba(${r}, ${g}, ${b}, 0.54)`} ;
      }
    `;
  }}
`;
