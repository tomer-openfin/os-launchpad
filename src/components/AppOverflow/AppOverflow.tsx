import * as React from 'react';

import { DirectionalPosition } from '../../types/enums';
import { Window } from './AppOverflow.css';

import AppList from '../AppList';

interface Props {
  launcherPosition: DirectionalPosition;
}

const AppOverflow = ({ launcherPosition }: Props) => {
  return (
    <Window launcherPosition={launcherPosition}>
      <AppList isOverflowExpanded />
    </Window>
  );
};

export default AppOverflow;
