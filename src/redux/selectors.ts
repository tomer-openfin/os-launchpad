import { createSelector } from 'reselect';

import { AppListToggleId } from '../components/AppListToggle';
import { objectsFromIds } from '../utils/byIds';
import { getSystemIcons } from '../utils/getSystemIcons';
import { calcAppListDimensions, calcMaxAppCount } from '../utils/windowPositionHelpers';
import { getDrawerIsExpanded } from './application/selectors';
import { getAppsById } from './apps/selectors';
import { getAppsLauncherIds, getIsAdmin, getLauncherPosition, getLauncherSizeConfig } from './me/selectors';
import { getMonitorInfo } from './system';

export const getAppsLauncherAppList = createSelector(
  [getAppsById, getAppsLauncherIds],
  objectsFromIds,
);

export const getSystemIconsSelector = createSelector(
  [getIsAdmin],
  isAdmin => getSystemIcons(isAdmin),
);

export const getDefaultSystemIconsSelector = createSelector(
  [getSystemIconsSelector],
  systemIcons => systemIcons.filter(systemIcon => systemIcon.isShownByDefault),
);

export const getCollapsedSystemDrawerSize = createSelector(
  [getDefaultSystemIconsSelector, getLauncherSizeConfig],
  (systemIcons, config) => {
    const { systemDrawerPaddingEnd, systemDrawerPaddingStart, systemDrawerToggleOpen, systemIcon } = config;
    const wrapperSize = systemDrawerPaddingEnd + systemDrawerPaddingStart + systemDrawerToggleOpen;
    const iconsSize = systemIcons.length * systemIcon;

    return wrapperSize + iconsSize;
  },
);

export const getExpandedSystemDrawerSize = createSelector(
  [getSystemIconsSelector, getLauncherSizeConfig],
  (systemIcons, config) => {
    const { systemDrawerPaddingEnd, systemDrawerPaddingStart, systemDrawerToggleOpen, systemIcon, systemIconGutter } = config;
    const wrapperSize = systemDrawerPaddingEnd + systemDrawerPaddingStart + systemDrawerToggleOpen;
    const iconsSize = systemIcons.length * (systemIcon + systemIconGutter);

    return wrapperSize + iconsSize;
  },
);

export const getSystemDrawerSize = createSelector(
  [getDrawerIsExpanded, getCollapsedSystemDrawerSize, getExpandedSystemDrawerSize],
  (isDrawerExpanded, collapsedSize, expandedSize) => (isDrawerExpanded ? expandedSize : collapsedSize),
);

export const getMaxAppCount = createSelector(
  [getLauncherPosition, getLauncherSizeConfig, getCollapsedSystemDrawerSize, getMonitorInfo],
  (launcherPosition, launcherSizeConfig, collapsedSystemDrawerSize, monitorInfo) =>
    monitorInfo ? calcMaxAppCount(launcherPosition, launcherSizeConfig, collapsedSystemDrawerSize, monitorInfo) : 0,
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
  [getAppListApps, getLauncherPosition, getLauncherSizeConfig, getCollapsedSystemDrawerSize, getMonitorInfo],
  (list, launcherPosition, launcherSizeConfig, collapsedSystemDrawerSize, monitorInfo) =>
    monitorInfo
      ? calcAppListDimensions(list.appIds.length, launcherPosition, launcherSizeConfig, collapsedSystemDrawerSize, monitorInfo)
      : { height: 0, width: 0 },
);
