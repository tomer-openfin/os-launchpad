import { Theme } from '../../types/commons';
import {
  getAdminOrgSettingsError,
  getAdminOrgSettingsRequest,
  getAdminOrgSettingsSuccess,
  getOrgSettingsError,
  getOrgSettingsRequest,
  getOrgSettingsSuccess,
  saveAdminOrgSettingsError,
  saveAdminOrgSettingsRequest,
  saveAdminOrgSettingsSuccess,
  saveOrgActiveThemeId,
  saveOrgAutoLogin,
  saveOrgLogo,
  setOrgActiveThemeId,
  setOrgLogo,
} from './actions';

// State
export interface OrganizationState {
  activeThemeId: Theme['id'];
  autoLogin: boolean;
  logo: string;
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

export type SaveOrgAutoLogin = ReturnType<typeof saveOrgAutoLogin>;
export type SaveOrgLogo = ReturnType<typeof saveOrgLogo>;
export type SaveOrgActiveThemeId = ReturnType<typeof saveOrgActiveThemeId>;

export type SetOrgLogo = ReturnType<typeof setOrgLogo>;
export type SetOrgActiveThemeId = ReturnType<typeof setOrgActiveThemeId>;

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
  | SaveOrgAutoLogin
  | SaveOrgLogo
  | SaveOrgActiveThemeId
  | SetOrgLogo
  | SetOrgActiveThemeId;
