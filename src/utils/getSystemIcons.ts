import { Action } from 'redux';

import * as adminIcon from '../assets/AdminSettings.svg';
import * as directoryIcon from '../assets/Directory.svg';
import * as logoutIcon from '../assets/Logout.svg';
import * as notificationsIcon from '../assets/Notifications.svg';
import * as saveLayoutIcon from '../assets/SaveLayout.svg';
import * as settingsIcon from '../assets/Settings.svg';

import windowsConfig from '../config/windows';

import { logoutRequest } from '../redux/me';
import { toggleNotificationCenterRequest } from '../redux/notifications';
import { launchWindow } from '../redux/windows';

export interface SystemIcon {
  action: Action;
  hasExtendedWindow: boolean;
  icon: string;
  isShownByDefault: boolean;
  key: string;
}

export const getSystemIcons = (isAdmin: boolean): SystemIcon[] => {
  const icons = [
    {
      action: logoutRequest(),
      hasExtendedWindow: false,
      icon: logoutIcon,
      isShownByDefault: false,
      key: 'logout',
    },
    {
      action: launchWindow(windowsConfig.settings),
      hasExtendedWindow: false,
      icon: settingsIcon,
      isShownByDefault: false,
      key: 'settings',
    },
    {
      action: launchWindow(windowsConfig.appDirectory),
      hasExtendedWindow: false,
      icon: directoryIcon,
      isShownByDefault: true,
      key: 'search',
    },
    {
      action: launchWindow(windowsConfig.layouts),
      hasExtendedWindow: true,
      icon: saveLayoutIcon,
      isShownByDefault: true,
      key: 'layouts',
    },
    {
      action: toggleNotificationCenterRequest(),
      hasExtendedWindow: false,
      icon: notificationsIcon,
      isShownByDefault: true,
      key: 'notifications',
    },
  ];

  if (isAdmin) {
    icons.splice(1, 0, {
      action: launchWindow(windowsConfig.admin),
      hasExtendedWindow: false,
      icon: adminIcon,
      isShownByDefault: false,
      key: 'admin',
    });
  }

  return icons;
};
