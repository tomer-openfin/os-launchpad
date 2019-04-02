import styled from 'styled-components';

import { Color, textEllipsis, Typography } from '../../styles';

import { Wrapper as LoadingWrapper } from '../Loading';
import SvgIcon, { Icon } from '../SvgIcon';

const ANIMATION_TIMING_FUNCTION = 'ease-in-out';
const ICON_TRANSITION_DURATION = 150;
const LARGE_ICON_DIM = 20;
const SMALL_ICON_DIM = 14;

export const CancelIcon = styled(SvgIcon)<{ isVisible: boolean }>`
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: ${LARGE_ICON_DIM}px;
  transform: translate(0px);
  transition: opacity ${ICON_TRANSITION_DURATION}ms ${ANIMATION_TIMING_FUNCTION}, transform ${ICON_TRANSITION_DURATION}ms ${ANIMATION_TIMING_FUNCTION};
  transition-delay: 0ms;

  ${({ isVisible }) =>
    isVisible &&
    `opacity: 1;
       pointer-events: initial;
       transform: translate(${SMALL_ICON_DIM}px); transition-delay: ${ICON_TRANSITION_DURATION}ms;`}
`;

export const ConfirmIcon = styled(SvgIcon)<{ isVisible: boolean }>`
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: ${LARGE_ICON_DIM}px;
  transform: translate(0px);
  transition: opacity ${ICON_TRANSITION_DURATION}ms ${ANIMATION_TIMING_FUNCTION}, transform ${ICON_TRANSITION_DURATION}ms ${ANIMATION_TIMING_FUNCTION};
  transition-delay: 0ms;

  ${({ isVisible }) =>
    isVisible &&
    `opacity: 1;
      pointer-events: initial;
       transform: translate(-${SMALL_ICON_DIM}px); transition-delay: ${ICON_TRANSITION_DURATION}ms;`}
`;

export const TrashIcon = styled(SvgIcon)<{ isVisible: boolean }>`
  position: absolute;
  right: 0;
  transform: translate(0);
  transition: transform ${ICON_TRANSITION_DURATION}ms ${ANIMATION_TIMING_FUNCTION};
  transition-delay: ${ICON_TRANSITION_DURATION}ms;

  ${({ isVisible }) => isVisible && `transform: translate(-${(LARGE_ICON_DIM + SMALL_ICON_DIM) / 2}px); transition-delay: 0ms; pointer-events: none;`}
`;

export const AnimationWrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

export const Item = styled.li<{ isDisabled: boolean }>`
  ${Typography.TypeStyleArcturus}
  ${textEllipsis}

  color: ${Color.SUN};
  flex: 1;
  list-style-type: none;
  opacity: 1;
  transition: opacity ${ICON_TRANSITION_DURATION}ms ${ANIMATION_TIMING_FUNCTION};

  &:hover {
    cursor: pointer;
    color: ${Color.JUPITER};
  }

  ${({ isDisabled }) => isDisabled && 'opacity: 0.1;'}
`;

export const Row = styled.div<{ isActive: boolean; isDisabled: boolean }>`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  flex: 1;
  justify-content: space-between;
  min-height: 22px;
  position: relative;

  &:not(:hover) {
    ${Icon} {
      ${({ isActive }) => !isActive && 'display:none;'}
    }
  }

  ${Item} {
    ${({ isActive, isDisabled }) => (isActive || isDisabled) && 'pointer-events: none;'}
  }

  ${Icon} {
    ${({ isDisabled }) => isDisabled && 'display: none;'}
  }

  ${LoadingWrapper} {
    position: absolute;
    text-align: center;
    width: 100%;
  }
`;

export const Text = styled.p`
  ${Typography.TypeStyleNaos}

  color: ${Color.MERCURY};
  margin: auto 0;
  text-transform: uppercase;
`;
