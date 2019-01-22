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

/**
 * Set a new item under a specified key in localStorage.
 *
 * @param key - localStorage key
 * @param payload - API response
 * @param resolvePayload - Response with status
 * @param id - localStorage item reference id
 *
 * @return {Promise<>}
 */
export function setItemInLocalStorage(
  key: string,
  payload: APIResponse,
  resolvePayload: APIResponse = { status: ResponseStatus.SUCCESS },
  id: string,
): Promise<APIResponse> {
  // set the first item
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([payload]));
    return Promise.resolve(resolvePayload);
  }

  // add additional items
  const item = localStorage.getItem(key);
  if (item) {
    const itemsArray = JSON.parse(item);

    const index = itemsArray.findIndex(x => x.id === id);
    if (index === -1) {
      // replace old itemsArray
      itemsArray.push(payload);
      const updatedItems = JSON.stringify(itemsArray);
      localStorage.setItem(key, updatedItems);
    }
  }

  return Promise.resolve(resolvePayload);
}

/**
 * Delete payload under a specified key and id in localStorage.
 *
 * @param key - localStorage key
 * @param resolvePayload - Response with status
 * @param id - localStorage item reference id
 *
 * @return {Promise<APIResponse>}
 */
export function deleteLocalStorageItem(key: string, resolvePayload: APIResponse = { status: ResponseStatus.SUCCESS }, id?: string) {
  const item = localStorage.getItem(key);

  if (item) {
    const itemsArray = JSON.parse(item);

    const index = itemsArray.findIndex(element => element.id === id);
    if (index !== -1) {
      const itemsStart = itemsArray.slice(0, index);
      const itemsEnd = itemsArray.slice(index + 1);
      const modified = [...itemsStart, ...itemsEnd];
      localStorage.setItem(key, JSON.stringify(modified));
    }
  }

  return Promise.resolve(resolvePayload);
}
