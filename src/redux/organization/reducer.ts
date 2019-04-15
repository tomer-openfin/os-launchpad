import DEFAULT_THEMES from '../../utils/defaultThemes';
import { getAdminOrgSettings, getOrgSettings, setOrgActiveThemeId } from './actions';
import { OrganizationActions, OrganizationState } from './types';

const defaultState: OrganizationState = {
  activeThemeId: DEFAULT_THEMES[0].id,
  loginLogo: null,
  logo: null,
  themes: DEFAULT_THEMES,
};

export default (state: OrganizationState = defaultState, action: OrganizationActions) => {
  switch (action.type) {
    case getAdminOrgSettings.success.toString():
    case getOrgSettings.success.toString(): {
      if (!action.payload) {
        return state;
      }

      const { activeThemeId, loginLogo, logo, themes } = action.payload;

      return {
        ...state,
        activeThemeId,
        loginLogo,
        logo,
        themes,
      };
    }
    case setOrgActiveThemeId.toString(): {
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
