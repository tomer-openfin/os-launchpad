import { getErrorFromCatch } from '../redux/utils';
import { ApiFailureResponse, ApiResponse, ApiResponseStatus, ApiSuccessResponse } from '../types/commons';

export const LOCAL_STORAGE_KEYS = {
  APPS: 'apps',
  LAYOUTS: 'layouts',
  SETTINGS: 'settings',
};

/**
 * Get data from specified localStorage key.
 *
 * @param key - localStorage key
 */
export function getLocalStorage<T>(key: string, defaultPayload?: T): Promise<ApiResponse<T>> {
  const item = localStorage.getItem(key);

  try {
    if (item === null && defaultPayload) {
      const success: ApiSuccessResponse<T> = { status: ApiResponseStatus.Success, data: defaultPayload };
      return Promise.resolve(success);
    } else if (item === null) {
      throw new Error('Resource not found.');
    } else {
      const data: T = JSON.parse(item);
      const success: ApiSuccessResponse<T> = { status: ApiResponseStatus.Success, data };
      return Promise.resolve(success);
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    const failure: ApiFailureResponse = { status: ApiResponseStatus.Failure, message: `Error at getLocalStorage for ${key}. ${error.message}` };
    return Promise.resolve(failure);
  }
}

/**
 * Get data from specified localStorage key.
 *
 * @param key - localStorage key
 */
export function getInLocalStorage<T>(key: string, id: string): Promise<ApiResponse<T>> {
  const item = localStorage.getItem(key);

  try {
    if (item === null) {
      throw new Error('Resource not found.');
    }

    const storage = JSON.parse(item);

    if (Array.isArray(storage)) {
      const index = storage.findIndex(entry => entry.id === id);
      if (index === -1) {
        throw new Error('Resource not found.');
      }

      const success: ApiSuccessResponse<T> = { status: ApiResponseStatus.Success, data: storage[index] };
      return Promise.resolve(success);
    }

    if (storage && typeof storage === 'object') {
      const data = storage[id];
      if (!data) {
        throw new Error('Resource not found.');
      }

      const success: ApiSuccessResponse<T> = { status: ApiResponseStatus.Success, data };
      return Promise.resolve(success);
    }

    throw new Error('Unknown localStorage structure.');
  } catch (e) {
    const error = getErrorFromCatch(e);
    const failure: ApiFailureResponse = { status: ApiResponseStatus.Failure, message: `Error at deleteInLocalStorage for ${id} in ${key}. ${error.message}` };
    return Promise.resolve(failure);
  }
}

/**
 * Save payload under a specified key in localStorage.
 *
 * @param key - localStorage key
 * @param payload - payload to be stringified and stored in localStorage
 */
export function setLocalStorage<T>(key: string, payload: T): Promise<ApiResponse<undefined>> {
  try {
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (e) {
    const error = getErrorFromCatch(e);
    const failure: ApiFailureResponse = { status: ApiResponseStatus.Failure, message: `Error at setLocalStorage for ${key}. ${error.message}` };
    return Promise.resolve(failure);
  }

  const success: ApiSuccessResponse<undefined> = { status: ApiResponseStatus.Success, data: undefined };
  return Promise.resolve(success);
}

/**
 * Set a new item under a specified key in localStorage.
 *
 * @param key - localStorage key
 * @param payload - API response
 * @param id - localStorage item reference id
 */
export function setInLocalStorage<T extends { id: string | number }>(key: string, payload: T, id: T['id']): Promise<ApiResponse<T>> {
  const item = localStorage.getItem(key);

  try {
    // If storage has not been defined
    // set initial item as an Array<item>
    // Array will be default data structure
    if (item === null) {
      localStorage.setItem(key, JSON.stringify([payload]));
    } else {
      // add additional items
      const storage = JSON.parse(item);

      if (Array.isArray(storage)) {
        const index = storage.findIndex(entry => entry.id === id);
        if (index !== -1) {
          storage[index] = payload;
        } else {
          storage.push(payload);
        }
      }

      if (storage && typeof storage === 'object') {
        storage[id] = payload;
      }

      localStorage.setItem(key, JSON.stringify(storage));
    }

    const success: ApiSuccessResponse<T> = { status: ApiResponseStatus.Success, data: payload };
    return Promise.resolve(success);
  } catch (e) {
    const error = getErrorFromCatch(e);
    const failure: ApiFailureResponse = { status: ApiResponseStatus.Failure, message: `Error at setInLocalStorage for ${id} in ${key}. ${error.message}` };
    return Promise.resolve(failure);
  }
}

/**
 * Delete payload under a specified key and id in localStorage.
 *
 * @param key - localStorage key
 * @param id - localStorage item reference id
 */
export function deleteInLocalStorage(key: string, id: string): Promise<ApiResponse<undefined>> {
  const item = localStorage.getItem(key);

  try {
    if (item === null) {
      throw new Error('Resource not found.');
    }

    const storage = JSON.parse(item);

    if (Array.isArray(storage)) {
      const index = storage.findIndex(entry => entry.id === id);
      if (index === -1) {
        throw new Error('Resource not found.');
      }

      storage.splice(index, 1);
    }

    if (storage && typeof storage === 'object') {
      delete storage[id];
    }

    localStorage.setItem(key, JSON.stringify(storage));
  } catch (e) {
    const error = getErrorFromCatch(e);
    const failure: ApiFailureResponse = { status: ApiResponseStatus.Failure, message: `Error at deleteInLocalStorage for ${id} in ${key}. ${error.message}` };
    return Promise.resolve(failure);
  }

  const success: ApiSuccessResponse<undefined> = { status: ApiResponseStatus.Success, data: undefined };
  return Promise.resolve(success);
}
