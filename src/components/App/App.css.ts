import styled from 'styled-components';

import * as ellipsisIcon from '../../assets/Ellipsis.svg';

import { isLeftOrRight, LauncherPositionProps } from '../../utils/launcherPosition';

import { Color } from '../../styles/index';

export const Wrapper = styled.div<LauncherPositionProps>`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: ${props => (isLeftOrRight(props) ? 'column' : 'row')};
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Separator = styled.div<LauncherPositionProps>`
  &:before {
    height: ${props => (isLeftOrRight(props) ? '1px' : '36px')};
    width: ${props => (isLeftOrRight(props) ? '36px' : '1px')};
    ${props => (isLeftOrRight(props) ? 'right: 8px' : 'top: 8px')};
    background-color: ${Color.DUSTY_GREY};
    position: absolute;
    content: '';
  }
`;

export const EllipsisImage = styled.div<LauncherPositionProps>`
  background: url(${ellipsisIcon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
  height: 34px;
  width: 17px;
  cursor: pointer;
  transform: rotate(${props => (isLeftOrRight(props) ? '90deg' : '0')});

  &:hover {
    background-color: ${Color.GREY};
    border-radius: 2px;
    cursor: pointer;
    fill: ${Color.SEAGULL} !important;
  }
`;

export const EllipsisWrapper = styled.div<LauncherPositionProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => (isLeftOrRight(props) ? '25px' : '50px')};
  width: ${props => (isLeftOrRight(props) ? '50px' : '25px')};
  padding: ${props => (isLeftOrRight(props) ? '4px 8px' : '8px 4px')};
`;
