import * as logoIcon from '../../../assets/Logo.svg';

import { OrganizationState } from '../../../redux/organization/types';
import { APIResponse } from '../../../types/commons';

import DEFAULT_THEMES from '../../../utils/defaultThemes';
import { OkResponse } from './utils/commons';

export const MOCK_ORG_SETTINGS = {
  activeThemeId: DEFAULT_THEMES[0].id,
  loginLogo: logoIcon,
  logo: logoIcon,
  themes: DEFAULT_THEMES,
};

export const getOrgSettings = (): Promise<OrganizationState> => {
  return Promise.resolve(MOCK_ORG_SETTINGS);
};

export const getAdminOrgSettings = (): Promise<OrganizationState> => {
  return Promise.resolve(MOCK_ORG_SETTINGS);
};

export const saveAdminOrgSettings = (settings: OrganizationState): Promise<APIResponse> => {
  return Promise.resolve(OkResponse);
};
