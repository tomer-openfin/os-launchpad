import styled from 'styled-components';

import { DirectionalPosition } from '../../types/commons';

import { Color } from '../../styles';
import { scaleAndFadeIn } from '../../utils/animationHelpers';

import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';

import { Wrapper as AppIconWrapper } from '../AppIcon';
import AppIndicator from '../AppIndicator';
import { Props } from './LauncherAppIcon';

interface StyledAppIndicatorProps {
  sizingConfig: LauncherSizeConfig;
  position: DirectionalPosition;
}

interface WrapperProps {
  hasTransition: boolean;
  isDisabled: boolean;
  margin: string;
  size: number;
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

export const StyledAppIndicator = styled(AppIndicator)<StyledAppIndicatorProps>`
  position: absolute;

  ${({ sizingConfig, position }) => {
    const { appIcon, appIconGutter, appIndicator, launcher } = sizingConfig;
    const delta = appIcon + appIconGutter - launcher;
    const percentDelta = appIndicator / 2;

    switch (position) {
      case DirectionalPosition.Right: {
        return `
          right: ${delta}px;
          top: calc(50% - ${percentDelta}px);
        `;
      }
      case DirectionalPosition.Bottom: {
        return `
          bottom: ${delta}px;
          left: calc(50% - ${percentDelta}px);
        `;
      }
      case DirectionalPosition.Left: {
        return `
          left: ${delta}px;
          top: calc(50% - ${percentDelta}px);
        `;
      }
      case DirectionalPosition.Top:
      default: {
        return `
          top: ${delta}px;
          left: calc(50% - ${percentDelta}px);
        `;
      }
    }
  }}
`;

export const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  position: relative;

  ${({ hasTransition, isDisabled, margin, size }) => `
    cursor: ${isDisabled ? 'default' : 'pointer'};
    height: ${size}px;
    width: ${size}px;
    margin: ${margin};
    ${hasTransition && size && margin && scaleAndFadeIn(AppIconWrapper, APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION, size, margin)}

    ${AppIconWrapper} {
      opacity: ${isDisabled ? 0.1 : 1};
    }

    ${StyledAppIndicator} {
      opacity: ${isDisabled ? 0.1 : 1};
      transition: opacity 300ms ease-in-out;
    }
  `}
`;
