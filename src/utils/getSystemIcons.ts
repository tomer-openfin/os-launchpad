import { Action } from 'redux';

import * as adminIcon from '../assets/AdminSettings.svg';
import * as notificationsIcon from '../assets/Notifications.svg';
import * as saveLayoutIcon from '../assets/SaveLayout.svg';
import * as searchIcon from '../assets/Search.svg';
import * as settingsIcon from '../assets/Settings.svg';
import * as shutdownIcon from '../assets/Shutdown.svg';

import windowsConfig from '../config/windows';
import { toggleNotificationCenterRequest } from '../redux/notifications/index';
import { launchWindow } from '../redux/windows/index';

export interface SystemIcon {
  action: Action;
  default: boolean;
  hasExtendedWindow: boolean;
  icon: string;
  key: string;
}

export const getSystemIcons = (isAdmin: boolean): SystemIcon[] => {
  const icons = [
    {
      action: { type: 'todo' }, // todo: implement logout
      default: false,
      hasExtendedWindow: true,
      icon: shutdownIcon,
      key: 'shutdown',
    },
    {
      action: launchWindow(windowsConfig.settings),
      default: false,
      hasExtendedWindow: false,
      icon: settingsIcon,
      key: 'settings',
    },
    {
      action: launchWindow(windowsConfig.layouts),
      default: true,
      hasExtendedWindow: true,
      icon: saveLayoutIcon,
      key: 'layouts',
    },
    {
      action: launchWindow(windowsConfig.appDirectory),
      default: true,
      hasExtendedWindow: false,
      icon: searchIcon,
      key: 'search',
    },
    {
      action: toggleNotificationCenterRequest(),
      default: true,
      hasExtendedWindow: false,
      icon: notificationsIcon,
      key: 'notifications',
    },
  ];

  if (isAdmin) {
    icons.unshift({
      action: launchWindow(windowsConfig.admin),
      default: false,
      hasExtendedWindow: false,
      icon: adminIcon,
      key: 'admin',
    });
  }

  return icons;
};
