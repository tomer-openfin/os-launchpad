import { Action } from 'redux';

import * as adminIcon from '../assets/AdminSettings.svg';
import * as directoryIcon from '../assets/Directory.svg';
import * as layoutsIcon from '../assets/Layouts.svg';
import * as logoutIcon from '../assets/Logout.svg';
import * as notificationsIcon from '../assets/Notifications.svg';
import * as settingsIcon from '../assets/Settings.svg';

import windowsConfig from '../config/windows';
import { toggleNotificationCenterRequest } from '../redux/notifications';
import { launchWindow, toggleWindow } from '../redux/windows';
import Color from '../styles/color';

export const ADMIN_KEY = 'Admin';
export const WORKSPACES_KEY = 'Workspaces';
export const LOGOUT_KEY = 'Logout';
export const NOTIFICATIONS_KEY = 'Notifications';
export const APP_DIRECTORY_KEY = 'App Directory';
export const SETTINGS_KEY = 'Settings';

export interface SystemIcon {
  action: Action;
  color?: string;
  hasExtendedWindow: boolean;
  hoverColor?: string;
  icon: string;
  isBackground: boolean;
  isShownByDefault: boolean;
  title: string;
}

export const getSystemIcons = (isAdmin: boolean): SystemIcon[] => {
  const icons = [
    {
      action: toggleWindow(windowsConfig.logout.name),
      color: Color.EARTH,
      hasExtendedWindow: true,
      hoverColor: Color.EARTH_HOVER,
      icon: logoutIcon,
      isBackground: false,
      isShownByDefault: false,
      title: LOGOUT_KEY,
    },
    {
      action: launchWindow(windowsConfig.settings),
      color: Color.SATURN,
      hasExtendedWindow: false,
      hoverColor: Color.SATURN_HOVER,
      icon: settingsIcon,
      isBackground: false,
      isShownByDefault: false,
      title: SETTINGS_KEY,
    },
    {
      action: toggleWindow(windowsConfig.appDirectory.name),
      hasExtendedWindow: false,
      icon: directoryIcon,
      isBackground: true,
      isShownByDefault: true,
      title: APP_DIRECTORY_KEY,
    },
    {
      action: toggleWindow(windowsConfig.layouts.name),
      hasExtendedWindow: true,
      icon: layoutsIcon,
      isBackground: true,
      isShownByDefault: true,
      title: WORKSPACES_KEY,
    },
    {
      action: toggleNotificationCenterRequest(),
      color: Color.JUPITER,
      hasExtendedWindow: false,
      hoverColor: Color.JUPITER_HOVER,
      icon: notificationsIcon,
      isBackground: false,
      isShownByDefault: true,
      title: NOTIFICATIONS_KEY,
    },
  ];

  if (isAdmin) {
    icons.splice(1, 0, {
      action: launchWindow(windowsConfig.admin),
      color: Color.NEBULA,
      hasExtendedWindow: false,
      hoverColor: Color.NEBULA_HOVER,
      icon: adminIcon,
      isBackground: false,
      isShownByDefault: false,
      title: ADMIN_KEY,
    });
  }

  return icons;
};
