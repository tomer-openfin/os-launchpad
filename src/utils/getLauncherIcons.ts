import * as adminIcon from '../assets/AdminSettings.svg';
import * as notificationsIcon from '../assets/Notifications.svg';
import * as saveLayoutIcon from '../assets/SaveLayout.svg';
import * as searchIcon from '../assets/Search.svg';
import * as settingsIcon from '../assets/Settings.svg';

import windowsConfig from '../config/windows';
import { toggleNotificationCenterRequest } from '../redux/notifications/index';
import { launchWindow } from '../redux/windows/index';

export const getLauncherIcons = (isAdmin: boolean) => {
  const icons = [
    {
      action: launchWindow(windowsConfig.settings),
      icon: settingsIcon,
      key: 'settings',
    },
    {
      action: launchWindow(windowsConfig.appDirectory),
      icon: searchIcon,
      key: 'search',
    },
    {
      action: launchWindow(windowsConfig.layouts),
      icon: saveLayoutIcon,
      key: 'layouts',
    },
    {
      action: toggleNotificationCenterRequest(),
      icon: notificationsIcon,
      key: 'notifications',
    },
  ];

  if (isAdmin) {
    icons.unshift({
      action: launchWindow(windowsConfig.admin),
      icon: adminIcon,
      key: 'admin',
    });
  }

  return icons;
};
