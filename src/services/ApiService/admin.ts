import { Manifest, ManifestOverride } from '../../redux/application/types';
import { OrganizationState } from '../../redux/organization';
import { HTTPMethods } from '../../types/commons';
import API from './api';
import { api } from './utils';

/**
 * Get organization settings
 */
export const getOrgSettings = api<OrganizationState>(API.ORG_SETTINGS, HTTPMethods.GET, json => ({ data: json }));
export type GetOrgSettings = typeof getOrgSettings;

/**
 * Get admin organization settings
 */
export const getAdminOrgSettings = api<OrganizationState>(API.ADMIN_SETTINGS, HTTPMethods.GET, json => ({ data: json }));
export type GetAdminOrgSettings = typeof getAdminOrgSettings;

/**
 * Get admin manifest overrides
 */
export const getAdminManifestOverrides = api<ManifestOverride>(API.ADMIN_MANIFEST_OVERRIDE, HTTPMethods.GET, json => ({ data: json }));
export type GetAdminManifestOverrides = typeof getAdminManifestOverrides;

/**
 * Get admin manifest
 */
export const getAdminManifest = api<Manifest>(API.ADMIN_MANIFEST, HTTPMethods.GET, json => ({ data: json }));
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
  api<undefined, { manifest: ManifestOverride }>(API.ADMIN_SETTINGS, HTTPMethods.POST, json => ({ data: undefined }))({ manifest: manifestOverrides });
export type SaveAdminManifestOverrides = typeof saveAdminManifestOverrides;
