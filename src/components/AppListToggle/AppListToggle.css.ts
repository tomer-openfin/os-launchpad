import styled from 'styled-components';

import { Color } from '../../styles';
import { scaleAndFadeIn } from '../../utils/animationHelpers';
import { APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION } from '../LauncherAppIcon';

import { Icon } from '../SvgIcon';

interface SvgWrapperProps {
  borderWidth: number;
  size: number;
}

interface WrapperProps {
  hasTransition: boolean;
  isDisabled: boolean;
  margin: string;
  size: number;
}

export const SvgWrapper = styled.div<SvgWrapperProps>`
  align-items: center;
  border-color: rgba(255, 255, 255, 0.2);
  border-radius: 9.9px;
  border-style: solid;
  display: flex;
  justify-content: center;
  overflow: hidden;

  ${({ borderWidth, size }) => `
    border-width: ${borderWidth}px;
    height: ${size}px;
    width: ${size}px;
  `}
`;

export const Wrapper = styled.div<Partial<WrapperProps>>`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  position: relative;
  transition: opacity ${APP_ICON_TRANSITION_DURATION}ms ease-in-out;

  ${({ hasTransition, isDisabled, margin, size }) => `
    cursor: ${isDisabled ? 'default' : 'pointer'};
    opacity: ${isDisabled ? 0.1 : 1};
    height: ${size}px;
    width: ${size}px;
    margin: ${margin};

    ${Icon} {
      cursor: ${isDisabled ? 'default' : 'pointer'};
    }

    &:hover {
      ${Icon} {
        background-color: ${isDisabled ? `${Color.COMET}` : `${Color.JUPITER}`};
      }
    }

    ${hasTransition && size && margin && scaleAndFadeIn(SvgWrapper, APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION, size, margin)}
  `}
`;
