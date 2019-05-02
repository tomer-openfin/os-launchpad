import { MeSettingsState } from '../../../redux/me';
import { exampleUserLayout } from '../../../samples/LayoutData';
import { ApiResponse, ApiResponseStatus, ApiSuccessResponse, DirectionalPosition, LauncherSize, User, UserLayout } from '../../../types/commons';
import {
  CreateUserLayout,
  DeleteUserLayout,
  GetUserInfo,
  GetUserLayout,
  GetUserLayouts,
  GetUserSettings,
  SaveUserSettings,
  UpdateUserLayout,
  UpdateUserPassword,
} from '../user';
import { MockUser } from './auth';
import { NotFoundResponse } from './utils/commons';

export const MockUserSettings = {
  appIds: ['trumid', 'neptune', 'greenkey', '3', '2', '5', '6'],
  launcherMonitorId: null,
  launcherMonitorReferencePoint: { x: 0, y: 0 },
  launcherPosition: DirectionalPosition.Top,
  launcherSize: LauncherSize.Large,
};

/**
 * Get user info
 */
export const getUserInfo: GetUserInfo = () => {
  const response: ApiSuccessResponse<User> = {
    data: { ...MockUser, id: MockUser.email, username: MockUser.email, phone: '+15555555555' },
    status: ApiResponseStatus.Success,
  };
  return Promise.resolve(response);
};

/**
 * Get user layouts
 */
export const getUserLayouts: GetUserLayouts = () => {
  const response: ApiSuccessResponse<UserLayout[]> = { status: ApiResponseStatus.Success, data: [exampleUserLayout] };
  return Promise.resolve(response);
};

/**
 * Get user layout
 */
export const getUserLayout: GetUserLayout = id => {
  const isLayoutFound = exampleUserLayout.id === id;
  const response: ApiResponse<UserLayout> = isLayoutFound
    ? { status: ApiResponseStatus.Success, data: exampleUserLayout }
    : { status: ApiResponseStatus.Failure, message: NotFoundResponse.status };
  return Promise.resolve(response);
};

/**
 * Create user layout
 */
export const createUserLayout: CreateUserLayout = newUserLayout => {
  const response: ApiResponse<UserLayout> = { status: ApiResponseStatus.Success, data: { ...newUserLayout, id: 'layout' } };
  return Promise.resolve(response);
};

/**
 * Update user layout
 */
export const updateUserLayout: UpdateUserLayout = userLayout => {
  const response: ApiResponse<UserLayout> = { status: ApiResponseStatus.Success, data: userLayout };
  return Promise.resolve(response);
};

/**
 * Delete user layout
 */
export const deleteUserLayout: DeleteUserLayout = id => {
  const response: ApiResponse<undefined> = { status: ApiResponseStatus.Success, data: undefined };
  return Promise.resolve(response);
};

/**
 * Get settings
 */
export const getUserSettings: GetUserSettings = () => {
  const response: ApiResponse<MeSettingsState> = { status: ApiResponseStatus.Success, data: MockUserSettings };
  return Promise.resolve(response);
};

/**
 * Save settings
 */
export const saveUserSettings: SaveUserSettings = settings => {
  const response: ApiResponse<undefined> = { status: ApiResponseStatus.Success, data: undefined };
  return Promise.resolve(response);
};

/**
 * Update settings
 */
export const updateUserPassword: UpdateUserPassword = payload => {
  const response: ApiResponse<undefined> = { status: ApiResponseStatus.Success, data: undefined };
  return Promise.resolve(response);
};
