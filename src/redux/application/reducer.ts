import { DeepReadonly } from '../../types/utils';
import {
  fetchManifest,
  getManifest,
  getManifestOverride,
  resetApplicationUi,
  setIsDragAndDrop,
  setIsEnterprise,
  setManifestUrl,
  setRuntimeVersion,
  setRvmVersion,
  updateManifestOverride,
} from './actions';
import { ApplicationActions, ApplicationState, Manifest } from './types';

type ReadonlyApplicationState = DeepReadonly<ApplicationState>;

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

const defaultState: ReadonlyApplicationState = {
  ...defaultUiState,
  isEnterprise: false,
  manifest: emptyManifest,
  manifestOverride: {},
  manifestUrl: '',
  runtimeVersion: '',
  rvmVersion: '',
};

export default (state: ReadonlyApplicationState = defaultState, action: ApplicationActions): ReadonlyApplicationState => {
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
    case setRuntimeVersion.toString(): {
      return {
        ...state,
        runtimeVersion: action.payload,
      };
    }
    case setRvmVersion.toString(): {
      return {
        ...state,
        rvmVersion: action.payload,
      };
    }
    case setManifestUrl.toString(): {
      return {
        ...state,
        manifestUrl: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
