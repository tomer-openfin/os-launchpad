import {
  GET_SETTINGS,
  GetSettingsSuccess,
  MeActions,
  MeState,
  SET_APPLICATION_LAUNCHER,
  SET_ME,
  SetApplicationLauncher,
  SetMePayload,
} from './';

export const defaultState: MeState = {
  settings: {
    launcherLocation: 'TOP',
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
    case SET_APPLICATION_LAUNCHER: {
      return {
        ...state,
        settings: {
          ...state.settings,
          launcherLocation: (action as SetApplicationLauncher).payload,
        },
      };
    }
    case SET_ME: {
      return {
        ...state,
        username: (action.payload! as SetMePayload).username,
      };
    }
    default: {
      return state;
    }
  }
};
