import styled from 'styled-components';

import { AppIconSizes, DirectionalPosition } from '../../types/commons';

import { Color } from '../../styles';
import { scaleAndFadeIn } from '../../utils/animationHelpers';
import AppIndicator from '../AppIndicator';
import ContextMenuZone from '../ContextMenuZone';
import { Props } from './AppIcon';

interface DirectionalPositionProps {
  position: DirectionalPosition;
}

interface WrapperProps {
  backgroundColor?: string;
  hasTransition: boolean;
  isDisabled: boolean;
  margin: string;
  size: AppIconSizes;
}

interface StyledContextMenuZoneProps {
  size: AppIconSizes;
}

export const APP_ICON_TRANSITION_CLASSNAMES = 'app-icon-transition';
export const APP_ICON_TRANSITION_DURATION = 450;

export const Icon = styled.div<Pick<Props, 'imgSrc'>>`
  background: url(${props => props.imgSrc || ''}), ${Color.SUN};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
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

export const StyledContextMenuZone = styled(ContextMenuZone)<StyledContextMenuZoneProps>`
  border-radius: 9.9px;
  border: 2.7px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;

  ${({ size }) => `
    height: ${size}px;
    width: ${size}px;
  `}
`;

export const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  position: relative;
  transition: opacity 300ms ease-in-out;

  ${({ backgroundColor, hasTransition, isDisabled, margin, size }) => `
    ${backgroundColor && `background-color: ${backgroundColor};`}
    cursor: ${isDisabled ? 'default' : 'pointer'};
    opacity: ${isDisabled ? 0.1 : 1};
    height: ${size}px;
    width: ${size}px;
    margin: ${margin};
      ${hasTransition && size && margin && scaleAndFadeIn(StyledContextMenuZone, APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION, size, margin)}`}
`;
