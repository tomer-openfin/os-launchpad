import { MeSettingsState } from '../../../redux/me/index';
import { exampleUserLayout } from '../../../samples/LayoutData';
import { APIResponse, DirectionalPosition, NewUserLayout, UserLayout } from '../../../types/commons';
import { NotFoundResponse, OkResponse } from './utils/commons';

export const MockUserSettings = {
  appIds: ['trumid', 'neptune', 'greenkey', '3', '2', '5', '6'],
  autoHide: false,
  launcherPosition: DirectionalPosition.Top,
};

/**
 * Get user layouts
 *
 * @returns {Promise<Layout[]>}
 */
export const getUserLayouts = (): Promise<UserLayout[]> => {
  return Promise.resolve([exampleUserLayout]);
};

/**
 * Get user layout
 *
 * @returns {Promise<APIResponse>}
 */
export const getUserLayout = (id: UserLayout['id']): Promise<APIResponse> => {
  return Promise.resolve(exampleUserLayout.id === id ? exampleUserLayout : NotFoundResponse);
};

/**
 * Create user layout
 *
 * @returns {Promise<APIResponse>}
 */
export const createUserLayout = (newUserLayout: NewUserLayout): Promise<APIResponse> => {
  return Promise.resolve({ ...OkResponse, layout: { ...newUserLayout, id: 'layout' } });
};

/**
 * Update user layout
 *
 * @returns {Promise<APIResponse>}
 */
export const updateUserLayout = (userLayout: UserLayout): Promise<APIResponse> => {
  return Promise.resolve({ ...OkResponse, layout: userLayout });
};

/**
 * Get settings
 *
 * @returns {Promise<MeSettingsState | APIResponse>}
 */
export const getUserSettings = (): Promise<MeSettingsState | APIResponse> => {
  return Promise.resolve(MockUserSettings);
};

/**
 * Save settings
 *
 * @returns {Promise<APIResponse>}
 */
export const saveUserSettings = (settings: MeSettingsState): Promise<APIResponse> => {
  return Promise.resolve(OkResponse);
};
