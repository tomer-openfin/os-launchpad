import styled from 'styled-components';

import * as ellipsis from '../../assets/Ellipsis.svg';
import { Color } from '../../styles/index';

interface LauncherPositionProps {
  launcherPosition: string;
}

const isLeftOrRight = (props: LauncherPositionProps) => props.launcherPosition === 'RIGHT' || props.launcherPosition === 'LEFT';

export const Wrapper = styled.div<LauncherPositionProps>`
  display: flex;
  flex-direction: ${props => (isLeftOrRight(props) ? 'column' : 'row')};
  justify-content: space-between;
  height: ${props => (isLeftOrRight(props) ? '225px' : 'auto')};
  width: ${props => (isLeftOrRight(props) ? 'auto' : '225px')};
`;

export const Ellipsis = styled.div<LauncherPositionProps>`
  background: url(${ellipsis});
  background-size: cover;
  background-repeat: no-repeat;
  margin: 8px 4px;
  height: 34px;
  width: 17px;
  cursor: pointer;
  transform: rotate(${props => (isLeftOrRight(props) ? '90' : '0')});

  &:hover {
    background-color: ${Color.GREY};
    border-radius: 2px;
    cursor: pointer;
    fill: ${Color.SEAGULL} !important;
  }
`;
