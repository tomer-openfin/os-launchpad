import { APIResponse, HTTPMethods } from '../../types/commons';

import { OrganizationState } from '../../redux/organization';

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
 * Save organization settings
 *
 * @returns {Promise<APIResponse>}
 */
export const saveAdminOrgSettings = (settings: OrganizationState): Promise<APIResponse> => fetchJSON(API.ADMIN_SETTINGS, HTTPMethods.POST, { settings });
