import { APIResponse, HTTPMethods } from '../../types/commons';

import { OrganizationState } from '../../redux/organization';

import { ManifestOverride } from '../../redux/application/types';
import API from './api';
import fetchJSON from './fetchJSON';

/**
 * Get organization settings
 *
 * @returns {Promise<APIResponse>}
 */
export const getOrgSettings = (): Promise<APIResponse> => fetchJSON(API.ORG_SETTINGS, HTTPMethods.GET);

/**
 * Get admin organization settings
 *
 * @returns {Promise<APIResponse>}
 */
export const getAdminOrgSettings = (): Promise<APIResponse> => fetchJSON(API.ADMIN_SETTINGS, HTTPMethods.GET);

/**
 * Get admin manifest overrides
 *
 * @returns {Promise<APIResponse>}
 */
export const getAdminManifestOverrides = (): Promise<APIResponse> => fetchJSON(API.ADMIN_MANIFEST_OVERRIDE, HTTPMethods.GET);

/**
 * Get admin manifest
 *
 * @returns {Promise<APIResponse>}
 */
export const getAdminManifest = (): Promise<APIResponse> => fetchJSON(API.ADMIN_MANIFEST, HTTPMethods.GET);

/**
 * Save organization settings
 *
 * @returns {Promise<APIResponse>}
 */
export const saveAdminOrgSettings = (settings: OrganizationState): Promise<APIResponse> => fetchJSON(API.ADMIN_SETTINGS, HTTPMethods.POST, { settings });

/**
 * Save admin manifest overrides
 *
 * @returns {Promise<APIResponse>}
 */
export const saveAdminManifestOverrides = (manifestOverrides: ManifestOverride): Promise<APIResponse> =>
  fetchJSON(API.ADMIN_MANIFEST_OVERRIDE, HTTPMethods.POST, { manifest: manifestOverrides });
