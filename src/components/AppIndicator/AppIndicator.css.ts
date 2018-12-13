import styled from 'styled-components';

import { AppStatusStates } from '../../redux/apps/types';

import { Props } from './AppIndicator';

export const Indicator = styled.div<Props>`
  border-radius: 100%;
  display: ${props => (props.statusState === AppStatusStates.Closed ? 'none' : 'inline-block')};
  background-color: ${({ statusState }) => (statusState === AppStatusStates.Loading ? '#e7e7e7' : '#ad9ee2')};
  height: 12px;
  transition: background-color 350ms;
  width: 12px;
`;
