import { createSelector } from 'reselect';

import { ADD_TO_APP_LAUNCHER, App, AppsById, AppsState, GET_APP_DIRECTORY_LIST, REMOVE_FROM_APP_LAUNCHER, SET_APP_DIRECTORY_LIST } from './';

const formatByIds = (appList: App[]) =>
  appList.reduce((appsById: AppsById, app: App) => {
    appsById[app.id] = app;
    return appsById;
  }, {});

const appFromId = (appsById, id) => appsById[id];

const appsFromIds = (appsById, ids) =>
  ids.reduce((apps, id) => {
    const app = appsById[id];
    if (app) apps.push(app);
    return apps;
  }, []);

export const getAppsState = state => state.apps;

export const getAppsById = createSelector(getAppsState, appsState => appsState.byId);
export const getAppIds = createSelector(getAppsState, appsState => appsState.ids);
export const getLauncherAppIds = createSelector(getAppsState, appsState => appsState.launcherIds);

export const getAppDirectoryList = createSelector(getAppsById, getAppIds, appsFromIds);
export const getAppLauncherList = createSelector(getAppsById, getLauncherAppIds, appsFromIds);

const defaultState: AppsState = { byId: {}, ids: [], launcherIds: ['12', '6', '7'] };

export default (state: AppsState = defaultState, action): AppsState => {
  switch (action.type) {
    case SET_APP_DIRECTORY_LIST: {
      const appList = action.payload.appList;

      const byId = formatByIds(appList);

      const ids = Object.keys(byId);

      return {
        ...state,
        byId,
        ids,
      };
    }
    case GET_APP_DIRECTORY_LIST: {
      return state;
    }
    case ADD_TO_APP_LAUNCHER: {
      const id = action.payload.id;

      if (!id || !state.byId[id] || state.launcherIds.indexOf(id) !== -1) return state;

      return {
        ...state,
        launcherIds: [...state.launcherIds, id],
      };
    }
    case REMOVE_FROM_APP_LAUNCHER: {
      const id = action.payload.id;

      const index = state.launcherIds.indexOf(id);

      if (!id || !state.byId[id] || index === -1) return state;

      return {
        ...state,
        launcherIds: [...state.launcherIds.slice(0, index), ...state.launcherIds.slice(index + 1)],
      };
    }
    default: {
      return state;
    }
  }
};
