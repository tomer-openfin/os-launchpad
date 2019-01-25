import { LoginRequestPayload, LoginWithNewPasswordPayload } from '../../redux/me';
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
