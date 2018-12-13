import styled from 'styled-components';

import { DirectionalPosition } from '../../types/commons';

import AppIndicator from '../AppIndicator';
import { Props } from './AppIcon';

interface DirectionalPositionProps {
  position: DirectionalPosition;
}

export const Icon = styled.div<Pick<Props, 'imgSrc'>>`
  background: url(${props => props.imgSrc || ''});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
`;

export const IconWrapper = styled.div<Pick<Props, 'size'>>`
  border-radius: 9.9px;
  border: 2.7px solid rgba(255, 255, 255, 0.2);
  height: ${props => props.size}px;
  overflow: hidden;
  width: ${props => props.size}px;
`;

export const Wrapper = styled.div<Pick<Props, 'isDisabled'>>`
  opacity: ${({ isDisabled }) => (isDisabled ? 0.1 : 1)};
  transition: opacity 350ms ease-in-out;
  cursor: pointer;
  position: relative;
  height: 100%;
  width: 100%;
`;

export const StyledAppIndicator = styled(AppIndicator)<DirectionalPositionProps>`
  position: absolute;

  ${props => {
    switch (props.position) {
      case DirectionalPosition.Right: {
        return `
          right: -20px;
          top: calc(50% - 6px);
        `;
      }
      case DirectionalPosition.Bottom: {
        return `
          bottom: -20px;
          left: calc(50% - 6px);
        `;
      }
      case DirectionalPosition.Left: {
        return `
          left: -20px;
          top: calc(50% - 6px);
        `;
      }
      case DirectionalPosition.Top:
      default: {
        return `
          top: -20px;
          left: calc(50% - 6px);
        `;
      }
    }
  }}
`;
