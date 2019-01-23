/* tslint:disable:no-console */
import { APIResponse, ResponseStatus } from '../types/commons';

export const LOCAL_STORAGE_KEYS = {
  APPS: 'apps',
  LAYOUTS: 'layouts',
  SETTINGS: 'settings',
};

export const ERROR_RESPONSE = { status: ResponseStatus.FAILURE };
export const SUCCESS_RESPONSE = { status: ResponseStatus.SUCCESS };

/**
 * Get data from specified localStorage key.
 *
 * @param key - localStorage key
 *
 * @return {Promise<APIResponse>} - Returned Promise of specified type T in function call
 */
export function getLocalStorage(key: string): APIResponse {
  const item = localStorage.getItem(key);

  try {
    return Promise.resolve(JSON.parse(item!));
  } catch (e) {
    console.error('Failed to get local storage key:', key, '\n', 'Unable to parse local storage item:', item, '\n', 'Error:', e, '\n');

    return Promise.resolve(ERROR_RESPONSE);
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
export function setLocalStorage(key: string, payload): Promise<APIResponse> {
  try {
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (e) {
    console.error('Failed to set local storage key:', key, '\n', 'With payload:', payload, '\n', 'Error:', e, '\n');

    return Promise.resolve(ERROR_RESPONSE);
  }

  return Promise.resolve(SUCCESS_RESPONSE);
}

/**
 * Set a new item under a specified key in localStorage.
 *
 * @param key - localStorage key
 * @param payload - API response
 * @param id - localStorage item reference id
 *
 * @return {Promise<ApiResponse>}
 */
export function setItemInLocalStorage(
  key: string,
  payload: APIResponse,
  id?: string,
): Promise<APIResponse> {
  const item = localStorage.getItem(key);

  try {
    // set the first item
    if (!item) {
      localStorage.setItem(key, JSON.stringify([ payload ]));

      return Promise.resolve(SUCCESS_RESPONSE);
    }

    // add additional items
    const storage = JSON.parse(item);
    let itemsArray;

    if (Array.isArray(storage)) {
      itemsArray = [];
    }

    const index = itemsArray.findIndex(x => x.id === id);

    if (index === -1) {
      itemsArray.push(payload);

      localStorage.setItem(key, JSON.stringify(itemsArray));
    }
  } catch (e) {
    console.error('Failed to set local storage key:', key, '\n', 'With payload:', payload, '\n', 'At id:', id, '\n', 'Error:', e, '\n');

    Promise.resolve(ERROR_RESPONSE);
  }

  return Promise.resolve(payload);
}

/**
 * Delete payload under a specified key and id in localStorage.
 *
 * @param key - localStorage key
 * @param id - localStorage item reference id
 *
 * @return {Promise<APIResponse>}
 */
export function deleteLocalStorageItem(key: string, id: string): Promise<APIResponse> {
  const item = localStorage.getItem(key);

  try {
    let updatedItems;

    const storage = JSON.parse(item!);
    const itemsArray = storage;

    // If what is in storage is not an array, set it to an empty array and return success
    if (Array.isArray(storage)) {
      localStorage.setItem(key, JSON.stringify([]));

      return Promise.resolve(SUCCESS_RESPONSE);
    }

    const index = itemsArray.findIndex(element => element.id === id);

    if (index !== -1) {
      const itemsStart = itemsArray.slice(0, index);
      const itemsEnd = itemsArray.slice(index + 1);

      updatedItems = [...itemsStart, ...itemsEnd];

      localStorage.setItem(key, JSON.stringify(updatedItems));
    }
  } catch (e) {
    console.error('Failed to set local storage key:', key, '\n', 'At id:', id, '\n', 'Error:', e, '\n');

    return Promise.resolve({ ...ERROR_RESPONSE, code: 'NotFound' });
  }
  return Promise.resolve(SUCCESS_RESPONSE);
}
