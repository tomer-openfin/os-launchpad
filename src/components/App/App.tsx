import * as React from 'react';

import * as arrowIcon from '../../assets/ArrowCircle.svg';
import * as arrowDownIcon from '../../assets/ArrowDown.svg';
import * as closeIcon from '../../assets/CloseCircle.svg';

import { App, DirectionalPosition } from '../../types/commons';
import { SystemIcon } from '../../utils/getSystemIcons';
import { calcCollapsedSystemSize, calcExpandedSystemSize } from '../../utils/windowPositionHelpers';

import AppList from '../AppList';
import {
  ArrowIcon,
  Main,
  Overlay,
  StyledLogo,
  StyledSvgIcon,
  SystemDrawerWrapper,
  SystemIconsWrapper,
  SystemIconWrapper,
  ToggleIcon,
  Wrapper,
} from './App.css';

export interface LauncherIcon {
  cta: () => void;
  icon: string;
  key: string;
  hasExtendedWindow: boolean;
  shownCollapsed: boolean;
}

export interface Props {
  launcherPosition: DirectionalPosition;
  icons: LauncherIcon[];
  isDrawerExpanded: boolean;
  systemIcons: SystemIcon[];
  toggleDrawer: () => void;
}

const App = (props: Props) => {
  const { launcherPosition, icons, systemIcons, toggleDrawer, isDrawerExpanded } = props;

  const drawerSize = isDrawerExpanded ? calcExpandedSystemSize(systemIcons) : calcCollapsedSystemSize(systemIcons);

  return (
    <Main launcherPosition={launcherPosition}>
      <Wrapper endPadding={calcCollapsedSystemSize(systemIcons)} launcherPosition={launcherPosition}>
        <StyledLogo />

        <AppList />

        <SystemDrawerWrapper isDrawerExpanded={isDrawerExpanded} size={drawerSize} launcherPosition={launcherPosition}>
          <Overlay isDrawerExpanded={isDrawerExpanded} onClick={toggleDrawer} />

          <SystemIconsWrapper isDrawerExpanded={isDrawerExpanded} size={drawerSize} launcherPosition={launcherPosition}>
            <ToggleIcon
              isDrawerExpanded={isDrawerExpanded}
              launcherPosition={launcherPosition}
              imgSrc={isDrawerExpanded ? closeIcon : arrowIcon}
              size={isDrawerExpanded ? 25 : 20}
              onClick={toggleDrawer}
            />

            {icons.map(
              icon =>
                (icon.shownCollapsed || isDrawerExpanded) && (
                  <SystemIconWrapper key={icon.key} isDrawerExpanded={isDrawerExpanded} launcherPosition={launcherPosition}>
                    <StyledSvgIcon imgSrc={icon.icon} onClick={icon.cta} />

                    {icon.hasExtendedWindow && <ArrowIcon size={25} launcherPosition={launcherPosition} imgSrc={arrowDownIcon} />}
                  </SystemIconWrapper>
                ),
            )}
          </SystemIconsWrapper>
        </SystemDrawerWrapper>
      </Wrapper>
    </Main>
  );
};

export default App;
