import { State } from '../types';

export const getOrganizationSettings = (state: State) => state.organization;
export const getOrganizationLogo = (state: State) => getOrganizationSettings(state).logo;
export const getOrganizationTheme = (state: State) => getOrganizationSettings(state).theme;
