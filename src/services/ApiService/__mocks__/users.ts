import UsersData from '../../../samples/UserData';
import { APIResponse, User, UserStatus } from '../../../types/commons';
import { NotFoundResponse, OkResponse } from './utils/commons';

/**
 * Get admin users
 *
 * @returns {Promise<User[]>}
 */
export const getAdminUsers = (): Promise<User[]> => {
  return Promise.resolve(UsersData);
};

/**
 * Get admin user
 *
 * @returns {Promise<User>}
 */
export const getAdminUser = (user: User): Promise<User | APIResponse> => {
  return Promise.resolve(UsersData.find(data => data.username === user.username) || NotFoundResponse);
};

/**
 * Create new admin user
 *
 * @returns {Promise<APIResponse>}
 */
export const createAdminUser = (user: User): Promise<APIResponse> => {
  return Promise.resolve({
    ...OkResponse,
    user: {
      ...user,
      created: '2018-12-26T18:51:58.567Z',
      enabled: true,
      isAdmin: false,
      lastModified: '2018-12-26T18:51:58.567Z',
      status: UserStatus.ChangePassword,
    },
  });
};

/**
 * Update an admin user
 *
 * @returns {Promise<APIResponse>}
 */
export const updateAdminUser = (user: User): Promise<APIResponse> => {
  return Promise.resolve({
    ...OkResponse,
    user: {
      ...user,
      created: '2018-12-26T18:51:58.567Z',
      enabled: true,
      isAdmin: false,
      lastModified: '2018-12-26T18:51:58.567Z',
      status: UserStatus.ChangePassword,
    },
  });
};

/**
 * Delete an admin user
 *
 * @returns {Promise<APIResponse>}
 */
export const deleteAdminUser = (user: User): Promise<APIResponse> => {
  return Promise.resolve(OkResponse);
};
