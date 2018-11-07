import { GET_SETTINGS, GetSettingsSuccess, MeActions, MeState, SET_LAUNCHBAR_POSITION, SET_ME, SetLaunchbarPayload, SetMePayload } from './';

export enum Position {
  TOP = 'TOP',
  RIGHT = 'RIGHT',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
}

export const defaultState: MeState = {
  settings: {
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
    case SET_ME: {
      return {
        ...state,
        username: (action.payload! as SetMePayload).username,
      };
    }
    case SET_LAUNCHBAR_POSITION: {
      return {
        ...state,
        settings: { launcherPosition: (action.payload! as SetLaunchbarPayload).launcherPosition },
      };
    }
    default: {
      return state;
    }
  }
};
