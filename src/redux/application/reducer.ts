import {
  FETCH_MANIFEST,
  GET_MANIFEST,
  GET_MANIFEST_OVERRIDE,
  SET_IS_DRAG_AND_DROP,
  SET_IS_DRAWER_EXPANDED,
  SET_IS_ENTERPRISE,
  SET_IS_EXPANDED,
  SET_RUNTIME_VERSION,
  UPDATE_MANIFEST_OVERRIDE,
} from './actions';
import {
  ApplicationActions,
  ApplicationState,
  FetchManifestSuccessAction,
  GetManifestOverrideSuccessAction,
  GetManifestSuccessAction,
  Manifest,
  SetIsDragAndDropAction,
  SetIsDrawerExpandedAction,
  SetIsEnterpriseAction,
  SetIsExpandedAction,
  SetRuntimeVersionAction,
  UpdateManifestOverrideSuccessAction,
} from './types';

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
    case FETCH_MANIFEST.SUCCESS:
    case GET_MANIFEST.SUCCESS: {
      return {
        ...state,
        manifest: (action as GetManifestSuccessAction | FetchManifestSuccessAction).payload,
      };
    }
    case GET_MANIFEST_OVERRIDE.SUCCESS:
    case UPDATE_MANIFEST_OVERRIDE.SUCCESS: {
      const { payload } = action as GetManifestOverrideSuccessAction | UpdateManifestOverrideSuccessAction;
      if (!payload) {
        return state;
      }

      return {
        ...state,
        manifestOverride: payload,
      };
    }
    case SET_IS_ENTERPRISE: {
      return {
        ...state,
        isEnterprise: !!(action as SetIsEnterpriseAction).payload,
      };
    }
    case SET_IS_EXPANDED: {
      return {
        ...state,
        isExpanded: (action as SetIsExpandedAction).payload,
      };
    }
    case SET_IS_DRAG_AND_DROP: {
      return {
        ...state,
        isDragAndDrop: (action as SetIsDragAndDropAction).payload,
      };
    }
    case SET_IS_DRAWER_EXPANDED: {
      return {
        ...state,
        isDrawerExpanded: (action as SetIsDrawerExpandedAction).payload,
      };
    }
    case SET_RUNTIME_VERSION: {
      return {
        ...state,
        runtimeVersion: (action as SetRuntimeVersionAction).payload,
      };
    }
    default: {
      return state;
    }
  }
};
