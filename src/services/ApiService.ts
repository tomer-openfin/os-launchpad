import { Layout } from 'openfin-layouts/dist/client/types';

import { getIsEnterprise } from '../redux/application';
import { defaultState, MeStateSettings } from '../redux/me';
import { getLocalStorage, setLocalStorage } from './localStorageAdapter';

const API_URL = process.env.API_URL || 'http://localhost:9001/';
const APPS_URL = `${API_URL}api/apps`;
const LAYOUTS_URL = `${API_URL}api/layouts`;
const LOGIN_URL = `${API_URL}/login`;
const SETTINGS_URL = `${API_URL}api/settings`;

const LOCAL_STORAGE_KEYS = {
  APPS: 'apps',
  LAYOUTS: 'layouts',
  SETTINGS: 'settings',
};

const createGetOptions = (): RequestInit => ({
  headers: {
    'content-type': 'application/json',
  },
  method: 'GET',
  mode: 'cors',
});

const createPostOptions = (body): RequestInit => ({
  body: JSON.stringify(body),
  headers: {
    'content-type': 'application/json',
  },
  method: 'POST',
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
export const getApps = () => {
  if (checkIsEnterprise()) {
    const options = createGetOptions();
    return fetch(APPS_URL, options)
      .then(resp => resp.json())
      .then(resp => resp.apps as string[]);
  }

  return getLocalStorage<string[]>(LOCAL_STORAGE_KEYS.APPS, []);
};

/**
 * Save apps
 *
 * @returns {Promise<void>}
 */
export const saveApps = (apps: string[]) => {
  if (checkIsEnterprise()) {
    const options = createPostOptions({ apps });
    return fetch(APPS_URL, options).then(resp => resp.json());
  }

  return setLocalStorage<string[]>(LOCAL_STORAGE_KEYS.APPS, apps);
};

/**
 * Get layouts
 *
 * @returns {Promise<Layout[]>}
 */
export const getLayouts = () => {
  if (checkIsEnterprise()) {
    const options = createGetOptions();
    return fetch(LAYOUTS_URL, options)
      .then(resp => resp.json())
      .then(resp => resp.map(r => r.layout) as Layout[]);
  }

  return getLocalStorage<Layout[]>(LOCAL_STORAGE_KEYS.LAYOUTS, []);
};

/**
 * Save layouts
 *
 * @returns {Promise<void>}
 */
export const saveLayout = (layout: Layout) => {
  if (checkIsEnterprise()) {
    const options = createPostOptions({ layout });
    return fetch(LAYOUTS_URL, options).then(resp => resp.json());
  }

  return setLocalStorage<Layout[]>(LOCAL_STORAGE_KEYS.LAYOUTS, [layout]);
};

/**
 * Login
 *
 * @returns {Promise<>}
 */
export const login = payload => {
  if (checkIsEnterprise() && document.location && document.location.hostname.indexOf('local') === -1) {
    const options = createPostOptions(payload);

    return fetch(LOGIN_URL, options)
      .then(resp => resp.json())
      .then(resp => resp);
  }

  const { email, password } = payload;

  if (email === 'test@test.com' && password === 'test') {
    return Promise.resolve({ status: 'ok' });
  }

  return Promise.resolve({ status: 'authFailure' });
};

/**
 * Get settings
 *
 * @returns {Promise<MeStateSettings>}
 */
export const getSettings = () => {
  if (checkIsEnterprise()) {
    const options = createGetOptions();
    return fetch(SETTINGS_URL, options)
      .then(resp => resp.json())
      .then(resp => resp.settings as MeStateSettings);
  }

  return getLocalStorage<MeStateSettings>(LOCAL_STORAGE_KEYS.SETTINGS, defaultState.settings);
};

/**
 * Save settings
 *
 * @returns {Promise<void>}
 */
export const saveSettings = (settings: MeStateSettings) => {
  if (checkIsEnterprise()) {
    const options = createPostOptions({ settings });
    return fetch(SETTINGS_URL, options).then(resp => resp.json());
  }

  return setLocalStorage<MeStateSettings>(LOCAL_STORAGE_KEYS.SETTINGS, settings);
};

export default {
  getApps,
  getLayouts,
  getSettings,
  login,
  saveApps,
  saveLayout,
  saveSettings,
};
