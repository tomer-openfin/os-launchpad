import { Layout } from 'openfin-layouts/dist/client/types';

import * as logoIcon from '../assets/Logo.svg';

import AppData from '../const/AppData';

import { getIsEnterprise } from '../redux/application';
import { defaultState, MeStateSettings } from '../redux/me';
import { OrganizationState } from '../redux/organization/types';
import { App, CreateAppResponse, DeleteAppResponse, Theme, UpdateAppResponse, User } from '../types/commons';
import DEFAULT_THEMES from '../utils/defaultThemes';
import { getLocalStorage, setLocalStorage } from './localStorageAdapter';

const API_URL = process.env.API_URL || '/';

const PUBLIC_APPS_URL = 'https://app-directory.openfin.co/api/v1/apps';

const APPS_URL = `${API_URL}api/apps`;
const LAYOUTS_URL = `${API_URL}api/layouts`;
const LOGIN_URL = `${API_URL}api/auth/login`;
const SETTINGS_URL = `${API_URL}api/user/settings`;
const THEMES_URL = `${API_URL}api/themes`;

const ADMIN_APPS_URL = `${API_URL}api/admin/apps`;
const ADMIN_USERS_URL = `${API_URL}api/admin/users`;

const LOCAL_STORAGE_KEYS = {
  APPS: 'apps',
  LAYOUTS: 'layouts',
  SETTINGS: 'settings',
};

// API constants
export const FILE_ACCEPT = 'image/*';
export const RESPONSE_OK = 'ok';
export const RESPONSE_FAILURE = 'failure';

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

const createPutOptions = (body): RequestInit => ({
  body: JSON.stringify(body),
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  method: 'PUT',
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
 * @returns {Promise<App[]>}
 */
const getDirectoryAppList = (): Promise<App[]> => {
  // if (checkIsEnterprise()) {
  //   const options = createGetOptions();
  //   return fetch(APPS_URL, options).then(resp => resp.json());
  // }

  return fetch(PUBLIC_APPS_URL).then(res => res.json());
};

/**
 * Get admin apps
 *
 * @returns {Promise<App[]>}
 */
const getAdminApps = (): Promise<App[]> => {
  // const options = createGetOptions();
  // return fetch(`${ADMIN_APPS_URL}`, options).then(resp => resp.json());

  return Promise.resolve(AppData);
};

/**
 * Get admin users
 *
 * @returns {Promise<User[]>}
 */
const getAdminUsers = (): Promise<User[]> => {
  const options = createGetOptions();

  return fetch(`${ADMIN_USERS_URL}`, options).then(resp => resp.json());
};

/**
 * Get admin user
 *
 * @returns {Promise<User>}
 */
const getAdminUser = (user: User): Promise<User> => {
  const options = createGetOptions();

  return fetch(`${ADMIN_USERS_URL}/${user.username}`, options).then(resp => resp.json());
};

/**
 * Create new admin user
 *
 * @returns {Promise<User>}
 */
const createAdminUser = (user: User): Promise<User> => {
  const options = createPostOptions(user);

  return fetch(`${ADMIN_USERS_URL}/${user.username}`, options).then(resp => resp.json());
};

/**
 * Update an admin user
 *
 * @returns {Promise<User>}
 */
const updateAdminUser = (user: User): Promise<User> => {
  const options = createPutOptions(user);

  return fetch(`${ADMIN_USERS_URL}/${user.username}`, options).then(resp => resp.json());
};

/**
 * Delete an admin user
 *
 * @returns {Promise<User>}
 */
const deleteAdminUser = (user: User): Promise<User> => {
  const options = createDeleteOptions();

  return fetch(`${ADMIN_USERS_URL}/${user.username}`, options).then(resp => resp.json());
};

/**
 * Delete apps
 *
 * @returns {Promise<DeleteAppResponse>}
 */
const deleteAdminApp = (appId: string) => {
  const options = createDeleteOptions();

  return fetch(`${ADMIN_APPS_URL}/${appId}`, options).then(resp => (resp.json() as unknown) as DeleteAppResponse);
};

/**
 * Create new apps
 *
 * @returns {Promise<CreateAppResponse>}
 */
export const createApp = app => {
  const options = createPostOptions({ app });

  return fetch(`${APPS_URL}`, options).then(resp => (resp.json() as unknown) as CreateAppResponse);
};

/**
 * Update apps
 *
 * @returns {Promise<UpdateAppResponse>}
 */
export const updateApp = app => {
  const options = createPutOptions({ app });

  return fetch(`${APPS_URL}/${app.id}`, options).then(resp => (resp.json() as unknown) as UpdateAppResponse);
};

/**
 * Get layouts
 *
 * @returns {Promise<Layout[]>}
 */
const getUserLayouts = (): Promise<Layout[]> => {
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
const saveUserLayout = (layout: Layout) => {
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
const login = payload => {
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
const getUserSettings = (): Promise<MeStateSettings> => {
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
const saveUserSettings = (settings: MeStateSettings) => {
  if (checkIsEnterprise()) {
    const options = createPostOptions({ settings });
    return fetch(SETTINGS_URL, options).then(resp => resp.json());
  }

  return setLocalStorage<MeStateSettings>(LOCAL_STORAGE_KEYS.SETTINGS, settings);
};

const getAdminOrganizationSettings = (): Promise<OrganizationState> => {
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
const getAdminThemes = (): Promise<Theme[]> => {
  return Promise.resolve(DEFAULT_THEMES);
  // const options = createGetOptions();
  // return fetch(THEMES_URL, options)
  //   .then(resp => resp.json())
  //   .then(resp => resp.themes as Theme[]);
};

const saveAdminTheme = (theme: Theme) => {
  // tslint:disable-next-line:no-console
  console.log('Saving organization theme as:', theme);
  return Promise.resolve();
};

const saveAdminLogo = (file: File) => {
  // tslint:disable-next-line:no-console
  console.log('Saving organization logo file:', file);
  const newFileUrl = URL.createObjectURL(file);
  return Promise.resolve(newFileUrl);
};

export const saveAppLogo = (file: File) => {
  // tslint:disable-next-line:no-console
  console.log('Saving new app logo file:', file);
  const newFileUrl = URL.createObjectURL(file);
  return Promise.resolve(newFileUrl);
};

// pass statusCode of '400' to simulate failure response
// todo: type interfaces for these paramaters & create consts for various methods/statuscodes
const defaultEndpoint = `${process.env.MOCK_POSTMAN_URI}/api/admin/users`;

const tempFetch = (endpoint = defaultEndpoint, method, payload, statusCode = '200') => {
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
  createAdminUser,
  deleteAdminApp,
  deleteAdminUser,
  getAdminApps,
  getAdminOrganizationSettings,
  getAdminThemes,
  getAdminUser,
  getAdminUsers,
  getDirectoryAppList,
  getUserLayouts,
  getUserSettings,
  login,
  saveAdminLogo,
  saveAdminTheme,
  saveUserLayout,
  saveUserSettings,
  tempFetch,
  updateAdminUser,
};
