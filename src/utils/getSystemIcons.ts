import { Action } from 'redux';

import * as adminIcon from '../assets/AdminSettings.svg';
import * as logoutIcon from '../assets/Logout.svg';
import * as notificationsIcon from '../assets/Notifications.svg';
import * as saveLayoutIcon from '../assets/SaveLayout.svg';
import * as searchIcon from '../assets/Search.svg';
import * as settingsIcon from '../assets/Settings.svg';
import * as shutdownIcon from '../assets/Shutdown.svg';

import windowsConfig from '../config/windows';

import { logoutRequest } from '../redux/me';
import { toggleNotificationCenterRequest } from '../redux/notifications';
import { launchWindow } from '../redux/windows';

export interface SystemIcon {
  action: Action;
  hasExtendedWindow: boolean;
  icon: string;
  key: string;
  shownCollapsed: boolean;
}

export const getSystemIcons = (isAdmin: boolean): SystemIcon[] => {
  const icons = [
    // {
    //   action: { type: 'todo' }, // todo: implement logout
    //   default: false,
    //   hasExtendedWindow: true,
    //   icon: shutdownIcon,
    //   key: 'shutdown',
    // },
    {
      action: logoutRequest(),
      hasExtendedWindow: false,
      icon: logoutIcon,
      key: 'logout',
      shownCollapsed: false,
    },
    {
      action: launchWindow(windowsConfig.settings),
      hasExtendedWindow: false,
      icon: settingsIcon,
      key: 'settings',
      shownCollapsed: false,
    },
    {
      action: launchWindow(windowsConfig.appDirectory),
      hasExtendedWindow: false,
      icon: searchIcon,
      key: 'search',
      shownCollapsed: true,
    },
    {
      action: launchWindow(windowsConfig.layouts),
      hasExtendedWindow: true,
      icon: saveLayoutIcon,
      key: 'layouts',
      shownCollapsed: true,
    },
    {
      action: toggleNotificationCenterRequest(),
      hasExtendedWindow: false,
      icon: notificationsIcon,
      key: 'notifications',
      shownCollapsed: true,
    },
  ];

  if (isAdmin) {
    icons.splice(1, 0, {
      action: launchWindow(windowsConfig.admin),
      hasExtendedWindow: false,
      icon: adminIcon,
      key: 'admin',
      shownCollapsed: false,
    });
  }

  return icons;
};
