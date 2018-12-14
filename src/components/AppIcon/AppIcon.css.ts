import styled, { css } from 'styled-components';

import { AppIconSizes, DirectionalPosition } from '../../types/commons';

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
  margin: number;
  size: AppIconSizes;
}

interface StyledContextMenuZoneProps {
  size: AppIconSizes;
}

export const APP_ICON_TRANSITION_CLASSNAMES = 'app-icon-transition';
export const APP_ICON_TRANSITION_DURATION = 450;

export const Icon = styled.div<Pick<Props, 'imgSrc'>>`
  background: url(${props => props.imgSrc || ''});
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
  justify-content: center;
  position: relative;
  transition: opacity 300ms ease-in-out;

  ${({ backgroundColor, hasTransition, isDisabled, margin, size }) => css`
    ${backgroundColor && `background-color: ${backgroundColor};`}
    cursor: ${isDisabled ? 'default' : 'pointer'};
    opacity: ${isDisabled ? 0.1 : 1};
    height: ${size}px;
    width: ${size}px;
    margin: ${margin}px
      ${hasTransition &&
        `
        &.${APP_ICON_TRANSITION_CLASSNAMES}-enter {
          height: 0;
          width: 0;
          margin: 0;

          ${StyledContextMenuZone} {
            opacity: 0;
            transform: scale(0.7);
          }
        }
        &.${APP_ICON_TRANSITION_CLASSNAMES}-enter-active {
          height: ${size}px;
          width: ${size}px;
          margin: ${margin}px;
          transition: all 300ms ease-in-out;
          transition-origin: center center;

          ${StyledContextMenuZone} {
            opacity: 1;
            transform: scale(1);
            transition: all 150ms ease-in-out;
            transition-delay: 150ms;
            transition-origin: center center;
          }
        }
        &.${APP_ICON_TRANSITION_CLASSNAMES}-enter-done {
          height: ${size}px;
          width: ${size}px;
          margin: ${margin}px;

          ${StyledContextMenuZone} {
            opacity: 1;
            transform: scale(1);
          }
        }
        &.${APP_ICON_TRANSITION_CLASSNAMES}-exit {
          height: ${size}px;
          width: ${size}px;
          margin: ${margin}px;

          ${StyledContextMenuZone} {
            opacity: 1;
            transform: scale(1);
          }

          ${StyledAppIndicator} {
            display: none;
          }
        }
        &.${APP_ICON_TRANSITION_CLASSNAMES}-exit-active {
          height: 0;
          width: 0;
          margin: 0;
          transition: all 300ms ease-in-out;
          transition-delay: 150ms;
          transition-origin: center center;

          ${StyledContextMenuZone} {
            opacity: 0;
            transform: scale(0.7);
            transition: all 150ms ease-in-out;
            transition-origin: center center;
          }

          ${StyledAppIndicator} {
            display: none;
          }
        }
        &.${APP_ICON_TRANSITION_CLASSNAMES}-exit-done {
          height: 0;
          width: 0;
          margin: 0;

          ${StyledContextMenuZone} {
            opacity: 0;
            transform: scale(0.7);
          }

          ${StyledAppIndicator} {
            display: none;
          }
        }
      `};
  `}
`;
