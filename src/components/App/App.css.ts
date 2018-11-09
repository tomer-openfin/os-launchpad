import styled from 'styled-components';

import * as ellipsis from '../../assets/Ellipsis.svg';

import { isLeftOrRight, LauncherPositionProps } from '../../utils/launcherPosition';

import { Color } from '../../styles';

export const Wrapper = styled.div<LauncherPositionProps>`
  display: flex;
  height: 100%;
  flex-direction: ${props => (isLeftOrRight(props) ? 'column' : 'row')};
  justify-content: space-between;
  position: relative;
`;

export const Separator = styled.div<LauncherPositionProps>`
  &:before {
    height: ${props => (isLeftOrRight(props) ? '1px' : '36px')};
    width: ${props => (isLeftOrRight(props) ? '36px' : '1px')};
    margin: ${props => (isLeftOrRight(props) ? '0 7px' : '7px 0')};
    background-color: ${Color.DUSTY_GREY};
    position: absolute;
    content: '';
  }
`;

export const Ellipsis = styled.div<LauncherPositionProps>`
  align-self: ${props => isLeftOrRight(props) && 'center'};
  background: url(${ellipsis});
  background-size: cover;
  background-repeat: no-repeat;
  margin: 8px 4px;
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
