import styled, { css } from 'styled-components';

import * as XIcon from '../../assets/TinyX.svg';

import { Color } from '../../styles/index';
import { DirectionalPosition } from '../../types/commons';
import { isLeftOrRight } from '../../utils/windowPositionHelpers';

import AppIndicator from '../AppIndicator';

interface WrapperProps {
  launcherPosition: DirectionalPosition;
}

interface StyledAppIndicatorProps {
  position: DirectionalPosition;
}

export const Wrapper = styled.div<WrapperProps>`
  display: block;
  flex-direction: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? 'column' : 'row')};
  justify-content: space-between;
  height: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? '200px' : 'auto')};
  width: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? 'auto' : '200px')};
`;

export const CloseButton = styled.div`
  display: none;
  position: absolute;
  background: url(${XIcon});
  background-repeat: no-repeat;
  height: 10px;
  width: 10px;
  top: 3px;
  left: 3px;
  background-position: center;
  background-size: contain;
  background-color: ${Color.DUSTY_GREY};
  border: 2px solid ${Color.DUSTY_GREY};
  border-radius: 5px;
  z-index: 3;

  &:hover {
    height: 12px;
    width: 12px;
    top: 2px;
    left: 2px;
  }
`;

export const Space = styled.div<{ withClose?: boolean }>`
  cursor: pointer;
  display: inline-block;
  min-width: 50px;
  position: relative;

  ${props =>
    props.withClose &&
    css`
      &:hover {
        ${CloseButton} {
          display: block;
        }
      }
    `}
`;

export const StyledAppIndicator = styled(AppIndicator)<StyledAppIndicatorProps>`
  bottom: 3px;
  left: calc(50% - 3px);
  position: absolute;
`;
