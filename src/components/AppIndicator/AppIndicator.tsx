import * as React from 'react';

import * as Exclamation from '../../assets/Exclamation.svg';

import { Color } from '../../styles';
import { AppStatusStates, DirectionalPosition } from '../../types/enums';

import { Indicator, StyledSvgIcon } from './AppIndicator.css';

export interface Props {
  appStatusState: AppStatusStates;
  position: DirectionalPosition;
  size?: number;
}

const AppIndicator = (props: Props) => (
  <Indicator {...props}>
    <StyledSvgIcon color={props.appStatusState === AppStatusStates.Error ? Color.SUN : Color.VOID} imgSrc={Exclamation} size="53%" />
  </Indicator>
);

export default AppIndicator;
