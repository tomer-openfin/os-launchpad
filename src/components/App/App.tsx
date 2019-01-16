import * as React from 'react';

import { App, DirectionalPosition } from '../../types/commons';
import { SystemIcon } from '../../utils/getSystemIcons';

import AppList from '../AppList';
import Borders from '../Borders';
import SystemDrawer, { calcSystemDrawerSize } from '../SystemDrawer';
import { AppListWrapper, Main, Overlay, StyledLogo, SystemDrawerWrapper, Wrapper } from './App.css';

export interface Props {
  launcherPosition: DirectionalPosition;
  isDrawerExpanded: boolean;
  systemIcons: SystemIcon[];
  toggleDrawer: () => void;
}

const App = (props: Props) => {
  const { launcherPosition, systemIcons, toggleDrawer, isDrawerExpanded } = props;

  return (
    <Main launcherPosition={launcherPosition}>
      <Wrapper launcherPosition={launcherPosition}>
        <Borders height="100%" width="100%" borderRadius="6px">
          <StyledLogo />

          <AppListWrapper endPadding={calcSystemDrawerSize(systemIcons, false)} launcherPosition={launcherPosition}>
            <AppList />
          </AppListWrapper>

          <SystemDrawerWrapper launcherPosition={launcherPosition}>
            <Overlay isDrawerExpanded={isDrawerExpanded} onClick={toggleDrawer} />

            <SystemDrawer />
          </SystemDrawerWrapper>
        </Borders>
      </Wrapper>
    </Main>
  );
};

export default App;
