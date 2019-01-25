import { APIResponse, App, HTTPMethods } from '../../types/commons';

import { checkIsEnterprise } from '../../utils/checkIsEnterprise';

import API from './api';
import fetchJSON from './fetchJSON';

/**
 * Get apps
 *
 * @returns {Promise<App[] | APIResponse>}
 */
export const getDirectoryAppList = (): Promise<App[] | APIResponse> => {
  const isEnterprise = checkIsEnterprise();
  const url = isEnterprise ? `${API.USER_APPS}?scope=all` : API.PUBLIC_APPS;
  const optionOverrides = isEnterprise ? undefined : { headers: undefined, credentials: 'omit' };

  return fetchJSON(url, HTTPMethods.GET, undefined, optionOverrides);
};

/**
 * Get admin apps
 *
 * @returns {Promise<App[] | APIResponse>}
 */
export const getAdminApps = (): Promise<App[] | APIResponse> => fetchJSON(`${API.USER_APPS}?scope=all`, HTTPMethods.GET);

/**
 * Get admin app
 *
 * @returns {Promise<App | APIResponse>}
 */
export const getAdminApp = (app: App): Promise<App | APIResponse> => fetchJSON(`${API.ADMIN_APPS}/${app.id}`, HTTPMethods.GET);

/**
 * Create new admin app
 *
 * @returns {Promise<APIResponse>}
 */
export const createAdminApp = (app: App): Promise<APIResponse> => fetchJSON(`${API.ADMIN_APPS}`, HTTPMethods.POST, { application: app });

/**
 * Update an admin app
 *
 * @returns {Promise<APIResponse>}
 */
export const updateAdminApp = (app: App): Promise<APIResponse> => fetchJSON(`${API.ADMIN_APPS}/${app.id}`, HTTPMethods.PUT, { application: app });
/**
 * Delete an admin app
 *
 * @returns {Promise<APIResponse>}
 */
export const deleteAdminApp = (app: App): Promise<APIResponse> => fetchJSON(`${API.ADMIN_APPS}/${app.id}`, HTTPMethods.DELETE);
