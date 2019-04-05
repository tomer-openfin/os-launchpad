import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Color } from '../../styles';
import { TypeStyleSirius } from '../../styles/typography.css';

interface ButtonProps {
  backgroundColor?: string;
  height?: number;
  isDark?: boolean;
  width?: number;
}

export const defaultProps = {
  backgroundColor: Color.EARTH,
  height: 36,
  width: 110,
};

export const ButtonCSS = css<ButtonProps>`
  ${TypeStyleSirius}

  align-items: center;
  color: ${Color.SUN};
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 0;
  border: none;
  outline: none;
  border-radius: 3px;
  padding: 0 8px;
  position: relative;

  ${({ backgroundColor = defaultProps.backgroundColor, height = defaultProps.height, width = defaultProps.width }) => `
    background-color: ${backgroundColor};
    min-height: ${height}px;
    min-width: ${width}px;
    max-height: ${height}px;
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
    border: none;

    &:before {
      opacity: 0.4;
    }
  }

  :focus {
    border: 1px solid ${Color.JUPITER};
  }
`;

export default styled.button<ButtonProps>`
  ${ButtonCSS}
`;

export const ButtonLink = styled(Link)`
  ${ButtonCSS}
`;
