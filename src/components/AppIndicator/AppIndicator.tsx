import * as React from 'react';

import { AppStatusStates } from '../../redux/apps/types';

import { DirectionalPosition } from '../../types/enums';
import { Indicator } from './AppIndicator.css';

export interface Props {
  statusState: AppStatusStates;
  position: DirectionalPosition;
}

const AppIndicator = (props: Props) => <Indicator {...props} />;

export default AppIndicator;
