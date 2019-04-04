import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import { Color, hexToRgba, Typography } from '../../styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  htmlInputRef?: React.RefObject<HTMLInputElement>;
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
    const focusBorderColor = hexToRgba(Color.JUPITER, 0.5);
    const errorBorderColor = hexToRgba(Color.MARS, 0.5);

    return `
      border-color: ${hasError ? errorBorderColor : 'transparent'};
      color: ${hasError ? Color.MARS : Color.VACUUM};

      &:focus {
        border-color: ${hasError ? errorBorderColor : focusBorderColor};
      }
    `;
  }}
`;
