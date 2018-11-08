import { GET_SETTINGS, LOGIN, SET_AUTO_HIDE, SET_LAUNCHBAR_POSITION, SET_ME } from './actions';
import { GetSettingsSuccess, MeActions, MeState, SetLaunchbarPayload, SetMePayload } from './types';

export enum Position {
  TOP = 'TOP',
  RIGHT = 'RIGHT',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
}

export const defaultState: MeState = {
  settings: {
    autoHide: false,
    launcherPosition: 'TOP',
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
    case SET_LAUNCHBAR_POSITION: {
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
