import { ADD_TO_APP_LAUNCHER, GET_SETTINGS, LOGIN, REMOVE_FROM_APP_LAUNCHER, SET_AUTO_HIDE, SET_LAUNCHER_POSITION, SET_ME } from './actions';

import { LauncherPosition } from '../../types/commons';
import { GetSettingsSuccess, MeActions, MeState, SetLaunchbarPayload, SetMePayload } from './types';

export const defaultState: MeState = {
  email: '',
  firstName: '',
  isAdmin: false,
  lastName: '',
  settings: {
    appIds: [],
    autoHide: false,
    launcherPosition: LauncherPosition.Top,
  },
};

export default (state: MeState = defaultState, action: MeActions) => {
  switch (action.type) {
    case GET_SETTINGS.SUCCESS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...(action as GetSettingsSuccess).payload!,
        },
      };
    }
    case SET_ME: {
      return {
        ...state,
        email: (action.payload! as SetMePayload).email,
        firstName: (action.payload! as SetMePayload).firstName,
        isAdmin: (action.payload! as SetMePayload).isAdmin,
        lastName: (action.payload! as SetMePayload).firstName,
      };
    }
    case LOGIN.REQUEST: {
      return {
        ...state,
        loginError: false,
      };
    }
    case LOGIN.SUCCESS: {
      return {
        ...state,
        loginError: false,
      };
    }
    case LOGIN.ERROR: {
      return {
        ...state,
        loginError: true,
      };
    }
    case SET_AUTO_HIDE: {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...(action as GetSettingsSuccess).payload!,
        },
      };
    }
    case SET_LAUNCHER_POSITION: {
      return {
        ...state,
        settings: {
          ...state.settings,
          launcherPosition: (action.payload! as SetLaunchbarPayload).launcherPosition,
        },
      };
    }
    case ADD_TO_APP_LAUNCHER: {
      const id = action.payload;

      if (!id || state.settings.appIds.indexOf(id) !== -1) return state;

      return {
        ...state,
        settings: {
          ...state.settings,
          appIds: [...state.settings.appIds, id],
        },
      };
    }
    case REMOVE_FROM_APP_LAUNCHER: {
      const id = action.payload;

      const index = state.settings.appIds.indexOf(id);

      if (!id || index === -1) return state;

      return {
        ...state,
        settings: {
          ...state.settings,
          appIds: [...state.settings.appIds.slice(0, index), ...state.settings.appIds.slice(index + 1)],
        },
      };
    }
    default: {
      return state;
    }
  }
};
