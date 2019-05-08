import { createSelector } from 'reselect';

import DEFAULT_THEMES from '../../utils/defaultThemes';
import { DEFAULT_LOGIN_LOGO, DEFAULT_LOGO } from '../../utils/orgImages';
import { State } from '../types';
import { OrganizationState } from './types';

export const getOrganizationSettings = (state: State): OrganizationState => state.organization;
export const getOrganizationLogo = (state: State) => getOrganizationSettings(state).logo || DEFAULT_LOGO;
export const getOrganizationLoginLogo = (state: State) => getOrganizationSettings(state).loginLogo || DEFAULT_LOGIN_LOGO;
export const getOrganizationActiveThemeId = (state: State) => getOrganizationSettings(state).activeThemeId;
export const getOrganizationThemes = (state: State) => getOrganizationSettings(state).themes;

export const getOrganizationImages = createSelector(
  [getOrganizationLogo, getOrganizationLoginLogo],
  (logo, loginLogo) => ({
    loginLogo: loginLogo || DEFAULT_LOGIN_LOGO,
    logo: logo || DEFAULT_LOGO,
  }),
);

export const getOrganizationActiveTheme = createSelector(
  getOrganizationActiveThemeId,
  getOrganizationThemes,
  (activeThemeId, themes) => themes.find(theme => theme.id === activeThemeId) || DEFAULT_THEMES[0],
);
