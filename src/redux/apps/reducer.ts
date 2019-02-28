import { CLOSE_FIN_APP, GET_APP_DIRECTORY_LIST, OPEN_FIN_APP, SET_FIN_APP_STATUS_STATE } from './actions';

import { App, AppStatusStates } from '../../types/commons';
import { AppsById, AppsState, CloseFinAppSuccess, OpenFinAppSuccess, SetFinAppStatusState } from './types';

const formatByIds = (appList: App[]) =>
  appList.reduce((appsById: AppsById, app: App) => {
    appsById[app.id] = app;
    return appsById;
  }, {});

const defaultState: AppsState = { byId: {}, ids: [], statusById: {} };

export default (state: AppsState = defaultState, action): AppsState => {
  switch (action.type) {
    case GET_APP_DIRECTORY_LIST.SUCCESS: {
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
      const { payload } = action as CloseFinAppSuccess;
      if (!payload) {
        return state;
      }

      const { uuid } = payload;
      const id = Object.keys(state.statusById).find(key => {
        const statusState = state.statusById[key];
        return !!statusState && statusState.uuid === uuid;
      });

      if (!id) {
        return state;
      }

      return {
        ...state,
        statusById: {
          ...state.statusById,
          [id]: {
            message: undefined,
            origin: undefined,
            runtimeVersion: undefined,
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

      const { id, origin, runtimeVersion, uuid } = payload;

      return {
        ...state,
        statusById: {
          ...state.statusById,
          [id]: {
            message: undefined,
            origin,
            runtimeVersion,
            state: AppStatusStates.Running,
            uuid,
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
      const runtimeVersion = !appStatusState || statusState === AppStatusStates.Closed ? undefined : appStatusState.runtimeVersion;

      return {
        ...state,
        statusById: {
          ...state.statusById,
          [id]: {
            message,
            origin,
            runtimeVersion,
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
