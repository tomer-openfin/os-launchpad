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
  height: ${({ height }) => height}px;
  width: ${({ width }) => width};
  padding: 7px 9px;
  resize: none;
  box-shadow: 2px 2px 7px 0 ${hexToRgba(Color.VACUUM, 0.5)};

  &::placeholder {
    opacity: 0.3;
  }
`;
