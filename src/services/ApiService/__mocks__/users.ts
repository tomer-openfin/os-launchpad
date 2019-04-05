import UsersData from '../../../samples/UserData';
import { ApiResponse, ApiResponseStatus, ApiSuccessResponse, User, UserStatus } from '../../../types/commons';
import { CreateAdminUser, DeleteAdminUser, GetAdminUser, GetAdminUsers, UpdateAdminUser } from '../users';
import { NotFoundResponse } from './utils/commons';

/**
 * Get admin users
 */
export const getAdminUsers: GetAdminUsers = () => {
  const response: ApiSuccessResponse<User[]> = { status: ApiResponseStatus.Success, data: UsersData };
  return Promise.resolve(response);
};

/**
 * Get admin user
 */
export const getAdminUser: GetAdminUser = user => {
  const userDatum = UsersData.find(data => data.username === user.username);
  const response: ApiResponse<User> = userDatum
    ? { status: ApiResponseStatus.Success, data: userDatum }
    : { status: ApiResponseStatus.Failure, message: NotFoundResponse.status };
  return Promise.resolve(response);
};

/**
 * Create new admin user
 */
export const createAdminUser: CreateAdminUser = user => {
  const response: ApiSuccessResponse<User> = {
    data: {
      ...user,
      created: '2018-12-26T18:51:58.567Z',
      enabled: true,
      isAdmin: false,
      lastModified: '2018-12-26T18:51:58.567Z',
      status: UserStatus.ChangePassword,
    },
    status: ApiResponseStatus.Success,
  };
  return Promise.resolve(response);
};

/**
 * Update an admin user
 */
export const updateAdminUser: UpdateAdminUser = user => {
  const response: ApiSuccessResponse<User> = {
    data: {
      ...user,
      created: '2018-12-26T18:51:58.567Z',
      enabled: true,
      isAdmin: false,
      lastModified: '2018-12-26T18:51:58.567Z',
      status: UserStatus.ChangePassword,
    },
    status: ApiResponseStatus.Success,
  };
  return Promise.resolve(response);
};

/**
 * Delete an admin user
 */
export const deleteAdminUser: DeleteAdminUser = user => {
  const response: ApiSuccessResponse<undefined> = { status: ApiResponseStatus.Success, data: undefined };
  return Promise.resolve(response);
};
