import { createSelector } from 'reselect';

const appsFromIds = (appsById, ids) =>
  ids.reduce((apps, id) => {
    const app = appsById[id];
    if (app) apps.push(app);
    return apps;
  }, []);

export const getAppsState = state => state.apps;

export const getAppsById = createSelector(getAppsState, appsState => appsState.byId);
export const getAppsIds = createSelector(getAppsState, appsState => appsState.ids);
export const getAppsLauncherIds = createSelector(getAppsState, appsState => appsState.launcherIds);

export const getAppsDirectoryAppList = createSelector(getAppsById, getAppsIds, appsFromIds);
export const getAppsLauncherAppList = createSelector(getAppsById, getAppsLauncherIds, appsFromIds);
