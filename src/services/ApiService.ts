import { Layout } from 'openfin-layouts/dist/client/types';

import * as logoIcon from '../assets/Logo.svg';

import { getIsEnterprise } from '../redux/application';
import { defaultState, MeStateSettings } from '../redux/me';
import { OrganizationState } from '../redux/organization/types';
import { App, DeleteAppResponse, Theme } from '../types/commons';
import DEFAULT_THEMES from '../utils/defaultThemes';
import { getLocalStorage, setLocalStorage } from './localStorageAdapter';

const API_URL = process.env.API_URL || '/';

const APPS_URL = `${API_URL}api/apps`;
const LAYOUTS_URL = `${API_URL}api/layouts`;
const LOGIN_URL = `${API_URL}api/auth/login`;
const SETTINGS_URL = `${API_URL}api/user/settings`;
const THEMES_URL = `${API_URL}api/themes`;

const PUBLIC_APPS_URL = 'https://app-directory.openfin.co/api/v1/apps';

const LOCAL_STORAGE_KEYS = {
  APPS: 'apps',
  LAYOUTS: 'layouts',
  SETTINGS: 'settings',
};

const createGetOptions = (): RequestInit => ({
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  method: 'GET',
  mode: 'cors',
});

const createPostOptions = (body): RequestInit => ({
  body: JSON.stringify(body),
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  method: 'POST',
  mode: 'cors',
});

const createDeleteOptions = (): RequestInit => ({
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  method: 'DELETE',
  mode: 'cors',
});

export const checkIsEnterprise = () => {
  const store = window.opener ? window.opener.store : window.store;
  const state = store.getState();
  return getIsEnterprise(state);
};

/**
 * Get apps
 *
 * @returns {Promise<string[]>}
 */
export const getDirectoryAppList = (): Promise<App[]> => {
  // if (checkIsEnterprise()) {
  //   const options = createGetOptions();
  //   return fetch(APPS_URL, options).then(resp => resp.json());
  // }

  return fetch(PUBLIC_APPS_URL).then(res => res.json());
};

/**
 * Delete apps
 *
 * @returns {Promise<DeleteAppResponse>}
 */
export const deleteApp = (appId: string) => {
  const options = createDeleteOptions();

  return fetch(`${APPS_URL}/${appId}`, options).then(resp => (resp.json() as unknown) as DeleteAppResponse);
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
  //   return fetch(LAYOUTS_URL, options)
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
  //   return fetch(LAYOUTS_URL, options).then(resp => resp.json());
  // }

  return setLocalStorage<Layout[]>(LOCAL_STORAGE_KEYS.LAYOUTS, [layout]);
};

/**
 * Login
 *
 * @returns {Promise<>}
 */
export const login = payload => {
  const options = createPostOptions(payload);

  return fetch(LOGIN_URL, options)
    .then(resp => resp.json())
    .then(resp => resp);
};

/**
 * Get settings
 *
 * @returns {Promise<MeStateSettings>}
 */
export const getUserSettings = (): Promise<MeStateSettings> => {
  if (checkIsEnterprise()) {
    const options = createGetOptions();

    return fetch(SETTINGS_URL, options).then(resp => resp.json());
  }

  return getLocalStorage<MeStateSettings>(LOCAL_STORAGE_KEYS.SETTINGS, defaultState.settings);
};

/**
 * Save settings
 *
 * @returns {Promise<void>}
 */
export const saveUserSettings = (settings: MeStateSettings) => {
  if (checkIsEnterprise()) {
    const options = createPostOptions({ settings });
    return fetch(SETTINGS_URL, options).then(resp => resp.json());
  }

  return setLocalStorage<MeStateSettings>(LOCAL_STORAGE_KEYS.SETTINGS, settings);
};

export const getOrganizationSettings = (): Promise<OrganizationState> => {
  return Promise.resolve({
    logo: logoIcon,
    theme: DEFAULT_THEMES[0],
  });
};

/**
 * Get themes
 *
 * @returns {Promise<Theme[]>}
 */
export const getThemes = (): Promise<Theme[]> => {
  return Promise.resolve(DEFAULT_THEMES);
  // const options = createGetOptions();
  // return fetch(THEMES_URL, options)
  //   .then(resp => resp.json())
  //   .then(resp => resp.themes as Theme[]);
};

export const saveTheme = (theme: Theme) => {
  // tslint:disable-next-line:no-console
  console.log('Saving organization theme as:', theme);
  return Promise.resolve();
};

export const saveLogo = (file: File) => {
  // tslint:disable-next-line:no-console
  console.log('Saving organization logo file:', file);
  const newFileUrl = URL.createObjectURL(file);
  return Promise.resolve(newFileUrl);
};

// pass statusCode of '400' to simulate failure response
// todo: type interfaces for these paramaters & create consts for various methods/statuscodes
const defaultEndpoint = `${process.env.MOCK_POSTMAN_URI}/api/admin/users`;

export const tempFetch = (endpoint = defaultEndpoint, method, payload, statusCode = '200') => {
  return fetch(endpoint, {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'x-api-key': `${process.env.POSTMAN_API_KEY}`,
      'x-mock-response-code': `${statusCode}`, // postman specific
    },
    method,
  }).then(response => response.json());
};

export default {
  getDirectoryAppList,
  getUserLayouts,
  getUserSettings,
  login,
  saveUserLayout,
  saveUserSettings,
  tempFetch,
};
