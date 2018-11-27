import { GET_APP_DIRECTORY_LIST, SET_APP_DIRECTORY_LIST } from './actions';

import { App } from '../../types/commons';
import { AppsById, AppsState } from './types';

const formatByIds = (appList: App[]) =>
  appList.reduce((appsById: AppsById, app: App) => {
    appsById[app.id] = app;
    return appsById;
  }, {});

const defaultState: AppsState = { byId: {}, ids: [] };

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
    default: {
      return state;
    }
  }
};
