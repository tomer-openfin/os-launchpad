import { Theme } from '../../types/commons';
import {
  getAdminOrgSettingsError,
  getAdminOrgSettingsRequest,
  getAdminOrgSettingsSuccess,
  getOrgSettingsError,
  getOrgSettingsRequest,
  getOrgSettingsSuccess,
  saveActiveThemeId,
  saveAdminOrgSettingsError,
  saveAdminOrgSettingsRequest,
  saveAdminOrgSettingsSuccess,
  saveLogo,
  setActiveThemeId,
  setLogo,
} from './actions';

// State
export interface OrganizationState {
  logo: string;
  activeThemeId: Theme['id'];
  themes: Theme[];
}

// Actions
export type GetOrgSettingsRequest = ReturnType<typeof getOrgSettingsRequest>;
export type GetOrgSettingsSuccess = ReturnType<typeof getOrgSettingsSuccess>;
export type GetOrgSettingsError = ReturnType<typeof getOrgSettingsError>;

export type GetAdminOrgSettingsRequest = ReturnType<typeof getAdminOrgSettingsRequest>;
export type GetAdminOrgSettingsSuccess = ReturnType<typeof getAdminOrgSettingsSuccess>;
export type GetAdminOrgSettingsError = ReturnType<typeof getAdminOrgSettingsError>;

export type SaveAdminOrgSettingsRequest = ReturnType<typeof saveAdminOrgSettingsRequest>;
export type SaveAdminOrgSettingsSuccess = ReturnType<typeof saveAdminOrgSettingsSuccess>;
export type SaveAdminOrgSettingsError = ReturnType<typeof saveAdminOrgSettingsError>;

export type SaveLogo = ReturnType<typeof saveLogo>;
export type SaveActiveThemeId = ReturnType<typeof saveActiveThemeId>;

export type SetLogo = ReturnType<typeof setLogo>;
export type SetActiveThemeId = ReturnType<typeof setActiveThemeId>;

export type OrganizationActions =
  | GetOrgSettingsRequest
  | GetOrgSettingsSuccess
  | GetOrgSettingsError
  | GetAdminOrgSettingsRequest
  | GetAdminOrgSettingsSuccess
  | GetAdminOrgSettingsError
  | SaveAdminOrgSettingsRequest
  | SaveAdminOrgSettingsSuccess
  | SaveAdminOrgSettingsError
  | SaveLogo
  | SaveActiveThemeId
  | SetLogo
  | SetActiveThemeId;
