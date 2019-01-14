import styled from 'styled-components';

import { AppIconSizes } from '../../types/commons';

import { Color } from '../../styles';
import { Props } from './AppIcon';

interface WrapperProps {
  isDisabled?: boolean;
  onClick?: () => void;
  size: AppIconSizes;
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
  border: 2.7px solid rgba(255, 255, 255, 0.06);
  border-radius: 9.9px;
  display: inline-block;
  flex-shrink: 0;
  overflow: hidden;
  transition: opacity 300ms ease-in-out;

  ${({ isDisabled, onClick, size }) => `
    cursor: ${!isDisabled && onClick ? 'pointer' : 'default'};
    opacity: ${isDisabled ? 0.1 : 1};
    height: ${size}px;
    width: ${size}px;
  `}
`;
