import {
  ApplicationActions,
  ApplicationState,
  SET_BLURRING_WINDOW,
  SET_IS_ENTERPRISE,
  SET_IS_EXPANDED,
  SetBlurringWindowAction,
  SetIsEnterpriseAction,
  SetIsExpandedAction,
} from './';

const defaultState: ApplicationState = {
  blurringWindows: {},
  isEnterprise: false,
  isExpanded: false,
};

export default (state: ApplicationState = defaultState, action: ApplicationActions) => {
  switch (action.type) {
    case SET_BLURRING_WINDOW: {
      const { payload } = action as SetBlurringWindowAction;
      if (!payload) {
        return state;
      }

      const { name, isBlurring } = payload;
      return {
        ...state,
        blurringWindows: {
          ...state.blurringWindows,
          [name]: isBlurring,
        },
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
    default: {
      return state;
    }
  }
};
