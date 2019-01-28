import { SET_IS_DRAG_AND_DROP, SET_IS_DRAWER_EXPANDED, SET_IS_ENTERPRISE, SET_IS_EXPANDED, SET_RUNTIME_VERSION } from './actions';
import {
  ApplicationActions,
  ApplicationState,
  SetIsDragAndDropAction,
  SetIsDrawerExpandedAction,
  SetIsEnterpriseAction,
  SetIsExpandedAction,
  SetRuntimeVersion,
} from './types';

const defaultState: ApplicationState = {
  isDragAndDrop: false,
  isDrawerExpanded: false,
  isEnterprise: false,
  isExpanded: false,
  runtimeVersion: '',
};

export default (state: ApplicationState = defaultState, action: ApplicationActions) => {
  switch (action.type) {
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
        runtimeVersion: (action as SetRuntimeVersion).payload,
      };
    }
    default: {
      return state;
    }
  }
};
