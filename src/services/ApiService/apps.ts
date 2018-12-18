import { APIResponse, App } from '../../types/commons';
import { checkIsEnterprise } from '../../utils/checkIsEnterprise';
import API from './api';
import { createDeleteOptions, createGetOptions, createPostOptions, createPutOptions } from './requestOptions';

/**
 * Get apps
 *
 * @returns {Promise<App[] | APIResponse>}
 */
export const getDirectoryAppList = (): Promise<App[] | APIResponse> => {
  if (checkIsEnterprise()) {
    const options = createGetOptions();

    return fetch(`${API.USER_APPS}?scope=all`, options).then(resp => resp.json());
  }

  return fetch(API.PUBLIC_APPS).then(res => res.json());
};

/**
 * Get admin apps
 *
 * @returns {Promise<App[] | APIResponse>}
 */
export const getAdminApps = (): Promise<App[] | APIResponse> => {
  const options = createGetOptions();

  return fetch(`${API.USER_APPS}?scope=all`, options).then(resp => resp.json());
};

/**
 * Get admin app
 *
 * @returns {Promise<App | APIResponse>}
 */
export const getAdminApp = (app: App): Promise<App | APIResponse> => {
  const options = createGetOptions();

  return fetch(`${API.ADMIN_APPS}/${app.id}`, options).then(resp => resp.json());
};

/**
 * Create new admin app
 *
 * @returns {Promise<APIResponse>}
 */
export const createAdminApp = (app: App): Promise<APIResponse> => {
  const options = createPostOptions({ application: app });

  return fetch(`${API.ADMIN_APPS}`, options).then(resp => resp.json());
};

/**
 * Update an admin app
 *
 * @returns {Promise<APIResponse>}
 */
export const updateAdminApp = (app: App): Promise<APIResponse> => {
  const options = createPutOptions({ application: app });

  return fetch(`${API.ADMIN_APPS}/${app.id}`, options).then(resp => resp.json());
};

/**
 * Delete an admin app
 *
 * @returns {Promise<APIResponse>}
 */
export const deleteAdminApp = (app: App): Promise<APIResponse> => {
  const options = createDeleteOptions();

  return fetch(`${API.ADMIN_APPS}/${app.id}`, options).then(resp => resp.json());
};
