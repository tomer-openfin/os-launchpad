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
 * @return {Promise<APIResponse>} - Returned Promise of specified type T in function call
 */
export function getLocalStorage(key: string, defaultPayload: APIResponse = { status: ResponseStatus.FAILURE }): Promise<APIResponse> {
  const item = localStorage.getItem(key);

  const payload = item === null ? defaultPayload : { data: JSON.parse(item), status: ResponseStatus.SUCCESS };
  try {
    return Promise.resolve();
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
export function setLocalStorage(key: string, payload: APIResponse, resolvePayload: APIResponse = { status: ResponseStatus.SUCCESS }): Promise<APIResponse> {
  localStorage.setItem(key, JSON.stringify(payload));

  return Promise.resolve(resolvePayload);
}
