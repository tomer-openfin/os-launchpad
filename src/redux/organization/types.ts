import { Theme } from '../../types/commons';
import { ActionsUnion } from '../types';
import { getAdminOrgSettings, getOrgSettings, saveAdminOrgSettings, saveOrgActiveThemeId, saveOrgImage, setOrgActiveThemeId } from './actions';

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
export type OrganizationActions =
  | ReturnType<typeof saveOrgImage>
  | ReturnType<typeof saveOrgActiveThemeId>
  | ReturnType<typeof setOrgActiveThemeId>
  | ActionsUnion<typeof getOrgSettings>
  | ActionsUnion<typeof getAdminOrgSettings>
  | ActionsUnion<typeof saveAdminOrgSettings>;
