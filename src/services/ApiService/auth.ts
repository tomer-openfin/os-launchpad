import { ConfirmPasswordPayload, ForgotPasswordPayload, LoginRequestPayload, LoginWithNewPasswordPayload } from '../../redux/me';
import { APIResponse } from '../../types/commons';
import { HTTPMethods } from '../../types/enums';

import API from './api';
import fetchJSON from './fetchJSON';

/**
 * Login
 *
 * @returns {Promise<APIResponse>}
 */
export const login = (payload: LoginRequestPayload): Promise<APIResponse> => fetchJSON(API.LOGIN, HTTPMethods.POST, payload);

/**
 * Login with new password
 *
 * @returns {Promise<APIResponse>}
 */
export const newPasswordLogin = ({ username, newPassword, session }: LoginWithNewPasswordPayload): Promise<APIResponse> =>
  fetchJSON(API.NEW_PASSWORD, HTTPMethods.POST, { username, newPassword, session });

/**
 * Logout
 *
 * @returns {Promise<APIResponse>}
 */
export const logout = (): Promise<APIResponse> => fetchJSON(API.LOGOUT, HTTPMethods.POST);

/**
 * Confirm forgotten password
 *
 * @returns {Promise<APIResponse>}
 */
export const confirmPassword = (payload: ConfirmPasswordPayload): Promise<APIResponse> => fetchJSON(API.CONFIRM_PASSWORD, HTTPMethods.POST, payload);

/**
 * Forgot password
 *
 * @returns {Promise<APIResponse>}
 */
export const forgotPassword = (payload: ForgotPasswordPayload): Promise<APIResponse> => fetchJSON(API.FORGOT_PASSWORD, HTTPMethods.POST, payload);
