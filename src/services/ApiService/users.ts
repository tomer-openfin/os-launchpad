import { APIResponse, User } from '../../types/commons';
import API from './api';
import { createDeleteOptions, createGetOptions, createPostOptions, createPutOptions } from './requestOptions';

/**
 * Get admin users
 *
 * @returns {Promise<User[]>}
 */
export const getAdminUsers = (): Promise<User[]> => {
  const options = createGetOptions();

  return fetch(`${API.ADMIN_USERS}`, options)
    .then(resp => resp.json())
    .then(json => {
      if (!json) {
        throw new Error(`${API.ORG_SETTINGS} did not return a valid resource: ${json}`);
      }
      return json;
    });
};

/**
 * Get admin user
 *
 * @returns {Promise<User>}
 */
export const getAdminUser = (user: User): Promise<User> => {
  const options = createGetOptions();

  return fetch(`${API.ADMIN_USERS}/${user.username}`, options)
    .then(resp => resp.json())
    .then(json => {
      if (!json) {
        throw new Error(`${API.ORG_SETTINGS} did not return a valid resource: ${json}`);
      }
      return json;
    });
};

/**
 * Create new admin user
 *
 * @returns {Promise<APIResponse>}
 */
export const createAdminUser = (user: User): Promise<APIResponse> => {
  const options = createPostOptions(user);

  return fetch(`${API.ADMIN_USERS}`, options).then(resp => resp.json());
};

/**
 * Update an admin user
 *
 * @returns {Promise<APIResponse>}
 */
export const updateAdminUser = (user: User): Promise<APIResponse> => {
  const { email, ...restOfUser } = user;

  const options = createPutOptions(restOfUser);

  return fetch(`${API.ADMIN_USERS}/${user.username}`, options).then(resp => resp.json());
};

/**
 * Delete an admin user
 *
 * @returns {Promise<APIResponse>}
 */
export const deleteAdminUser = (user: User): Promise<APIResponse> => {
  const options = createDeleteOptions();

  return fetch(`${API.ADMIN_USERS}/${user.username}`, options).then(resp => resp.json());
};
