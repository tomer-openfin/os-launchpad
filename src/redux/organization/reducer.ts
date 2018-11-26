import * as logoIcon from '../../assets/Logo.svg';
import DEFAULT_THEMES from '../../utils/defaultThemes';
import { SET_LOGO, SET_THEME } from './actions';
import { OrganizationActions, OrganizationState } from './types';

const defaultState: OrganizationState = {
  logo: logoIcon,
  theme: DEFAULT_THEMES[0],
};

export default (state: OrganizationState = defaultState, action: OrganizationActions) => {
  switch (action.type) {
    case SET_LOGO: {
      return {
        ...state,
        logo: action.payload,
      };
    }
    case SET_THEME: {
      return {
        ...state,
        theme: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
