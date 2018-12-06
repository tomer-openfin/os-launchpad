import styled, { keyframes } from 'styled-components';

import { AppStatusStates } from '../../redux/apps/types';

import { isLeftOrRight } from '../../utils/windowPositionHelpers';
import { Props } from './AppIndicator';

const loading = position => keyframes`
  0% {
    opacity: 1;
    transform: ${isLeftOrRight(position) ? 'translate3d(0, 0, 0) rotate(90deg)' : 'translate3d(0, 0, 0)'};
  }

  25% {
    opacity: .5;
    transform: ${isLeftOrRight(position) ? 'translate3d(0, 600%, 0) rotate(90deg)' : 'translate3d(200%, 0, 0)'};
  }

  50% {
    opacity: 1;
    transform: ${isLeftOrRight(position) ? 'translate3d(0, 0, 0) rotate(90deg)' : 'translate3d(0, 0, 0)'};
  }

  75% {
    opacity: .5;
    transform: ${isLeftOrRight(position) ? 'translate3d(0, -600%, 0) rotate(90deg)' : 'translate3d(-200%, 0, 0)'};
  }

  100% {
    opacity: 1;
    transform: ${isLeftOrRight(position) ? 'translate3d(0, 0, 0) rotate(90deg)' : 'translate3d(0, 0, 0)'};
  }
`;

export const Indicator = styled.div<Props>`
  background: white;
  border-radius: 3px;
  display: ${props => (props.statusState === AppStatusStates.Closed ? 'none' : 'inline-block')};
  height: 2px;
  opacity: 1;
  transform: ${props =>
    `${props.statusState === AppStatusStates.Running ? 'translate3d(0, 0, 0)' : 'none'} ${isLeftOrRight(props.position) ? 'rotate(90deg)' : ''}`};
  transition: opacity 1s;
  width: 6px;

  animation-name: ${props => (props.statusState === AppStatusStates.Closed ? 'none' : loading(props.position))};
  animation-duration: 2s;
  animation-iteration-count: ${props => (props.statusState === AppStatusStates.Running ? '1' : 'infinite')};
  animation-timing-function: ease-out;
`;
