import { FIN_APP_CLOSED, FIN_APP_LOADING, OPEN_FIN_APP, SET_APP_DIRECTORY_LIST } from './actions';

import { App } from '../../types/commons';
import { AppsById, AppsState, AppStatusStates, FinAppClosed, FinAppLoading, OpenFinAppError, OpenFinAppSuccess } from './types';

const formatByIds = (appList: App[]) =>
  appList.reduce((appsById: AppsById, app: App) => {
    appsById[app.id] = app;
    return appsById;
  }, {});

const defaultState: AppsState = { byId: {}, ids: [], statusByName: {} };

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
    case FIN_APP_LOADING: {
      const { payload } = action as FinAppLoading;
      if (!payload) {
        return state;
      }

      const { name } = payload;

      return {
        ...state,
        statusByName: {
          ...state.statusByName,
          [name]: {
            state: AppStatusStates.Loading,
            uuid: undefined,
          },
        },
      };
    }
    case OPEN_FIN_APP.SUCCESS: {
      const { payload } = action as OpenFinAppSuccess;
      if (!payload) {
        return state;
      }

      const { name, uuid } = payload;

      return {
        ...state,
        statusByName: {
          ...state.statusByName,
          [name]: {
            state: AppStatusStates.Running,
            uuid,
          },
        },
      };
    }
    case FIN_APP_CLOSED:
    case OPEN_FIN_APP.ERROR: {
      const { payload } = action as FinAppClosed | OpenFinAppError;
      if (!payload) {
        return state;
      }

      const { name } = payload;

      return {
        ...state,
        statusByName: {
          ...state.statusByName,
          [name]: {
            state: AppStatusStates.Closed,
            uuid: undefined,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};
