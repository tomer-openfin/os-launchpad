import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

import { Color, getCssValueFromNumberOrString, hexToRgba } from '../../styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  borderRadius?: number | string;
  height?: number | string;
  isActive?: boolean;
  width?: number | string;
}

export default styled.button<Props>`
  border: none;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  padding: 0;
  text-indent: 100%;
  white-space: nowrap;

  &:hover {
    background-color: ${Color.JUPITER};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${hexToRgba(Color.JUPITER, 0.75)};
  }

  ${({ borderRadius, height, isActive, width }) => `
    ${borderRadius !== undefined ? `border-radius: ${getCssValueFromNumberOrString(borderRadius)};` : ''}
    background-color: ${isActive ? Color.JUPITER : Color.MERCURY};
    ${height !== undefined ? `height: ${getCssValueFromNumberOrString(height)};` : ''}
    ${width !== undefined ? `width: ${getCssValueFromNumberOrString(width)};` : ''}
  `}
`;
