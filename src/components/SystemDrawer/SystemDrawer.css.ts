import styled from 'styled-components';

import { Orientation } from '../../types/commons';
import SvgIcon from '../SvgIcon';
import { END_PADDING, START_PADDING } from './utils';

interface SvgIconWrapper {
  delayMultiplier: number;
  isExpanded: boolean;
  isVisible: boolean;
  orientation: Orientation;
}

interface ToggleIconProps {
  orientation: Orientation;
}

interface ToggleIconWrapperProps {
  isExpanded: boolean;
  orientation: Orientation;
}

interface WrapperProps {
  isExpanded: boolean;
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

  ${({ isExpanded, orientation }) => `
    transform: ${isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    ${getIsHorizontal(orientation) ? `left: ${START_PADDING}px;` : `top: ${START_PADDING}px;`}
  `}
`;

export const SvgIconWrapper = styled.div<SvgIconWrapper>`
  align-items: center;
  display: inline-flex;
  flex-grow: 0;
  flex-shrink: 0;
  transition-timing-function: ease-in-out;
  transition: margin 250ms, opacity 300ms, transform 300ms, width 300ms;

  ${({ delayMultiplier, isExpanded, isVisible, orientation }) => {
    const isHorizontal = getIsHorizontal(orientation);
    const marginSize = isExpanded && isVisible ? '5px' : '0';
    const transformX = isHorizontal && !isVisible ? '20px' : '0';
    const transformY = !isHorizontal && !isVisible ? '20px' : '0';

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

  ${({ isExpanded, orientation, size, stopTransition }) => {
    const isHorizontal = getIsHorizontal(orientation);
    const startPadding = `${START_PADDING}px`;
    const endPadding = `${END_PADDING}px`;

    return `
      background-color: ${isExpanded ? 'rgba(14,13,21,0.96)' : 'rgba(0, 0, 0, 0.33)'};
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
