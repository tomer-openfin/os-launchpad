import { Theme } from '../../types/commons';
import { saveOrgSettingsError, saveOrgSettingsRequest, saveOrgSettingsSuccess, setLogo, setTheme } from './actions';

// State
export interface OrganizationState {
  logo: string;
  theme: Theme;
}

// Actions
export type SaveOrgSettingsRequest = ReturnType<typeof saveOrgSettingsRequest>;
export type SaveOrgSettingsSuccess = ReturnType<typeof saveOrgSettingsSuccess>;
export type SaveOrgSettingsError = ReturnType<typeof saveOrgSettingsError>;
export type SetLogo = ReturnType<typeof setLogo>;
export type SetTheme = ReturnType<typeof setTheme>;

export type OrganizationActions = SaveOrgSettingsRequest | SaveOrgSettingsSuccess | SaveOrgSettingsError | SetLogo | SetTheme;
