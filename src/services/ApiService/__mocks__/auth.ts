import { MeInfo } from '../../../redux/me/types';
import { ApiSuccessResponse } from '../../../types/commons';
import { ApiResponseStatus } from '../../../types/enums';
import { generateTimestamp } from '../../../utils/timestampUtils';
import { ConfirmPassword, ForgotPassword, Login, Logout, NewPasswordLogin } from '../auth';

export const MockUser = {
  email: 'mock@email.co',
  firstName: 'mister',
  isAdmin: true,
  lastName: 'admin',
  sessionTimestamp: generateTimestamp(),
};

/**
 * Login
 */
export const login: Login = payload => {
  const response: ApiSuccessResponse<MeInfo> = {
    data: {
      ...MockUser,
      email: payload.username || 'mock@email.co',
    },
    status: ApiResponseStatus.Success,
  };
  return Promise.resolve(response);
};

/**
 * Login with new password
 */
export const newPasswordLogin: NewPasswordLogin = payload => {
  const response: ApiSuccessResponse<MeInfo> = {
    data: {
      ...MockUser,
      email: payload.username || 'mock@email.co',
    },
    status: ApiResponseStatus.Success,
  };
  return Promise.resolve(response);
};

/**
 * Logout
 */
export const logout: Logout = () => {
  const response: ApiSuccessResponse<undefined> = {
    data: undefined,
    status: ApiResponseStatus.Success,
  };
  return Promise.resolve(response);
};

/**
 * Confirm password
 */
export const confirmPassword: ConfirmPassword = () => {
  const response: ApiSuccessResponse<undefined> = {
    data: undefined,
    status: ApiResponseStatus.Success,
  };
  return Promise.resolve(response);
};

/**
 * Forgot password
 */
export const forgotPassword: ForgotPassword = () => {
  const response: ApiSuccessResponse<undefined> = {
    data: undefined,
    status: ApiResponseStatus.Success,
  };
  return Promise.resolve(response);
};
