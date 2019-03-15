import { ConfirmPasswordPayload, ForgotPasswordPayload, LoginRequestPayload, LoginWithNewPasswordPayload, MeInfo } from '../../redux/me';
import { HTTPMethods } from '../../types/enums';
import API from './api';
import { api } from './utils';

/**
 * Login
 */
export const login = api<MeInfo, LoginRequestPayload>(API.LOGIN, HTTPMethods.POST, json => ({ data: json }));
export type Login = typeof login;

/**
 * Login with new password
 */
export const newPasswordLogin = api<MeInfo, LoginWithNewPasswordPayload>(API.NEW_PASSWORD, HTTPMethods.POST, json => ({ data: json }));
export type NewPasswordLogin = typeof newPasswordLogin;

/**
 * Logout
 */
export const logout = api<undefined>(API.LOGOUT, HTTPMethods.POST, _ => ({ data: undefined }));
export type Logout = typeof logout;

/**
 * Confirm forgotten password
 */
export const confirmPassword = api<undefined, ConfirmPasswordPayload>(API.CONFIRM_PASSWORD, HTTPMethods.POST, _ => ({ data: undefined }));
export type ConfirmPassword = typeof confirmPassword;

/**
 * Forgot password
 */
export const forgotPassword = api<undefined, ForgotPasswordPayload>(API.FORGOT_PASSWORD, HTTPMethods.POST, _ => ({ data: undefined }));
export type ForgotPassword = typeof forgotPassword;
