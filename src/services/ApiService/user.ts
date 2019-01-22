import { defaultState, MeSettingsState } from '../../redux/me';

import { APIResponse, NewUserLayout, ResponseStatus, UserLayout } from '../../types/commons';
import { checkIsEnterprise } from '../../utils/checkIsEnterprise';
import { uuidv4 } from '../../utils/createUuid';
import { deleteLocalStorageItem, getLocalStorage, LOCAL_STORAGE_KEYS, setItemInLocalStorage, setLocalStorage } from '../localStorageAdapter';
import API from './api';
import { createDeleteOptions, createGetOptions, createPostOptions, createPutOptions } from './requestOptions';

/**
 * Get user layouts
 *
 * @returns {Promise<Layout[]>}
 */
export const getUserLayouts = (): Promise<UserLayout[]> => {
  if (checkIsEnterprise()) {
    const options = createGetOptions();

    return fetch(API.USER_LAYOUTS, options)
      .then(resp => resp.json())
      .then(json => {
        if (!json) {
          throw new Error(`${API.ORG_SETTINGS} did not return a valid resource: ${json}`);
        }
        return json;
      });
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

    return fetch(`${API.USER_LAYOUTS}/${id}`, options)
      .then(resp => resp.json())
      .then(json => {
        if (!json) {
          throw new Error(`${API.ORG_SETTINGS} did not return a valid resource: ${json}`);
        }
        return json;
      });
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

  const localUserLayout: UserLayout = { ...newUserLayout, id: uuidv4() };

  // return setLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS, [localUserLayout], { status: ResponseStatus.SUCCESS, layout: localUserLayout });
  return setItemInLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS, localUserLayout, { status: ResponseStatus.SUCCESS, layout: localUserLayout }, localUserLayout.id);
};

/**
 * Delete user layout
 *
 * @returns {Promise<APIResponse>}
 */
export const deleteUserLayout = (id: UserLayout['id']): Promise<APIResponse> => {
  if (checkIsEnterprise()) {
    const options = createDeleteOptions();

    return fetch(`${API.USER_LAYOUTS}/${id}`, options).then(resp => resp.json());
  }

  return deleteLocalStorageItem(LOCAL_STORAGE_KEYS.LAYOUTS, { status: ResponseStatus.SUCCESS }, id);
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
 * @returns {Promise<MeSettingsState | APIResponse>}
 */
export const getUserSettings = (): Promise<MeSettingsState | APIResponse> => {
  if (checkIsEnterprise()) {
    const options = createGetOptions();

    return fetch(API.USER_SETTINGS, options)
      .then(resp => resp.json())
      .then(json => {
        if (!json) {
          throw new Error(`${API.ORG_SETTINGS} did not return a valid resource: ${json}`);
        }
        return json;
      });
  }

  return getLocalStorage(LOCAL_STORAGE_KEYS.SETTINGS, { data: defaultState.settings, status: ResponseStatus.SUCCESS });
};

/**
 * Save settings
 *
 * @returns {Promise<APIResponse>}
 */
export const saveUserSettings = (settings: MeSettingsState): Promise<APIResponse> => {
  if (checkIsEnterprise()) {
    const options = createPostOptions({ settings });

    return fetch(API.USER_SETTINGS, options).then(resp => resp.json());
  }

  return setLocalStorage(LOCAL_STORAGE_KEYS.SETTINGS, settings);
};
