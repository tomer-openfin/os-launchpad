import {
  ApplicationActions,
  ApplicationState,
  IsEnterpriseAction,
  SET_IS_ENTERPRISE,
} from './';

const defaultState: ApplicationState = {
  isEnterprise: false,
};

export default (state: ApplicationState = defaultState, action: ApplicationActions) => {
  switch (action.type) {
    case SET_IS_ENTERPRISE: {
      return {
        ...state,
        isEnterprise: !!(action as IsEnterpriseAction).payload,
      };
    }
    default: {
      return state;
    }
  }
};
