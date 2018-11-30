import * as React from 'react';

import { AppStatusStates } from '../../redux/apps/types';

import { Indicator } from './AppIndicator.css';

export interface Props {
  statusState: AppStatusStates;
}

const AppIndicator = (props: Props) => <Indicator {...props} />;

export default AppIndicator;
