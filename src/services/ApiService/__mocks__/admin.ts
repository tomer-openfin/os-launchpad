import * as logoIcon from '../../../assets/Logo.svg';
import { Manifest } from '../../../redux/application/types';
import { OrganizationState } from '../../../redux/organization/types';
import { ApiResponseStatus, ApiSuccessResponse } from '../../../types/commons';
import DEFAULT_THEMES from '../../../utils/defaultThemes';
import { GetAdminManifest, GetAdminManifestOverrides, GetAdminOrgSettings, GetOrgSettings, SaveAdminManifestOverrides, SaveAdminOrgSettings } from '../admin';

const MOCK_ORG_SETTINGS = {
  activeThemeId: DEFAULT_THEMES[0].id,
  loginLogo: logoIcon,
  logo: logoIcon,
  themes: DEFAULT_THEMES,
};

const MOCK_MANIFEST = {
  shortcut: {
    icon: '',
  },
  splashScreenImage: '',
  startup_app: {
    icon: '',
  },
};

export const getOrgSettings: GetOrgSettings = () => {
  const response: ApiSuccessResponse<OrganizationState> = { status: ApiResponseStatus.Success, data: MOCK_ORG_SETTINGS };
  return Promise.resolve(response);
};

export const getAdminOrgSettings: GetAdminOrgSettings = () => {
  const response: ApiSuccessResponse<OrganizationState> = { status: ApiResponseStatus.Success, data: MOCK_ORG_SETTINGS };
  return Promise.resolve(response);
};

export const getAdminManifest: GetAdminManifest = () => {
  const response: ApiSuccessResponse<Manifest> = { status: ApiResponseStatus.Success, data: MOCK_MANIFEST };
  return Promise.resolve(response);
};

export const getAdminManifestOverrides: GetAdminManifestOverrides = () => {
  const response: ApiSuccessResponse<Manifest> = { status: ApiResponseStatus.Success, data: MOCK_MANIFEST };
  return Promise.resolve(response);
};

export const saveAdminOrgSettings: SaveAdminOrgSettings = settings => {
  const response: ApiSuccessResponse<undefined> = { status: ApiResponseStatus.Success, data: undefined };
  return Promise.resolve(response);
};

export const saveAdminManifestOverrides: SaveAdminManifestOverrides = manifestOverrides => {
  const response: ApiSuccessResponse<undefined> = { status: ApiResponseStatus.Success, data: undefined };
  return Promise.resolve(response);
};
