import { MeSettingsState, UpdatePasswordRequestPayload } from '../../redux/me';

import { APIResponse, HTTPMethods, NewUserLayout, ResponseStatus, User, UserLayout } from '../../types/commons';

import { checkIsEnterprise } from '../../utils/checkIsEnterprise';
import { uuidv4 } from '../../utils/createUuid';

import { deleteLocalStorageItem, getLocalStorage, LOCAL_STORAGE_KEYS, setItemInLocalStorage, setLocalStorage, SUCCESS_RESPONSE } from '../localStorageAdapter';

import API from './api';
import fetchJSON from './fetchJSON';

/**
 * Get user info
 *
 * @returns {Promise<User>}
 */
export const getUserInfo = (): Promise<User> => fetchJSON(API.USER_INFO, HTTPMethods.GET);

/**
 * Get user layouts
 *
 * @returns {Promise<Layout[]>}
 */
export const getUserLayouts = (): Promise<UserLayout[]> => {
  if (checkIsEnterprise()) {
    return fetchJSON(API.USER_LAYOUTS, HTTPMethods.GET);
  }

  return getLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS);
};

/**
 * Get user layout
 *
 * @returns {Promise<APIResponse>}
 */
export const getUserLayout = (id: UserLayout['id']): Promise<APIResponse> => {
  if (checkIsEnterprise()) {
    return fetchJSON(`${API.USER_LAYOUTS}/${id}`, HTTPMethods.GET);
  }

  return getLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS);
};

/**
 * Create user layout
 *
 * @returns {Promise<APIResponse>}
 */
export const createUserLayout = (newUserLayout: NewUserLayout): Promise<APIResponse> => {
  if (checkIsEnterprise()) {
    return fetchJSON(API.USER_LAYOUTS, HTTPMethods.POST, newUserLayout);
  }

  const localUserLayout: UserLayout = { ...newUserLayout, id: uuidv4() };

  return setItemInLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS, localUserLayout, localUserLayout.id).then(response =>
    response.status === ResponseStatus.FAILURE ? response : { ...SUCCESS_RESPONSE, layout: response },
  );
};

/**
 * Delete user layout
 *
 * @returns {Promise<APIResponse>}
 */
export const deleteUserLayout = (id: UserLayout['id']): Promise<APIResponse> => {
  if (checkIsEnterprise()) {
    return fetchJSON(`${API.USER_LAYOUTS}/${id}`, HTTPMethods.DELETE);
  }

  return deleteLocalStorageItem(LOCAL_STORAGE_KEYS.LAYOUTS, id);
};

/**
 * Update user layout
 *
 * @returns {Promise<APIResponse>}
 */
export const updateUserLayout = (userLayout: UserLayout): Promise<APIResponse> => {
  if (checkIsEnterprise()) {
    return fetchJSON(`${API.USER_LAYOUTS}/${userLayout.id}`, HTTPMethods.PUT, userLayout);
  }

  return setItemInLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS, userLayout, userLayout.id).then(response =>
    response.status === ResponseStatus.FAILURE ? response : { ...SUCCESS_RESPONSE, layout: response },
  );
};

/**
 * Get settings
 *
 * @returns {Promise<MeSettingsState | APIResponse>}
 */
export const getUserSettings = (): Promise<MeSettingsState | APIResponse> => {
  if (checkIsEnterprise()) {
    return fetchJSON(API.USER_SETTINGS, HTTPMethods.GET);
  }

  return getLocalStorage(LOCAL_STORAGE_KEYS.SETTINGS);
};

/**
 * Save settings
 *
 * @returns {Promise<APIResponse>}
 */
export const saveUserSettings = (settings: MeSettingsState): Promise<APIResponse> => {
  if (checkIsEnterprise()) {
    return fetchJSON(API.USER_SETTINGS, HTTPMethods.POST, { settings });
  }

  return setLocalStorage(LOCAL_STORAGE_KEYS.SETTINGS, settings);
};

/**
 * Update user password
 *
 * @returns {Promise<APIResponse>}
 */
export const updateUserPassword = (payload: UpdatePasswordRequestPayload): Promise<APIResponse> => {
  return fetchJSON(API.UPDATE_PASSWORD, HTTPMethods.POST, payload);
};
