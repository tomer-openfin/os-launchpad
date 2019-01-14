import * as React from 'react';

import * as arrowIcon from '../../assets/ArrowCircle.svg';
import * as closeIcon from '../../assets/CloseCircle.svg';

import { App, DirectionalPosition } from '../../types/commons';
import { getOppositeDirection } from '../../utils/directionalPositionHelpers';
import { SystemIcon } from '../../utils/getSystemIcons';
import { calcCollapsedSystemSize, calcExpandedSystemSize } from '../../utils/windowPositionHelpers';

import AppList from '../AppList';
import Borders from '../Borders';
import SvgIcon from '../SvgIcon';
import SvgIconWithExtension from '../SvgIconWithExtension';
import { AppListWrapper, Main, Overlay, StyledLogo, SystemDrawerWrapper, SystemIconsWrapper, SystemIconWrapper, ToggleIcon, Wrapper } from './App.css';

export interface LauncherIcon {
  cta: () => void;
  hasExtendedWindow: boolean;
  icon: string;
  key: string;
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
  const extensionPosition = getOppositeDirection(launcherPosition);

  const drawerSize = isDrawerExpanded ? calcExpandedSystemSize(systemIcons) : calcCollapsedSystemSize(systemIcons);

  return (
    <Main launcherPosition={launcherPosition}>
      <Wrapper endPadding={calcCollapsedSystemSize(systemIcons)} launcherPosition={launcherPosition}>
        <Borders height="100%" width="100%" borderRadius="6px">
          <StyledLogo />

          <AppListWrapper endPadding={calcCollapsedSystemSize(systemIcons)} launcherPosition={launcherPosition}>
            <AppList />
          </AppListWrapper>

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

              {icons.map(icon => {
                const isShowing = icon.shownCollapsed || isDrawerExpanded;
                if (!isShowing) {
                  return null;
                }

                return (
                  <SystemIconWrapper key={icon.key} isDrawerExpanded={isDrawerExpanded} launcherPosition={launcherPosition}>
                    {icon.hasExtendedWindow ? (
                      <SvgIconWithExtension extensionPosition={extensionPosition} imgSrc={icon.icon} onClick={icon.cta} />
                    ) : (
                      <SvgIcon imgSrc={icon.icon} onClick={icon.cta} />
                    )}
                  </SystemIconWrapper>
                );
              })}
            </SystemIconsWrapper>
          </SystemDrawerWrapper>
        </Borders>
      </Wrapper>
    </Main>
  );
};

export default App;
