import { DeepReadonly } from '../../types/utils';
import DEFAULT_THEMES from '../../utils/defaultThemes';
import { getAdminOrgSettings, getOrgSettings, setOrgActiveThemeId } from './actions';
import { OrganizationActions, OrganizationState } from './types';

type ReadonlyOrganizationState = DeepReadonly<OrganizationState>;

const defaultState: ReadonlyOrganizationState = {
  activeThemeId: DEFAULT_THEMES[0].id,
  loginLogo: null,
  logo: null,
  themes: DEFAULT_THEMES,
};

export default (state: ReadonlyOrganizationState = defaultState, action: OrganizationActions): ReadonlyOrganizationState => {
  switch (action.type) {
    case getAdminOrgSettings.success.toString():
    case getOrgSettings.success.toString(): {
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
        ...action.payload,
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
