import styled from 'styled-components';

import { AppStatusStates } from '../../redux/apps/types';
import { Color, hexToRgb } from '../../styles';

import SvgIcon from '../SvgIcon';
import { Props } from './AppIndicator';

const StatusColors = {
  [AppStatusStates.Closed]: Color.VOID,
  [AppStatusStates.Error]: Color.MARS,
  [AppStatusStates.Loading]: Color.COMET,
  [AppStatusStates.Running]: Color.NEBULA,
  [AppStatusStates.Warning]: Color.JUPITER,
};

const StatusAlert = {
  [AppStatusStates.Error]: true,
  [AppStatusStates.Warning]: true,
};

const TRANSITION_DURATION = '300ms';
const TRANSITION_EASING = 'ease-in-out';

const defaultSize = 12;

export const Indicator = styled.div<Props>`
  height: ${({ size = defaultSize }) => size}px;
  width: ${({ size = defaultSize }) => size}px;
  align-items: center;
  background-color: ${({ statusState }) => StatusColors[statusState]};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  margin: 0;
  transition: background-color ${TRANSITION_DURATION} ${TRANSITION_EASING}, box-shadow ${TRANSITION_DURATION} ${TRANSITION_EASING},
    margin ${TRANSITION_DURATION} ${TRANSITION_EASING};

  ${({ position, statusState, size = defaultSize }) => {
    if (!StatusAlert[statusState]) {
      return '';
    }

    const { r, g, b } = hexToRgb(StatusColors[statusState]);

    return `
      box-shadow: 0 0 12px rgba(${r}, ${g}, ${b}, 0.7);
      margin-${position}: -${size / 2}px;
    `;
  }}
`;

export const StyledSvgIcon = styled(SvgIcon)`
  transition: background-color ${TRANSITION_DURATION} ${TRANSITION_EASING};
`;
