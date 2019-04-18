import { createSelector } from 'reselect';

import { AppListToggleId } from '../components/AppListToggle';
import { ContextChannel } from '../components/ContextGroupItem/index';
import { MonitorDetails, MonitorInfo } from '../types/commons';
import { objectsFromIds } from '../utils/byIds';
import { convertHexNumberToString } from '../utils/convertHexNumberToString';
import { isPointInCoordinates } from '../utils/coordinateHelpers';
import { getSystemIcons } from '../utils/getSystemIcons';
import { GLOBAL_CHANNEL_ID } from '../utils/openfinFdc3';
import { calcAppListDimensions, calcMaxAppCount } from '../utils/windowPositionHelpers';
import { getDrawerIsExpanded } from './application/selectors';
import { getAppsById } from './apps/selectors';
import { getChannelsById, getChannelsContextsById, getChannelsIds, getChannelsMembersById, getContextWindowsByGroup } from './channels';
import {
  getAppsLauncherIds,
  getIsAdmin,
  getLauncherMonitorId,
  getLauncherMonitorReferencePoint,
  getLauncherPosition,
  getLauncherSizeConfig,
} from './me/selectors';
import { MeSettingsState } from './me/types';
import { getIsSystemWindowPresent, getMonitorInfo, getSystemWindowDetailsById } from './system/selectors';

const matchByNameOrDeviceId = (
  monitorDetails: MonitorInfo['primaryMonitor'] | MonitorDetails,
  launcherMonitorId: MeSettingsState['launcherMonitorId'],
): boolean => monitorDetails.name === launcherMonitorId || monitorDetails.deviceId === launcherMonitorId;

/**
 * Return monitor details derived by user's settings
 */
export const getMonitorDetailsDerivedByUserSettings = createSelector(
  [getMonitorInfo, getLauncherMonitorId, getLauncherMonitorReferencePoint],
  (monitorInfo, launcherMonitorId, launcherMonitorReferencePoint) => {
    if (!monitorInfo) {
      return null;
    }

    // Check if any monitors match launcherMonitorId
    const { primaryMonitor } = monitorInfo;
    const primaryMonitorMatchesId = matchByNameOrDeviceId(primaryMonitor, launcherMonitorId);
    if (primaryMonitorMatchesId) {
      return primaryMonitor;
    }
    const nonPrimaryMonitorById = monitorInfo.nonPrimaryMonitors.find(monitorDetails => matchByNameOrDeviceId(monitorDetails, launcherMonitorId));
    if (nonPrimaryMonitorById) {
      return nonPrimaryMonitorById;
    }

    // If no monitors match by id then use reference point
    // Check if any monitors contains reference point within its bounds
    // Reference point can land on two monitors, in that case use the first monitor found
    const primaryMonitorMatchesPoint = isPointInCoordinates(launcherMonitorReferencePoint, primaryMonitor.monitorRect);
    if (primaryMonitorMatchesPoint) {
      return primaryMonitor;
    }
    const nonPrimaryMonitorByPoint = monitorInfo.nonPrimaryMonitors.find(monitorDetails =>
      isPointInCoordinates(launcherMonitorReferencePoint, monitorDetails.monitorRect),
    );
    if (nonPrimaryMonitorByPoint) {
      return nonPrimaryMonitorByPoint;
    }

    // If no monitor is found, use the primary monitor as a fallback
    return primaryMonitor;
  },
);

export const getActiveLauncherMonitorId = createSelector(
  [getMonitorDetailsDerivedByUserSettings],
  monitorDetails => (monitorDetails ? monitorDetails.name || monitorDetails.deviceId : null),
);

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
  [getLauncherPosition, getLauncherSizeConfig, getCollapsedSystemDrawerSize, getMonitorDetailsDerivedByUserSettings],
  (launcherPosition, launcherSizeConfig, collapsedSystemDrawerSize, monitorDetails) =>
    monitorDetails ? calcMaxAppCount(launcherPosition, launcherSizeConfig, collapsedSystemDrawerSize, monitorDetails) : 0,
);

export const getAppListNames = createSelector(
  [getAppsById, getAppsLauncherIds],
  (byId, ids) =>
    ids.reduce(
      (acc, id) => {
        const app = byId[id];
        if (!app) {
          return acc;
        }
        return [...acc, app.name];
      },
      [] as string[],
    ),
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
  [getAppListApps, getLauncherPosition, getLauncherSizeConfig, getCollapsedSystemDrawerSize, getMonitorDetailsDerivedByUserSettings],
  (list, launcherPosition, launcherSizeConfig, collapsedSystemDrawerSize, monitorDetails) =>
    monitorDetails
      ? calcAppListDimensions(list.appIds.length, launcherPosition, launcherSizeConfig, collapsedSystemDrawerSize, monitorDetails)
      : { height: 0, width: 0 },
);

export const getContextChannels = createSelector(
  [getChannelsIds, getChannelsById, getChannelsMembersById, getChannelsContextsById, getSystemWindowDetailsById],
  (ids, byId, membersById, contextsById, windowDetailsById) => {
    return ids.reduce(
      (acc, id) => {
        if (id === GLOBAL_CHANNEL_ID) {
          return acc;
        }
        const channel = byId[id];
        const members = membersById[id] || [];
        const count = members.filter(member => getIsSystemWindowPresent(windowDetailsById, member)).length;
        const contexts = contextsById[id] || [];
        const context = contexts[contexts.length - 1];
        const contextName = typeof context === 'object' && context ? (context as { name?: string }).name : '';

        return [...acc, { color: `#${convertHexNumberToString(channel.color)}`, contextName, count, id: channel.id, name: channel.name }];
      },
      [] as ContextChannel[],
    );
  },
);

export const getContextWindowsCount = createSelector(
  [getContextWindowsByGroup, getSystemWindowDetailsById],
  (contextWindowsByGroup, windowDetailsById) =>
    contextWindowsByGroup.reduce((acc, next) => acc + next.contextWindows.filter(identity => getIsSystemWindowPresent(windowDetailsById, identity)).length, 0),
);
