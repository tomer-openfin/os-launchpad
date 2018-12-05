import { defaultState, MeStateSettings } from '../../redux/me';

import { APIResponse, NewUserLayout, ResponseStatus, UserLayout } from '../../types/commons';
import { checkIsEnterprise } from '../../utils/checkIsEnterprise';
import { getLocalStorage, LOCAL_STORAGE_KEYS, setLocalStorage } from '../localStorageAdapter';
import API from './api';
import { createGetOptions, createPostOptions, createPutOptions } from './requestOptions';

/**
 * Get user layouts
 *
 * @returns {Promise<Layout[]>}
 */
export const getUserLayouts = (): Promise<UserLayout[]> => {
  if (checkIsEnterprise()) {
    const options = createGetOptions();

    return fetch(API.USER_LAYOUTS, options).then(resp => resp.json());
  }

  return getLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS, { status: ResponseStatus.SUCCESS, data: [] });
};

/**
 * Get user layout
 *
 * @returns {Promise<APIResponse>}
 */
export const getUserLayout = (id: UserLayout['id']): Promise<APIResponse> => {
  if (checkIsEnterprise()) {
    const options = createGetOptions();

    return fetch(`${API.USER_LAYOUTS}/${id}`, options).then(resp => resp.json());
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
    const options = createPostOptions(newUserLayout);

    return fetch(API.USER_LAYOUTS, options).then(resp => resp.json());
  }

  const localUserLayout: UserLayout = { ...newUserLayout, id: 'layout' };

  return setLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS, [localUserLayout]);
};

/**
 * Update user layout
 *
 * @returns {Promise<APIResponse>}
 */
export const updateUserLayout = (userLayout: UserLayout): Promise<APIResponse> => {
  if (checkIsEnterprise()) {
    const options = createPutOptions(userLayout);

    return fetch(`${API.USER_LAYOUTS}/${userLayout.id}`, options).then(resp => resp.json());
  }

  return setLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS, [userLayout]);
};

/**
 * Get settings
 *
 * @returns {Promise<MeStateSettings | APIResponse>}
 */
export const getUserSettings = (): Promise<MeStateSettings | APIResponse> => {
  if (checkIsEnterprise()) {
    const options = createGetOptions();

    return fetch(API.USER_SETTINGS, options).then(resp => resp.json());
  }

  return getLocalStorage(LOCAL_STORAGE_KEYS.SETTINGS, { data: defaultState.settings, status: ResponseStatus.SUCCESS });
};

/**
 * Save settings
 *
 * @returns {Promise<APIResponse>}
 */
export const saveUserSettings = (settings: MeStateSettings): Promise<APIResponse> => {
  if (checkIsEnterprise()) {
    const options = createPostOptions({ settings });

    return fetch(API.USER_SETTINGS, options).then(resp => resp.json());
  }

  return setLocalStorage(LOCAL_STORAGE_KEYS.SETTINGS, settings);
};
