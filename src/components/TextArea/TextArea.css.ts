import { TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

import { hexToRgba, Typography } from '../../styles';
import Color from '../../styles/color';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  height: number;
  hasError?: boolean;
  width: string;
}

export default styled.textarea<TextAreaProps>`
  ${Typography.TypeStyleCanopus}

  border-style: solid;
  border-width: 3px;
  box-shadow: 2px 2px 7px 0 ${hexToRgba(Color.VACUUM, 0.5)};
  height: ${({ height }) => height}px;
  margin: 0;
  outline: none;
  padding: 4px 9px 6px;
  resize: none;
  width: ${({ width }) => width};

  &::placeholder {
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
        box-shadow: 2px 2px 7px 0 ${hexToRgba(Color.VACUUM, 0.5)};
      }
    `;
  }}
`;
