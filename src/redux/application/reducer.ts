import {
  fetchManifest,
  getManifest,
  getManifestOverride,
  setIsDragAndDrop,
  setIsDrawerExpanded,
  setIsEnterprise,
  setIsExpanded,
  setRuntimeVersion,
  updateManifestOverride,
} from './actions';
import { ApplicationActions, ApplicationState, Manifest } from './types';

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
  isDragAndDrop: false,
  isDrawerExpanded: false,
  isEnterprise: false,
  isExpanded: false,
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
      return {
        ...state,
        manifestOverride: action.payload,
      };
    }
    case setIsEnterprise.toString(): {
      return {
        ...state,
        isEnterprise: action.payload,
      };
    }
    case setIsExpanded.toString(): {
      return {
        ...state,
        isExpanded: action.payload,
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
