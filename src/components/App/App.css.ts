import styled from 'styled-components';

import * as ellipsisIcon from '../../assets/Ellipsis.svg';

import { Color } from '../../styles/index';
import { DirectionalPosition } from '../../types/commons';
import { isBottomOrRight, isLeftOrRight } from '../../utils/windowPositionHelpers';

import AppIcon from '../AppIcon';

interface CommonProps {
  launcherPosition: DirectionalPosition;
}

export const Wrapper = styled.div<CommonProps>`
  align-items: ${({ launcherPosition }) => (isBottomOrRight(launcherPosition) ? 'flex-start' : 'flex-end')};
  display: flex;
  flex-direction: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? 'column' : 'row')};
  height: 100vh;
  justify-content: space-between;
  position: relative;
  width: 100vw;
`;

export const Separator = styled.div<CommonProps>`
  position: relative;
  height: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? '0' : '100%')};
  width: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? '100%' : '0')};

  &:before {
    background-color: ${Color.DUSTY_GREY};
    content: '';
    height: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? '1px' : '36px')};
    position: absolute;
    right: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? '8px' : '0')};
    top: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? '0' : '8px')};
    width: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? '36px' : '1px')};
  }
`;

export const EllipsisImage = styled.div<CommonProps>`
  background: url(${ellipsisIcon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
  height: 34px;
  width: 17px;
  cursor: pointer;
  transform: rotate(${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? '90deg' : '0')});

  &:hover {
    background-color: ${Color.GREY};
    border-radius: 2px;
    cursor: pointer;
    fill: ${Color.SEAGULL} !important;
  }
`;

export const EllipsisWrapper = styled.div<CommonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? '25px' : '50px')};
  width: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? '50px' : '25px')};
  padding: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? '4px 8px' : '8px 4px')};
`;

export const StyledAppIcon = styled(AppIcon)<CommonProps>`
  display: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? 'block' : 'inline-block')};
`;
