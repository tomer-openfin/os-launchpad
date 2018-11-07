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
    console.error('Failed to get local storage key:', key, '\n', e);

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
export function setLocalStorage<P, T = void>(key: string, payload: P, resolvePayload?: T): Promise<T | void> {
  localStorage.setItem(key, JSON.stringify(payload));

  if (resolvePayload) {
    return Promise.resolve(resolvePayload);
  }

  return Promise.resolve();
}
