import API from './api';
import { createPostOptions } from './requestOptions';

/**
 * Login
 *
 * @returns {Promise<>}
 */
export const login = payload => {
  const options = createPostOptions(payload);

  return fetch(API.LOGIN, options)
    .then(resp => resp.json())
    .then(resp => resp);
};
