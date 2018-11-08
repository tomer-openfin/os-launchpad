import { createSelector } from 'reselect';
import { AppsState } from './types';

const appsFromIds = (appsById, ids) =>
  ids.reduce((apps, id) => {
    const app = appsById[id];
    if (app) apps.push(app);
    return apps;
  }, []);

export const getAppsState = state => state.apps;

export const getAppsById = createSelector(getAppsState, (appsState: AppsState) => appsState.byId);
export const getAppsIds = createSelector(getAppsState, (appsState: AppsState) => appsState.ids);
export const getAppsLauncherIds = createSelector(getAppsState, (appsState: AppsState) => appsState.launcherIds);

export const getAppFromId = createSelector([getAppsById, (state, appId) => appId], (appsById, appId) => appsById[`${appId}`]);
export const getIsLauncherAppFromId = createSelector(
  [getAppsLauncherIds, (state, appId) => appId],
  (launcherIds, appId) => launcherIds.indexOf(`${appId}`) !== -1,
);

export const getAppsDirectoryAppList = createSelector(getAppsById, getAppsIds, appsFromIds);
export const getAppsLauncherAppList = createSelector(getAppsById, getAppsLauncherIds, appsFromIds);
