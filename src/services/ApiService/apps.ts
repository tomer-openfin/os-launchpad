import { App, HTTPMethods } from '../../types/commons';
import { checkIsEnterprise } from '../../utils/checkIsEnterprise';
import API from './api';
import { api } from './utils';

const OMIT: 'omit' = 'omit';

/**
 * Get apps
 */
export const getDirectoryAppList = () => {
  const isEnterprise = checkIsEnterprise();
  const url = isEnterprise ? `${API.USER_APPS}?scope=all` : API.PUBLIC_APPS;
  const optionOverrides = isEnterprise ? undefined : { headers: undefined, credentials: OMIT };

  return api<App[]>(url, HTTPMethods.GET, json => ({ data: json || [] }), optionOverrides)();
};
export type GetDirectoryAppList = typeof getDirectoryAppList;

/**
 * Get admin apps
 */
export const getAdminApps = api<App[]>(`${API.USER_APPS}?scope=all`, HTTPMethods.GET, json => ({ data: json || [] }));
export type GetAdminApps = typeof getAdminApps;

/**
 * Get admin app
 */
export const getAdminApp = (app: App) => api<App>(`${API.ADMIN_APPS}/${app.id}`, HTTPMethods.GET, json => ({ data: json }))();
export type GetAdminApp = typeof getAdminApp;

/**
 * Create new admin app
 */
export const createAdminApp = (app: App) =>
  api<App, { application: App }>(API.ADMIN_APPS, HTTPMethods.POST, json => ({ data: json.app }))({ application: app });
export type CreateAdminApp = typeof createAdminApp;

/**
 * Update an admin app
 */
export const updateAdminApp = (app: App) =>
  api<App, { application: App }>(`${API.ADMIN_APPS}/${app.id}`, HTTPMethods.PUT, json => ({ data: json.app }))({ application: app });
export type UpdateAdminApp = typeof updateAdminApp;

/**
 * Delete an admin app
 */
export const deleteAdminApp = (app: App) => api<undefined>(`${API.ADMIN_APPS}/${app.id}`, HTTPMethods.DELETE, _ => ({ data: undefined }))();
export type DeleteAdminApp = typeof deleteAdminApp;
