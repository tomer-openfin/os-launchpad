import * as logoIcon from '../../assets/Logo.svg';

import DEFAULT_THEMES from '../../utils/defaultThemes';

import { OrganizationActions, OrganizationState } from './types';

import { GET_ADMIN_ORG_SETTINGS, GET_ORG_SETTINGS, SET_ORG_ACTIVE_THEME_ID } from './actions';

const defaultState: OrganizationState = {
  activeThemeId: DEFAULT_THEMES[0].id,
  loginLogo: null,
  logo: null,
  themes: DEFAULT_THEMES,
};

export default (state: OrganizationState = defaultState, action: OrganizationActions) => {
  switch (action.type) {
    case GET_ORG_SETTINGS.SUCCESS:
    case GET_ADMIN_ORG_SETTINGS.SUCCESS: {
      const { activeThemeId, loginLogo, logo, themes } = action.payload;

      return {
        ...state,
        activeThemeId,
        loginLogo,
        logo,
        themes,
      };
    }
    case SET_ORG_ACTIVE_THEME_ID: {
      return {
        ...state,
        activeThemeId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
