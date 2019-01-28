import AppData from '../../../samples/AppData';
import { APIResponse, App } from '../../../types/commons';
import { NotFoundResponse, OkResponse } from './utils/commons';

/**
 * Get apps
 *
 * @returns {Promise<App[]}
 */
export const getDirectoryAppList = (): Promise<App[]> => {
  return Promise.resolve(AppData);
};

/**
 * Get admin apps
 *
 * @returns {Promise<App[]>}
 */
export const getAdminApps = (): Promise<App[]> => {
  return Promise.resolve(AppData);
};

/**
 * Get admin app
 *
 * @returns {Promise<App | APIResponse>}
 */
export const getAdminApp = (app: App): Promise<App | APIResponse> => {
  return Promise.resolve(AppData.find(data => data.id === app.id) || NotFoundResponse);
};

/**
 * Create new admin app
 *
 * @returns {Promise<APIResponse>}
 */
export const createAdminApp = (app: App): Promise<APIResponse> => {
  return Promise.resolve({
    ...OkResponse,
    app,
  });
};

/**
 * Update an admin app
 *
 * @returns {Promise<APIResponse>}
 */
export const updateAdminApp = (app: App): Promise<APIResponse> => {
  return Promise.resolve({
    ...OkResponse,
    app,
  });
};

/**
 * Delete an admin app
 *
 * @returns {Promise<APIResponse>}
 */
export const deleteAdminApp = (app: App): Promise<APIResponse> => {
  return Promise.resolve(OkResponse);
};
