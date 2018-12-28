import * as React from 'react';

import * as Exclamation from '../../assets/Exclamation.svg';

import { AppStatusStates } from '../../redux/apps/types';
import { Color } from '../../styles';
import { DirectionalPosition } from '../../types/enums';

import { Indicator, StyledSvgIcon } from './AppIndicator.css';

export interface Props {
  position: DirectionalPosition;
  size?: number;
  statusState: AppStatusStates;
}

const AppIndicator = (props: Props) => (
  <Indicator {...props}>
    <StyledSvgIcon color={props.statusState === AppStatusStates.Error ? Color.SUN : Color.VOID} imgSrc={Exclamation} size="53%" />
  </Indicator>
);

export default AppIndicator;
