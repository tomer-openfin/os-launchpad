import { APIResponse, HTTPMethods, User } from '../../types/commons';

import API from './api';
import fetchJSON from './fetchJSON';

/**
 * Get admin users
 *
 * @returns {Promise<User[]>}
 */
export const getAdminUsers = (): Promise<User[]> => fetchJSON(`${API.ADMIN_USERS}`, HTTPMethods.GET);

/**
 * Get admin user
 *
 * @returns {Promise<User>}
 */
export const getAdminUser = (user: User): Promise<User> => fetchJSON(`${API.ADMIN_USERS}/${user.username}`, HTTPMethods.GET);

/**
 * Create new admin user
 *
 * @returns {Promise<APIResponse>}
 */
export const createAdminUser = (user: User): Promise<APIResponse> => fetchJSON(`${API.ADMIN_USERS}`, HTTPMethods.POST, user);

/**
 * Update an admin user
 *
 * @returns {Promise<APIResponse>}
 */
export const updateAdminUser = (user: User): Promise<APIResponse> => {
  const { email, ...restOfUser } = user;

  return fetchJSON(`${API.ADMIN_USERS}/${user.username}`, HTTPMethods.PUT, restOfUser);
};

/**
 * Delete an admin user
 *
 * @returns {Promise<APIResponse>}
 */
export const deleteAdminUser = (user: User): Promise<APIResponse> => fetchJSON(`${API.ADMIN_USERS}/${user.username}`, HTTPMethods.DELETE);
