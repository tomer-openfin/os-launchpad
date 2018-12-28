import styled from 'styled-components';

import { Color } from '../../styles';
import { AppIconSizes } from '../../types/enums';
import { scaleAndFadeIn } from '../../utils/animationHelpers';
import { APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION } from '../AppIcon';

import { Icon } from '../SvgIcon';
import { Props } from './AppListToggle';

interface WrapperProps {
  size: AppIconSizes;
}

export const SvgWrapper = styled.div<WrapperProps>`
  align-items: center;
  border-radius: 9.9px;
  border: 2.7px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  overflow: hidden;

  ${({ size }) => `
    height: ${size}px;
    width: ${size}px;
  `}
`;

export const Wrapper = styled.div<Partial<Props>>`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  position: relative;
  transition: opacity ${APP_ICON_TRANSITION_CLASSNAMES}ms ease-in-out;

  ${({ backgroundColor, hasTransition, isDisabled, margin, size }) => `
    ${backgroundColor ? `background-color: ${backgroundColor};` : ''}
    cursor: ${isDisabled ? 'default' : 'pointer'};
    opacity: ${isDisabled ? 0.1 : 1};
    height: ${size}px;
    width: ${size}px;
    margin: ${margin};

    &:hover {
      ${Icon} {
        background-color: ${isDisabled ? `${Color.COMET}` : `${Color.URANUS}`};
      }
    }

    ${hasTransition && size && margin && scaleAndFadeIn(SvgWrapper, APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION, size, margin)}
  `}
`;
