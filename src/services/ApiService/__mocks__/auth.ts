import { LoginWithNewPasswordPayload } from '../../../redux/me/types';
import { OkResponse } from './utils/commons';

export const MockUser = {
  email: 'mock@email.co',
  firstName: 'mister',
  isAdmin: true,
  lastName: 'admin',
};

/**
 * Login
 *
 * @returns {Promise<>}
 */
export const login = payload => {
  return Promise.resolve({
    ...MockUser,
    email: payload.username || 'mock@email.co',
  });
};

/**
 * Login with new password
 *
 * @returns {Promise<>}
 */
export const newPasswordLogin = ({ username, newPassword, session }: LoginWithNewPasswordPayload) => {
  return Promise.resolve({
    ...MockUser,
    email: username || 'mock@email.co',
  });
};

/**
 * Logout
 *
 * @returns {Promise<>}
 */
export const logout = () => {
  return Promise.resolve(OkResponse);
};
