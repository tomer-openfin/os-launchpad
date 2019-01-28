import styled from 'styled-components';

import { Color } from '../../styles';
import { Props } from './AppIcon';

interface WrapperProps {
  isDisabled?: boolean;
  onClick?: () => void;
  size: number;
  borderWidth: number;
}

export const Icon = styled.div<Pick<Props, 'imgSrc'>>`
  background-color: ${Color.SUN};
  background-image: url(${props => props.imgSrc || ''});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
`;

export const Wrapper = styled.div<WrapperProps>`
  border-color: rgba(255, 255, 255, 0.06);
  border-style: solid;
  border-radius: 9.9px;
  display: inline-block;
  flex-shrink: 0;
  overflow: hidden;
  transition: opacity 300ms ease-in-out;

  ${({ borderWidth, isDisabled, onClick, size }) => `
    border-width: ${borderWidth}px;
    cursor: ${!isDisabled && onClick ? 'pointer' : 'default'};
    opacity: ${isDisabled ? 0.1 : 1};
    height: ${size}px;
    width: ${size}px;
  `}
`;
