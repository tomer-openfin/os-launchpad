import * as React from 'react';

import { App, DirectionalPosition } from '../../types/commons';
import { SystemIcon } from '../../utils/getSystemIcons';
import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';

import AppList from '../AppList';
import Borders from '../Borders';
import SystemDrawer, { calcSystemDrawerSize } from '../SystemDrawer';
import { AppListWrapper, Main, Overlay, StyledLogo, SystemDrawerWrapper, Wrapper } from './App.css';

export interface Props {
  launcherPosition: DirectionalPosition;
  isDrawerExpanded: boolean;
  launcherSizeConfig: LauncherSizeConfig;
  systemIcons: SystemIcon[];
  toggleDrawer: () => void;
}

const App = (props: Props) => {
  const { launcherPosition, launcherSizeConfig, systemIcons, toggleDrawer, isDrawerExpanded } = props;

  return (
    <Main launcherPosition={launcherPosition}>
      <Wrapper launcherPosition={launcherPosition} size={launcherSizeConfig.launcher}>
        <Borders height="100%" width="100%" borderRadius="6px">
          <StyledLogo size={launcherSizeConfig.launcher} />

          <AppListWrapper endPadding={calcSystemDrawerSize(systemIcons, false, launcherSizeConfig)} launcherPosition={launcherPosition}>
            <AppList />
          </AppListWrapper>

          <Overlay isDrawerExpanded={isDrawerExpanded} onClick={toggleDrawer} />

          <SystemDrawerWrapper launcherPosition={launcherPosition}>
            <SystemDrawer />
          </SystemDrawerWrapper>
        </Borders>
      </Wrapper>
    </Main>
  );
};

export default App;
