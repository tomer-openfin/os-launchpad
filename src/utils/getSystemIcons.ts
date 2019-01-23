import { Action } from 'redux';

import * as adminIcon from '../assets/AdminSettings.svg';
import * as directoryIcon from '../assets/Directory.svg';
import * as layoutsIcon from '../assets/Layouts.svg';
import * as logoutIcon from '../assets/Logout.svg';
import * as notificationsIcon from '../assets/Notifications.svg';
import * as settingsIcon from '../assets/Settings.svg';

import windowsConfig from '../config/windows';

import { logoutRequest } from '../redux/me';
import { toggleNotificationCenterRequest } from '../redux/notifications';
import { launchWindow } from '../redux/windows';

export const ADMIN_KEY = 'Admin';
export const LAYOUTS_KEY = 'Layouts';
export const LOGOUT_KEY = 'Logout';
export const NOTIFICATIONS_KEY = 'Notifications';
export const APP_DIRECTORY_KEY = 'App Directory';
export const SETTINGS_KEY = 'Settings';

export interface SystemIcon {
  action: Action;
  hasExtendedWindow: boolean;
  icon: string;
  isShownByDefault: boolean;
  title: string;
}

export const getSystemIcons = (isAdmin: boolean): SystemIcon[] => {
  const icons = [
    {
      action: logoutRequest(),
      hasExtendedWindow: false,
      icon: logoutIcon,
      isShownByDefault: false,
      title: LOGOUT_KEY,
    },
    {
      action: launchWindow(windowsConfig.settings),
      hasExtendedWindow: false,
      icon: settingsIcon,
      isShownByDefault: false,
      title: SETTINGS_KEY,
    },
    {
      action: launchWindow(windowsConfig.appDirectory),
      hasExtendedWindow: false,
      icon: directoryIcon,
      isShownByDefault: true,
      title: APP_DIRECTORY_KEY,
    },
    {
      action: launchWindow(windowsConfig.layouts),
      hasExtendedWindow: true,
      icon: layoutsIcon,
      isShownByDefault: true,
      title: LAYOUTS_KEY,
    },
    {
      action: toggleNotificationCenterRequest(),
      hasExtendedWindow: false,
      icon: notificationsIcon,
      isShownByDefault: true,
      title: NOTIFICATIONS_KEY,
    },
  ];

  if (isAdmin) {
    icons.splice(1, 0, {
      action: launchWindow(windowsConfig.admin),
      hasExtendedWindow: false,
      icon: adminIcon,
      isShownByDefault: false,
      title: ADMIN_KEY,
    });
  }

  return icons;
};
