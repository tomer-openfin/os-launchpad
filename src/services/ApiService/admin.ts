import { Manifest, ManifestOverride } from '../../redux/application/types';
import { OrganizationState } from '../../redux/organization';
import { HTTPMethods } from '../../types/commons';
import API from './api';
import { api, transformNullCheck } from './utils';

const partialOrganizationState: Partial<OrganizationState> = {};
const partialManifestOverrides: Partial<ManifestOverride> = {};

/**
 * Get organization settings
 */
export const getOrgSettings = api<Partial<OrganizationState>>(API.ORG_SETTINGS, HTTPMethods.GET, transformNullCheck(partialOrganizationState));
export type GetOrgSettings = typeof getOrgSettings;

/**
 * Get admin organization settings
 */
export const getAdminOrgSettings = api<Partial<OrganizationState>>(API.ADMIN_SETTINGS, HTTPMethods.GET, transformNullCheck(partialOrganizationState));
export type GetAdminOrgSettings = typeof getAdminOrgSettings;

/**
 * Get admin manifest overrides
 */
export const getAdminManifestOverrides = api<Partial<ManifestOverride>>(
  API.ADMIN_MANIFEST_OVERRIDE,
  HTTPMethods.GET,
  transformNullCheck(partialManifestOverrides),
);
export type GetAdminManifestOverrides = typeof getAdminManifestOverrides;

/**
 * Get admin manifest
 */
export const getAdminManifest = api<Manifest>(API.ADMIN_MANIFEST, HTTPMethods.GET, json => ({ data: json as Manifest }));
export type GetAdminManifest = typeof getAdminManifest;

/**
 * Save organization settings
 */
export const saveAdminOrgSettings = (settings: OrganizationState) =>
  api<undefined, { settings: OrganizationState }>(API.ADMIN_SETTINGS, HTTPMethods.POST, json => ({ data: undefined }))({ settings });
export type SaveAdminOrgSettings = typeof saveAdminOrgSettings;

/**
 * Save admin manifest overrides
 */
export const saveAdminManifestOverrides = (manifestOverrides: ManifestOverride) =>
  api<undefined, { manifest: ManifestOverride }>(API.ADMIN_MANIFEST_OVERRIDE, HTTPMethods.POST, json => ({ data: undefined }))({ manifest: manifestOverrides });
export type SaveAdminManifestOverrides = typeof saveAdminManifestOverrides;
