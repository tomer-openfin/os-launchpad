import styled from 'styled-components';

import * as ellipsisIcon from '../../assets/Ellipsis.svg';

import { LauncherPosition } from '../../redux/me';
import { Color } from '../../styles/index';
import { isLeftOrRight } from '../../utils/launcherPosition';

interface CommonProps {
  launcherPosition: LauncherPosition;
}

export const Wrapper = styled.div<CommonProps>`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? 'column' : 'row')};
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Separator = styled.div<CommonProps>`
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
