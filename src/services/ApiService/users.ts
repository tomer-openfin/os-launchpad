import { HTTPMethods, User } from '../../types/commons';

import API from './api';
import { api } from './utils';

/**
 * Get admin users
 */
export const getAdminUsers = api<User[]>(API.ADMIN_USERS, HTTPMethods.GET, json => ({ data: json || [] }));
export type GetAdminUsers = typeof getAdminUsers;

/**
 * Get admin user
 */
export const getAdminUser = (user: User) => api<User>(`${API.ADMIN_USERS}/${user.username}`, HTTPMethods.GET, json => ({ data: json.user }))();
export type GetAdminUser = typeof getAdminUser;

/**
 * Create new admin user
 */
export const createAdminUser = api<User, User>(API.ADMIN_USERS, HTTPMethods.POST, json => ({ data: json.user }));
export type CreateAdminUser = typeof createAdminUser;

/**
 * Update an admin user
 */
export const updateAdminUser = (user: User) => {
  const { email, ...restOfUser } = user;
  return api<User, Pick<User, Exclude<keyof User, 'email'>>>(`${API.ADMIN_USERS}/${user.username}`, HTTPMethods.PUT, json => ({ data: json.user }))(restOfUser);
};
export type UpdateAdminUser = typeof updateAdminUser;

/**
 * Delete an admin user
 */
export const deleteAdminUser = (user: User) => api<undefined>(`${API.ADMIN_USERS}/${user.username}`, HTTPMethods.DELETE, _ => ({ data: undefined }))();
export type DeleteAdminUser = typeof deleteAdminUser;
