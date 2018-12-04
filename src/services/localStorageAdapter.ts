import { APIResponse, ResponseStatus } from '../types/commons';

export const LOCAL_STORAGE_KEYS = {
  APPS: 'apps',
  LAYOUTS: 'layouts',
  SETTINGS: 'settings',
};

/**
 * Get data from specified localStorage key.
 *
 * @param key - localStorage key
 * @param defaultPayload - payload to be returned if get from localStorage is null
 *
 * @return {Promise<P>} - Returned Promise of specified type T in function call
 */
export function getLocalStorage<P>(key: string, defaultPayload: P): Promise<P> {
  const payload = localStorage.getItem(key);
  try {
    return Promise.resolve(payload === null ? defaultPayload : (JSON.parse(payload) as P));
  } catch (e) {
    /* tslint:disable-next-line:no-console */
    console.error('Failed to get local storage key:', key, '\n', 'Unable to parse payload:', payload, '\n', e);

    return Promise.resolve(defaultPayload);
  }
}

/**
 * Save payload under a specified key in localStorage.
 *
 * @param key - localStorage key
 * @param payload - payload to be stringified and stored in localStorage
 *
 * @return {Promise<>}
 */
export function setLocalStorage<P>(key: string, payload: P, resolvePayload: APIResponse = { status: ResponseStatus.SUCCESS }): Promise<APIResponse> {
  localStorage.setItem(key, JSON.stringify(payload));

  return Promise.resolve(resolvePayload);
}
