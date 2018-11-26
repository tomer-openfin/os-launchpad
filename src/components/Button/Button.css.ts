import styled from 'styled-components';
import { Color } from '../../styles/index';

interface ButtonProps {
  isDark?: boolean;
  width?: number;
}

export default styled.button<ButtonProps>`
  align-items: center;
  background-color: ${props => (props.isDark ? Color.DOVE_GRAY : Color.GALLERY)};
  color: ${props => (props.isDark ? Color.WHITE : Color.BLACK)};
  cursor: pointer;
  display: flex;
  display: inline-block;
  font-size: 14px;
  justify-content: center;
  padding: 12px 10px;
  ${props => (props.width ? `width: ${props.width}px;` : '')}

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;
