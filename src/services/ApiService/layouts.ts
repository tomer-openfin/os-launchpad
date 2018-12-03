import { Layout } from 'openfin-layouts/dist/client/types';
// import { checkIsEnterprise } from '../../utils/checkIsEnterprise';
import { getLocalStorage, setLocalStorage } from '../localStorageAdapter';
// import API from './api';
// import { createGetOptions, createPostOptions } from './requestOptions';

const LOCAL_STORAGE_KEYS = {
  APPS: 'apps',
  LAYOUTS: 'layouts',
  SETTINGS: 'settings',
};

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
 * @returns {Promise<void>}
 */
export const saveUserLayout = (layout: Layout) => {
  // Disable enterprise check for demo
  // if (checkIsEnterprise()) {
  //   const options = createPostOptions({ layout });
  //   return fetch(API.LAYOUTS, options).then(resp => resp.json());
  // }

  return setLocalStorage<Layout[]>(LOCAL_STORAGE_KEYS.LAYOUTS, [layout]);
};
