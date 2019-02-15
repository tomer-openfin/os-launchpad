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
  saveOrgImage,
  setOrgActiveThemeId,
} from './actions';

// State
export interface OrgImages {
  logo: string | null;
  loginLogo: string | null;
}

export interface OrganizationState extends OrgImages {
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

export type SaveOrgImage = ReturnType<typeof saveOrgImage>;
export type SaveOrgActiveThemeId = ReturnType<typeof saveOrgActiveThemeId>;

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
  | SaveOrgImage
  | SaveOrgActiveThemeId
  | SetOrgActiveThemeId;
