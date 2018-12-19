import styled, { css } from 'styled-components';
import { Color } from '../../styles/index';
import { TypeStyleSirius } from '../../styles/typography.css';

interface ButtonProps {
  backgroundColor?: string;
  height?: number;
  isDark?: boolean;
  width?: number;
}

export const ButtonCSS = css<ButtonProps>`
  ${TypeStyleSirius};

  align-items: center;
  background-color: ${props => props.backgroundColor || Color.VENUS};
  color: ${Color.SUN};
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 0;
  border: none;
  outline: none;
  border-radius: 3px;
  height: ${props => props.height || '36px'};
  width: ${props => props.width || '110px'};
  min-width: 110px;
  position: relative;

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

  &:hover:not([disabled]) {
    &:before {
      opacity: 0.4;
    }
  }
`;

export default styled.button<ButtonProps>`
  ${ButtonCSS};
`;
