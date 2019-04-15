import {
  addToAppLauncher,
  getSettings,
  login,
  logout,
  removeFromAppLauncher,
  resetSettings,
  setAppIds,
  setAuthMessaging,
  setAutoHide,
  setLauncherMonitorSettings,
  setLauncherPosition,
  setLauncherSize,
} from './actions';

import { DirectionalPosition, LauncherSize } from '../../types/commons';
import { getCoordinatesMidPoint } from '../../utils/coordinateHelpers';
import { MeActions, MeAuthMessagingState, MeSettingsState, MeState } from './types';

export const defaultSettings: MeSettingsState = {
  appIds: [],
  autoHide: false,
  launcherMonitorId: null,
  launcherMonitorReferencePoint: {
    x: 0,
    y: 0,
  },
  launcherPosition: DirectionalPosition.Top,
  launcherSize: LauncherSize.Large,
};

export const defaultAuthMessaging: MeAuthMessagingState = {
  isError: false,
  message: '',
};

export const defaultState: MeState = {
  authMessaging: defaultAuthMessaging,
  email: '',
  firstName: '',
  isAdmin: false,
  lastName: '',
  sessionTimestamp: null,
  settings: defaultSettings,
};

export default (state: MeState = defaultState, action: MeActions): MeState => {
  switch (action.type) {
    case getSettings.success.toString(): {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    }
    case setAuthMessaging.toString(): {
      return {
        ...state,
        authMessaging: action.payload,
      };
    }
    case login.success.toString(): {
      return {
        ...state,
        ...action.payload,
      };
    }
    case logout.success.toString(): {
      return defaultState;
    }
    case setAppIds.toString():
    case setAutoHide.toString(): {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    }
    case setLauncherPosition.toString(): {
      return {
        ...state,
        settings: {
          ...state.settings,
          launcherPosition: action.payload.launcherPosition,
        },
      };
    }
    case setLauncherSize.toString(): {
      return {
        ...state,
        settings: {
          ...state.settings,
          launcherSize: action.payload.launcherSize,
        },
      };
    }
    case setLauncherMonitorSettings.toString(): {
      const monitorDetails = action.payload;

      // Windows - use name
      // Mac - there is no name for monitors, only deviceId
      const launcherMonitorId = monitorDetails.name || monitorDetails.deviceId;
      const launcherMonitorReferencePoint = getCoordinatesMidPoint(monitorDetails.monitorRect);

      return {
        ...state,
        settings: {
          ...state.settings,
          launcherMonitorId,
          launcherMonitorReferencePoint,
        },
      };
    }
    case addToAppLauncher.toString(): {
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
    case removeFromAppLauncher.toString(): {
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
    case resetSettings.toString(): {
      return {
        ...state,
        settings: defaultSettings,
      };
    }
    default: {
      return state;
    }
  }
};
