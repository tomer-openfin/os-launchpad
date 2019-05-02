import * as React from 'react';

import { App, DirectionalPosition } from '../../types/commons';
import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';

import { AppListWrapper, LogoWrapper, Main, SystemDrawerWrapper, Wrapper } from './App.css';

import AppList from '../AppList';
import Borders from '../Borders';
import Logo from '../Logo';
import SendToSystemTray from '../SendToSystemTray';
import SystemDrawer from '../SystemDrawer';

export interface Props {
  launcherPosition: DirectionalPosition;
  launcherSizeConfig: LauncherSizeConfig;
  systemDrawerSize: number;
}

const App = (props: Props) => {
  const { launcherPosition, launcherSizeConfig, systemDrawerSize } = props;

  return (
    <Main launcherPosition={launcherPosition}>
      <Wrapper launcherPosition={launcherPosition} size={launcherSizeConfig.launcher}>
        <Borders height="100%" width="100%" borderRadius="6px">
          <LogoWrapper launcherPosition={launcherPosition} size={launcherSizeConfig.launcher}>
            <Logo size={launcherSizeConfig.launcher} />
          </LogoWrapper>

          <AppListWrapper endSpacing={systemDrawerSize} launcherPosition={launcherPosition}>
            <AppList />
          </AppListWrapper>

          <SystemDrawerWrapper launcherPosition={launcherPosition}>
            <SystemDrawer />
          </SystemDrawerWrapper>

          <SendToSystemTray />
        </Borders>
      </Wrapper>
    </Main>
  );
};

export default App;
