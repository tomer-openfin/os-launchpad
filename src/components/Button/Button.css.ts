import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Color, getCssValueFromNumberOrString, Typography } from '../../styles';

interface ButtonProps {
  backgroundColor?: string;
  height?: string | number;
  isDark?: boolean;
  width?: string | number;
}

export const defaultProps = {
  backgroundColor: Color.EARTH,
  height: 36,
  width: 110,
};

export const ButtonCSS = css<ButtonProps>`
  ${Typography.TypeStyleSirius}

  align-items: center;
  border-radius: 3px;
  border: 1px solid transparent;
  color: ${Color.SUN};
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 0;
  outline: none;
  padding: 0 7px;
  position: relative;

  ${({ backgroundColor = defaultProps.backgroundColor, height = defaultProps.height, width = defaultProps.width }) => `
    background-color: ${backgroundColor};
    min-width: ${getCssValueFromNumberOrString(width)};
    min-height: ${getCssValueFromNumberOrString(height)};
    max-height: ${getCssValueFromNumberOrString(height)};
  `}

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 3px;
    box-shadow: 0 4px 8px ${Color.VACUUM};
    opacity: 0.2;
    transition: opacity 150ms ease-in-out;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  :hover:not([disabled]) {
    border-color: transparent;

    &:before {
      opacity: 0.4;
    }
  }

  :focus {
    border-color: ${Color.JUPITER};
  }
`;

export default styled.button<ButtonProps>`
  ${ButtonCSS}
`;

export const ButtonLink = styled(Link)`
  ${ButtonCSS}
`;
