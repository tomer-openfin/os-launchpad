import { Layout } from 'openfin-layouts/dist/client/types';

import { defaultState, MeStateSettings } from '../../redux/me';

import { APIResponse } from '../../types/commons';
import { checkIsEnterprise } from '../../utils/checkIsEnterprise';
import { getLocalStorage, LOCAL_STORAGE_KEYS, setLocalStorage } from '../localStorageAdapter';
import API from './api';
import { createGetOptions, createPostOptions } from './requestOptions';

/**
 * Get layouts
 *
 * @returns {Promise<Layout[]>}
 */
export const getUserLayouts = (): Promise<Layout[]> => {
  // Disable enterprise check for demo
  // if (checkIsEnterprise()) {
  //   const options = createGetOptions();
  //   return fetch(API.LAYOUTS, options)
  //     .then(resp => resp.json())
  //     .then(resp => resp.map(r => r.layout) as Layout[]);
  // }

  return getLocalStorage<Layout[]>(LOCAL_STORAGE_KEYS.LAYOUTS, []);
};

/**
 * Save layouts
 *
 * @returns {Promise<APIResponse>}
 */
export const saveUserLayout = (layout: Layout): Promise<APIResponse> => {
  // Disable enterprise check for demo
  // if (checkIsEnterprise()) {
  //   const options = createPostOptions({ layout });
  //   return fetch(API.LAYOUTS, options).then(resp => resp.json());
  // }

  return setLocalStorage<Layout[]>(LOCAL_STORAGE_KEYS.LAYOUTS, [layout]);
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

  return getLocalStorage<MeStateSettings>(LOCAL_STORAGE_KEYS.SETTINGS, defaultState.settings);
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

  return setLocalStorage<MeStateSettings>(LOCAL_STORAGE_KEYS.SETTINGS, settings);
};
