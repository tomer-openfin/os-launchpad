import {
  ADD_TO_APP_LAUNCHER,
  GET_ME,
  GET_SETTINGS,
  LOGIN,
  LOGOUT,
  REMOVE_FROM_APP_LAUNCHER,
  SET_APP_IDS,
  SET_AUTO_HIDE,
  SET_LAUNCHER_POSITION,
  SET_LAUNCHER_SIZE,
  SET_ME,
  SHOW_SET_PASSWORD_FORM,
} from './actions';

import { DirectionalPosition, LauncherSize } from '../../types/commons';
import { GetSettingsSuccess, MeActions, MeState, SetAppIds, SetAutoHide, SetLauncherPositionPayload, SetLauncherSizePayload, SetMePayload } from './types';

const defaultLoginState = {
  changePassword: false,
  error: false,
  message: '',
  session: '',
};

export const defaultState: MeState = {
  email: '',
  firstName: '',
  isAdmin: false,
  lastName: '',
  login: defaultLoginState,
  settings: {
    appIds: [],
    autoHide: false,
    launcherPosition: DirectionalPosition.Top,
    launcherSize: LauncherSize.Large,
  },
};

export default (state: MeState = defaultState, action: MeActions): MeState => {
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
    case GET_ME.SUCCESS:
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
        login: {
          ...state.login,
          // reset error and error message
          error: false,
          message: '',
        },
      };
    }
    case LOGIN.SUCCESS: {
      return {
        ...state,
        login: {
          ...defaultLoginState,
          // if we reset this on success the login screen flickers before closing
          // plus the likely use of this screen while logged in is for an eventual change password feature
          changePassword: state.login.changePassword,
        },
      };
    }
    case LOGIN.ERROR: {
      const { message } = action.payload;

      return {
        ...state,
        login: {
          ...state.login,
          error: true,
          message,
        },
      };
    }
    case LOGOUT.SUCCESS: {
      return defaultState;
    }
    case SHOW_SET_PASSWORD_FORM: {
      const { session, message } = action.payload;
      return {
        ...state,
        login: {
          changePassword: true,
          error: false,
          message,
          session,
        },
      };
    }
    case SET_APP_IDS:
    case SET_AUTO_HIDE: {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...(action as SetAutoHide | SetAppIds).payload!,
        },
      };
    }
    case SET_LAUNCHER_POSITION: {
      return {
        ...state,
        settings: {
          ...state.settings,
          launcherPosition: (action.payload! as SetLauncherPositionPayload).launcherPosition,
        },
      };
    }
    case SET_LAUNCHER_SIZE: {
      return {
        ...state,
        settings: {
          ...state.settings,
          launcherSize: (action.payload! as SetLauncherSizePayload).launcherSize,
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
