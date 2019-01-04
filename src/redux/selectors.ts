import { createSelector } from 'reselect';

import { AppListToggleId } from '../components/AppListToggle/index';
import { objectsFromIds } from '../utils/byIds';
import { getSystemIcons } from '../utils/getSystemIcons';
import { calcAppListDimensions, calcMaxAppCount } from '../utils/windowPositionHelpers';
import { getAppsById } from './apps/selectors';
import { getAppsLauncherIds, getIsAdmin, getLauncherPosition } from './me/selectors';
import { getMonitorInfo } from './system';

export const getAppsLauncherAppList = createSelector(
  getAppsById,
  getAppsLauncherIds,
  objectsFromIds,
);

export const getSystemIconsSelector = createSelector(
  getIsAdmin,
  isAdmin => getSystemIcons(isAdmin),
);

export const getMaxAppCount = createSelector(
  [getLauncherPosition, getSystemIconsSelector, getMonitorInfo],
  (launcherPosition, systemIcons, monitorInfo) => (monitorInfo ? calcMaxAppCount(launcherPosition, systemIcons, monitorInfo) : 0),
);

export const getAppListApps = createSelector(
  [getAppsById, getAppsLauncherIds, getMaxAppCount],
  (byId, ids, maxAppCount) => {
    let toggleIndex: number | null = null;
    const appIds = ids.reduce((acc: string[], id: string) => {
      let nextAcc = [...acc];
      const app = byId[id];
      if (app) {
        const currentLength = acc.length;

        if (currentLength === maxAppCount) {
          // Add toggle icon
          toggleIndex = maxAppCount;
          nextAcc = [...nextAcc.slice(0, currentLength - 1), AppListToggleId, ...nextAcc.slice(currentLength - 1)];
        }

        nextAcc.push(id);
      }
      return nextAcc;
    }, []);

    return {
      appIds,
      toggleIndex,
    };
  },
);

export const getAppListDimensions = createSelector(
  [getAppListApps, getLauncherPosition, getSystemIcons, getMonitorInfo],
  (list, launcherPosition, systemIcons, monitorInfo) =>
    monitorInfo ? calcAppListDimensions(list.appIds.length, launcherPosition, systemIcons, monitorInfo) : { height: 0, width: 0 },
);
