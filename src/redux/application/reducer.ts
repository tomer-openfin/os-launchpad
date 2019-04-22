import {
  fetchManifest,
  getManifest,
  getManifestOverride,
  resetApplicationUi,
  setIsDragAndDrop,
  setIsDrawerExpanded,
  setIsEnterprise,
  setRuntimeVersion,
  updateManifestOverride,
} from './actions';
import { ApplicationActions, ApplicationState, Manifest } from './types';

export const defaultUiState = {
  isDragAndDrop: false,
  isDrawerExpanded: false,
};

const emptyManifest: Manifest = {
  shortcut: {
    icon: '',
  },
  splashScreenImage: '',
  startup_app: {
    icon: '',
  },
};

const defaultState: ApplicationState = {
  ...defaultUiState,
  isEnterprise: false,
  manifest: emptyManifest,
  manifestOverride: {},
  runtimeVersion: '',
};

export default (state: ApplicationState = defaultState, action: ApplicationActions) => {
  switch (action.type) {
    case fetchManifest.success.toString():
    case getManifest.success.toString(): {
      return {
        ...state,
        manifest: action.payload,
      };
    }
    case getManifestOverride.success.toString():
    case updateManifestOverride.success.toString(): {
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
        manifestOverride: action.payload,
      };
    }
    case resetApplicationUi.toString(): {
      return {
        ...state,
        ...defaultUiState,
      };
    }
    case setIsEnterprise.toString(): {
      return {
        ...state,
        isEnterprise: action.payload,
      };
    }
    case setIsDragAndDrop.toString(): {
      return {
        ...state,
        isDragAndDrop: action.payload,
      };
    }
    case setIsDrawerExpanded.toString(): {
      return {
        ...state,
        isDrawerExpanded: action.payload,
      };
    }
    case setRuntimeVersion.toString(): {
      return {
        ...state,
        runtimeVersion: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
