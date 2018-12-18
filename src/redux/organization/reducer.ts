import * as logoIcon from '../../assets/Logo.svg';
import DEFAULT_THEMES from '../../utils/defaultThemes';
import { GET_ADMIN_ORG_SETTINGS, GET_ORG_SETTINGS, SET_ACTIVE_THEME_ID, SET_LOGO } from './actions';
import { OrganizationActions, OrganizationState } from './types';

const defaultState: OrganizationState = {
  activeThemeId: DEFAULT_THEMES[0].id,
  logo: logoIcon,
  themes: DEFAULT_THEMES,
};

export default (state: OrganizationState = defaultState, action: OrganizationActions) => {
  switch (action.type) {
    case GET_ORG_SETTINGS.SUCCESS:
    case GET_ADMIN_ORG_SETTINGS.SUCCESS: {
      const { activeThemeId, logo, themes } = action.payload;
      return {
        activeThemeId,
        logo,
        themes,
      };
    }
    case SET_LOGO: {
      return {
        ...state,
        logo: action.payload,
      };
    }
    case SET_ACTIVE_THEME_ID: {
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
