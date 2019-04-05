import { closeFinApp, getAppDirectoryList, openFinApp, resetAppDirectoryList, setFinAppStatusState } from './actions';

import { App, AppStatusStates } from '../../types/commons';
import { AppsActions, AppsById, AppsState } from './types';

const formatByIds = (appList: App[]) =>
  appList.reduce((appsById: AppsById, app: App) => {
    appsById[app.id] = app;
    return appsById;
  }, {});

const defaultState: AppsState = { byId: {}, ids: [], statusById: {} };

export default (state: AppsState = defaultState, action: AppsActions): AppsState => {
  switch (action.type) {
    case resetAppDirectoryList.toString(): {
      return {
        ...state,
        byId: {},
        ids: [],
      };
    }
    case getAppDirectoryList.success.toString(): {
      const appList = action.payload;

      const byId = formatByIds(appList);
      const ids = Object.keys(byId);

      return {
        ...state,
        byId,
        ids,
      };
    }
    case closeFinApp.success.toString(): {
      const { uuid } = action.payload;
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
    case openFinApp.success.toString(): {
      const { id, origin, runtimeVersion, uuid } = action.payload;

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
    case setFinAppStatusState.toString(): {
      const { id, message, statusState, origin } = action.payload;
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
