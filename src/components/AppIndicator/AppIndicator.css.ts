import styled from 'styled-components';

import { Color, hexToRgba } from '../../styles';
import { AppStatusStates, DirectionalPosition } from '../../types/commons';

import SvgIcon from '../SvgIcon';

const StatusColors = {
  [AppStatusStates.Closed]: Color.VOID,
  [AppStatusStates.Error]: Color.MARS,
  [AppStatusStates.Loading]: Color.COMET,
  [AppStatusStates.Running]: Color.EARTH,
  [AppStatusStates.Warning]: Color.JUPITER,
};

const StatusAlert = {
  [AppStatusStates.Error]: true,
  [AppStatusStates.Warning]: true,
};

const TRANSITION_DURATION = '300ms';
const TRANSITION_EASING = 'ease-in-out';

interface IndicatorProps {
  appStatusState: AppStatusStates;
  position: DirectionalPosition;
  size: number;
}

export const Indicator = styled.div<IndicatorProps>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  align-items: center;
  background-color: ${({ appStatusState }) => StatusColors[appStatusState]};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  margin: 0;
  transition: background-color ${TRANSITION_DURATION} ${TRANSITION_EASING}, box-shadow ${TRANSITION_DURATION} ${TRANSITION_EASING},
    margin ${TRANSITION_DURATION} ${TRANSITION_EASING};

  ${({ position, appStatusState, size }) => {
    if (!StatusAlert[appStatusState]) {
      return '';
    }

    return `
      box-shadow: 0 0 ${size}px ${hexToRgba(StatusColors[appStatusState], 0.7)};
      margin-${position}: ${size / 2}px;
    `;
  }}
`;

export const StyledSvgIcon = styled(SvgIcon)`
  transition: background-color ${TRANSITION_DURATION} ${TRANSITION_EASING};
`;
