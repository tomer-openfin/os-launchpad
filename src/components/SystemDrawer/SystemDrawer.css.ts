import styled from 'styled-components';

import Color from '../../styles/color';
import { Orientation } from '../../types/commons';
import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';

import SvgIcon from '../SvgIcon';

interface SvgIconWrapper {
  sizingConfig: LauncherSizeConfig;
  delayMultiplier: number;
  isExpanded: boolean;
  isVisible: boolean;
  orientation: Orientation;
}

interface ToggleIconProps {
  orientation: Orientation;
}

interface ToggleIconWrapperProps {
  sizingConfig: LauncherSizeConfig;
  isExpanded: boolean;
  orientation: Orientation;
}

interface WrapperProps {
  sizingConfig: LauncherSizeConfig;
  orientation: Orientation;
  size: number;
  stopTransition: boolean;
}

const getIsHorizontal = (orientation: Orientation) => orientation === Orientation.Horizontal;

export const ToggleIcon = styled(SvgIcon)<ToggleIconProps>`
  transition: all 250ms ease-in-out;

  ${({ orientation }) => `
    transform: ${getIsHorizontal(orientation) ? 'rotate(0deg)' : 'rotate(90deg)'};
  `}
`;

export const ToggleIconWrapper = styled.div<ToggleIconWrapperProps>`
  display: inline-flex;
  flex-shrink: 0;
  position: absolute;
  transition: transform 250ms ease-in-out;

  ${({ sizingConfig, isExpanded, orientation }) => `
    transform: ${isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    ${getIsHorizontal(orientation) ? `left: ${sizingConfig.systemDrawerPaddingStart}px;` : `top: ${sizingConfig.systemDrawerPaddingStart}px;`}
  `}
`;

export const SvgIconWrapper = styled.div<SvgIconWrapper>`
  align-items: center;
  display: inline-flex;
  flex-grow: 0;
  flex-shrink: 0;
  transition-timing-function: ease-in-out;
  transition: margin 250ms, opacity 300ms, transform 300ms, width 300ms;

  ${({ sizingConfig, delayMultiplier, isExpanded, isVisible, orientation }) => {
    const isHorizontal = getIsHorizontal(orientation);
    const marginSize = isExpanded && isVisible ? `${sizingConfig.systemIconGutter}px` : '0';
    const transformX = isHorizontal && !isVisible ? '50%' : '0';
    const transformY = !isHorizontal && !isVisible ? '50%' : '0';

    return `
      ${isHorizontal ? `margin-left: ${marginSize}` : `margin-top: ${marginSize}`};
      opacity: ${isVisible ? '1' : '0'};
      pointer-events: ${isVisible ? 'auto' : 'none'};
      transform: translate3d(${transformX}, ${transformY}, 0);
      ${isExpanded ? `transition-delay: ${delayMultiplier * 100}ms;` : ''}
    `;
  }}
`;

export const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  display: inline-flex;
  justify-content: flex-end;
  position: relative;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;

  ${({ sizingConfig, orientation, size, stopTransition }) => {
    const isHorizontal = getIsHorizontal(orientation);
    const startPadding = `${sizingConfig.systemDrawerPaddingStart}px`;
    const endPadding = `${sizingConfig.systemDrawerPaddingEnd}px`;

    return `
      background-color: ${Color.KUIPER_BELT};
      flex-direction: ${isHorizontal ? 'row' : 'column'};
      height: ${isHorizontal ? '100%' : `${size}px`};
      padding-bottom: ${isHorizontal ? 'initial' : endPadding};
      padding-left: ${isHorizontal ? startPadding : 'initial'};
      padding-right: ${isHorizontal ? endPadding : 'initial'};
      padding-top: ${isHorizontal ? 'initial' : startPadding};
      transition-property: ${isHorizontal ? 'width' : 'height'};
      width: ${isHorizontal ? `${size}px` : '100%'};
      ${stopTransition &&
        `
            transition: none;

            * {
              transition: none;
            }
          `}
    `;
  }}
`;
