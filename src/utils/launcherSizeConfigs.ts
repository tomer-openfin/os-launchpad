import { LauncherSize } from '../types/commons';

export interface LauncherSizeConfig {
  appIcon: number;
  appIconBorder: number;
  appIconGutter: number;
  appIndicator: number;
  launcher: number;
  systemDrawerPaddingEnd: number;
  systemDrawerPaddingStart: number;
  systemDrawerToggleClose: number;
  systemDrawerToggleOpen: number;
  systemIcon: number;
  systemIconCaret: number;
  systemIconGutter: number;
}

interface LauncherSizeConfigs {
  [LauncherSize.Small]: LauncherSizeConfig;
  [LauncherSize.Large]: LauncherSizeConfig;
}

export const launcherSizeConfigs: LauncherSizeConfigs = {
  [LauncherSize.Small]: {
    appIcon: 34,
    appIconBorder: 2,
    appIconGutter: 7,
    appIndicator: 8.4,
    launcher: 56,
    systemDrawerPaddingEnd: 3.5,
    systemDrawerPaddingStart: 7.5,
    systemDrawerToggleClose: 18,
    systemDrawerToggleOpen: 14,
    systemIcon: 30,
    systemIconCaret: 17.5,
    systemIconGutter: 4,
  },
  [LauncherSize.Large]: {
    appIcon: 50,
    appIconBorder: 2.7,
    appIconGutter: 10,
    appIndicator: 12,
    launcher: 80,
    systemDrawerPaddingEnd: 5,
    systemDrawerPaddingStart: 11,
    systemDrawerToggleClose: 25,
    systemDrawerToggleOpen: 20,
    systemIcon: 42,
    systemIconCaret: 25,
    systemIconGutter: 5,
  },
};
