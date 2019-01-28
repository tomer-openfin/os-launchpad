import { createSelector } from 'reselect';
import DEFAULT_THEMES from '../../utils/defaultThemes';
import { State } from '../types';

export const getOrganizationSettings = (state: State) => state.organization;
export const getOrganizationLogo = (state: State) => getOrganizationSettings(state).logo;
export const getOrganizationActiveThemeId = (state: State) => getOrganizationSettings(state).activeThemeId;
export const getOrganizationThemes = (state: State) => getOrganizationSettings(state).themes;
export const getOrganizationAutoLogin = (state: State) => getOrganizationSettings(state).autoLogin;
export const getOrganizationActiveTheme = createSelector(
  getOrganizationActiveThemeId,
  getOrganizationThemes,
  (activeThemeId, themes) => themes.find(theme => theme.id === activeThemeId) || DEFAULT_THEMES[0],
);
