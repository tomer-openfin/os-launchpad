import { ADD_TO_APP_LAUNCHER, GET_APP_DIRECTORY_LIST, REMOVE_FROM_APP_LAUNCHER, SET_APP_DIRECTORY_LIST, SET_APP_LAUNCHER_IDS } from './actions';
import { App, AppsById, AppsState } from './types';

const formatByIds = (appList: App[]) =>
  appList.reduce((appsById: AppsById, app: App) => {
    appsById[app.id] = app;
    return appsById;
  }, {});

const defaultState: AppsState = { byId: {}, ids: [], launcherIds: ['12', '6', '7'] };

export default (state: AppsState = defaultState, action): AppsState => {
  switch (action.type) {
    case SET_APP_DIRECTORY_LIST: {
      const appList = action.payload;

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
    case SET_APP_LAUNCHER_IDS: {
      const ids = action.payload;

      if (!ids) return state;

      return {
        ...state,
        launcherIds: ids,
      };
    }
    case ADD_TO_APP_LAUNCHER: {
      const id = action.payload;

      if (!id || !state.byId[id] || state.launcherIds.indexOf(id) !== -1) return state;

      return {
        ...state,
        launcherIds: [...state.launcherIds, id],
      };
    }
    case REMOVE_FROM_APP_LAUNCHER: {
      const id = action.payload;

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
