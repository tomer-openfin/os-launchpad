import { CLOSE_FIN_APP, OPEN_FIN_APP, SET_APP_DIRECTORY_LIST, SET_FIN_APP_STATUS_STATE } from './actions';

import { App, AppStatusOrigins, AppStatusStates } from '../../types/commons';
import { AppsById, AppsState, OpenFinAppError, OpenFinAppSuccess, SetFinAppStatusState } from './types';

const formatByIds = (appList: App[]) =>
  appList.reduce((appsById: AppsById, app: App) => {
    appsById[app.id] = app;
    return appsById;
  }, {});

const defaultState: AppsState = { byId: {}, ids: [], statusById: {} };

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
    case CLOSE_FIN_APP.SUCCESS: {
      const { payload } = action as OpenFinAppSuccess;
      if (!payload) {
        return state;
      }

      const { id, origin } = payload;

      return {
        ...state,
        statusById: {
          ...state.statusById,
          [id]: {
            message: undefined,
            origin,
            state: AppStatusStates.Closed,
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

      const { id, uuid, origin } = payload;

      return {
        ...state,
        statusById: {
          ...state.statusById,
          [id]: {
            message: undefined,
            origin,
            state: AppStatusStates.Running,
            uuid,
          },
        },
      };
    }
    case OPEN_FIN_APP.ERROR: {
      const { payload } = action as OpenFinAppError;
      if (!payload) {
        return state;
      }

      const { id } = payload;

      return {
        ...state,
        statusById: {
          ...state.statusById,
          [id]: {
            message: undefined,
            origin: AppStatusOrigins.Default,
            state: AppStatusStates.Closed,
            uuid: undefined,
          },
        },
      };
    }
    case SET_FIN_APP_STATUS_STATE: {
      const { payload } = action as SetFinAppStatusState;
      if (!payload) {
        return state;
      }

      const { id, message, statusState, origin } = payload;
      const appStatusState = state.statusById[id];
      const uuid = !appStatusState || statusState === AppStatusStates.Closed ? undefined : appStatusState.uuid;

      return {
        ...state,
        statusById: {
          ...state.statusById,
          [id]: {
            message,
            origin,
            state: statusState,
            uuid,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};
