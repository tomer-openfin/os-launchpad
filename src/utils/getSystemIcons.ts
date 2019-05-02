import { Action, AnyAction } from 'redux';

import * as adminIcon from '../assets/AdminSettings.svg';
import * as chainIcon from '../assets/Chain.svg';
import * as directoryIcon from '../assets/Directory.svg';
import * as gatherWindowsIcon from '../assets/GatherWindows.svg';
import * as layouts3Icon from '../assets/Layouts3.svg';
import * as logoutIcon from '../assets/Logout.svg';
import * as notificationsIcon from '../assets/Notifications.svg';
import * as settingsIcon from '../assets/Settings.svg';
import * as shutdownIcon from '../assets/Shutdown.svg';
import * as supportIcon from '../assets/Support.svg';

import windowsConfig from '../config/windows';

import { exitApplication } from '../redux/application';
import { logout } from '../redux/me/index';
import { toggleNotificationCenter } from '../redux/notifications';
import { gatherAllWindows } from '../redux/system';
import { launchWindow, toggleWindow } from '../redux/windows';
import Color from '../styles/color';

export const ADMIN_KEY = 'Admin';
export const APP_DIRECTORY_KEY = 'App Directory';
export const CHANNELS_KEY = 'Channels';
export const GATHER_WINDOWS_KEY = 'Gather Windows';
export const LOGOUT_KEY = 'Log Out';
export const NOTIFICATIONS_KEY = 'Notifications';
export const SETTINGS_KEY = 'Settings';
export const SETTINGS_MENU_KEY = 'Settings';
export const SHUTDOWN_KEY = 'Close Openfin';
export const SUPPORT_KEY = 'Support';
export const WORKSPACES_KEY = 'Workspaces';

export interface SystemIcon {
  action: Action;
  color?: string;
  hasExtendedWindow: boolean;
  hoverColor?: string;
  icon: string;
  isBackground: boolean;
  title: string;
}

export const getSystemIcons = (): SystemIcon[] => {
  const icons = [
    {
      action: toggleWindow({ name: windowsConfig.logout.name }),
      color: Color.EARTH,
      hasExtendedWindow: true,
      hoverColor: Color.EARTH_HOVER,
      icon: logoutIcon,
      isBackground: false,
      title: LOGOUT_KEY,
    },
    {
      action: launchWindow(windowsConfig.channels),
      color: Color.URANUS,
      hasExtendedWindow: false,
      hoverColor: Color.URANUS_HOVER,
      icon: chainIcon,
      isBackground: false,
      title: CHANNELS_KEY,
    },
    {
      action: toggleWindow({ name: windowsConfig.settingsMenu.name }),
      color: Color.SATURN,
      hasExtendedWindow: true,
      hoverColor: Color.SATURN_HOVER,
      icon: settingsIcon,
      isBackground: false,
      title: SETTINGS_MENU_KEY,
    },
    {
      action: toggleWindow({ name: windowsConfig.appDirectory.name }),
      hasExtendedWindow: false,
      icon: directoryIcon,
      isBackground: true,
      title: APP_DIRECTORY_KEY,
    },
    {
      action: toggleWindow({ name: windowsConfig.layouts.name }),
      hasExtendedWindow: true,
      icon: layouts3Icon,
      isBackground: true,
      title: WORKSPACES_KEY,
    },
    {
      action: toggleNotificationCenter.request(),
      color: Color.JUPITER,
      hasExtendedWindow: false,
      hoverColor: Color.JUPITER_HOVER,
      icon: notificationsIcon,
      isBackground: false,
      title: NOTIFICATIONS_KEY,
    },
  ];

  return icons;
};

interface MenuOption {
  action: AnyAction;
  icon: string;
  label: string;
}

export const getLogoutMenuOptions = (isEnterprise: boolean): MenuOption[] => {
  const options: MenuOption[] = [
    {
      action: exitApplication(),
      icon: shutdownIcon,
      label: SHUTDOWN_KEY,
    },
  ];

  if (isEnterprise) {
    options.unshift({
      action: logout.request({ message: 'You have been successfully logged out.', isError: false }),
      icon: logoutIcon,
      label: LOGOUT_KEY,
    });
  }

  return options;
};

export const getSettingsMenuOptions = (isAdmin: boolean): MenuOption[] => {
  const options = [
    {
      action: launchWindow(windowsConfig.settings),
      icon: settingsIcon,
      label: SETTINGS_KEY,
    },
    {
      action: launchWindow(windowsConfig.support),
      icon: supportIcon,
      label: SUPPORT_KEY,
    },
    {
      action: gatherAllWindows.request(),
      icon: gatherWindowsIcon,
      label: GATHER_WINDOWS_KEY,
    },
  ];

  if (isAdmin) {
    options.unshift({
      action: launchWindow(windowsConfig.admin),
      icon: adminIcon,
      label: ADMIN_KEY,
    });
  }

  return options;
};
