import styled, { keyframes } from 'styled-components';

import { AppStatusStates } from '../../redux/apps/types';

import { Props } from './AppIndicator';

const loading = keyframes`
  0% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  25% {
    opacity: .5;
    transform: translate3d(200%, 0, 0);
  }

  50% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  75% {
    opacity: .5;
    transform: translate3d(-200%, 0, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const Indicator = styled.div<Props>`
  background: white;
  border-radius: 3px;
  display: ${props => (props.statusState === AppStatusStates.Closed ? 'none' : 'inline-block')};
  height: 2px;
  opacity: 1;
  transform: ${props => (props.statusState === AppStatusStates.Running ? 'translate3d(0, 0, 0)' : 'none')};
  transition: all 1s;
  width: 6px;

  animation-name: ${props => (props.statusState === AppStatusStates.Closed ? 'none' : loading)};
  animation-duration: 2s;
  animation-iteration-count: ${props => (props.statusState === AppStatusStates.Running ? '1' : 'infinite')};
  animation-direction: alternate;
  animation-timing-function: ease-out;
`;
