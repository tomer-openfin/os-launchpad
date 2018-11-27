import { ApplicationActions, ApplicationState, SET_IS_ENTERPRISE, SET_IS_EXPANDED, SetIsEnterpriseAction, SetIsExpandedAction } from './';

const defaultState: ApplicationState = {
  isEnterprise: false,
  isExpanded: false,
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
    default: {
      return state;
    }
  }
};
