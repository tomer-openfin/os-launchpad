import { LoginWithNewPasswordPayload } from '../../redux/me/types';
import API from './api';
import { createPostOptions } from './requestOptions';

/**
 * Login
 *
 * @returns {Promise<>}
 */
export const login = payload => {
  const options = createPostOptions(payload);

  return fetch(API.LOGIN, options).then(resp => resp.json());
};

/**
 * Login with new password
 *
 * @returns {Promise<>}
 */
export const newPasswordLogin = ({ username, newPassword, session }: LoginWithNewPasswordPayload) => {
  const options = createPostOptions({ username, newPassword, session });

  return fetch(API.NEW_PASSWORD, options).then(resp => resp.json());
};

/**
 * Logout
 *
 * @returns {Promise<>}
 */
export const logout = () => {
  const options = createPostOptions();

  return fetch(API.LOGOUT, options).then(resp => resp.json());
};
