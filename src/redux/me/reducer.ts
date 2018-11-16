import { GET_SETTINGS, LOGIN, SET_AUTO_HIDE, SET_LAUNCHER_POSITION, SET_ME } from './actions';

import { LauncherPosition } from '../../types/commons';
import { GetSettingsSuccess, MeActions, MeState, SetLaunchbarPayload, SetMePayload } from './types';

export const defaultState: MeState = {
  isAdmin: false,
  settings: {
    autoHide: false,
    launcherPosition: LauncherPosition.Top,
  },
  username: '',
};

export default (state: MeState = defaultState, action: MeActions) => {
  switch (action.type) {
    case GET_SETTINGS.SUCCESS: {
      return {
        ...state,
        settings: {
          ...(action as GetSettingsSuccess).payload!,
        },
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
    case SET_ME: {
      return {
        ...state,
        isAdmin: (action.payload! as SetMePayload).isAdmin,
        username: (action.payload! as SetMePayload).username,
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
    case SET_LAUNCHER_POSITION: {
      return {
        ...state,
        settings: {
          ...state.settings,
          launcherPosition: (action.payload! as SetLaunchbarPayload).launcherPosition,
        },
      };
    }
    default: {
      return state;
    }
  }
};
