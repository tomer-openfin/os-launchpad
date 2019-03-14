import {
  addToAppLauncher,
  getSettings,
  logout,
  removeFromAppLauncher,
  setAppIds,
  setAutoHide,
  setLauncherMonitorSettings,
  setLauncherPosition,
  setLauncherSize,
  setMe,
} from './actions';

import { DirectionalPosition, LauncherSize } from '../../types/commons';
import { getCoordinatesMidPoint } from '../../utils/coordinateHelpers';
import { MeActions, MeState } from './types';

export const defaultState: MeState = {
  email: '',
  firstName: '',
  isAdmin: false,
  lastName: '',
  settings: {
    appIds: [],
    autoHide: false,
    launcherMonitorId: null,
    launcherMonitorReferencePoint: {
      x: 0,
      y: 0,
    },
    launcherPosition: DirectionalPosition.Top,
    launcherSize: LauncherSize.Large,
  },
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
    case setMe.toString(): {
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        isAdmin: action.payload.isAdmin,
        lastName: action.payload.lastName,
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
    default: {
      return state;
    }
  }
};
