import {
  changePassword,
  getSettingsError,
  getSettingsRequest,
  getSettingsSuccess,
  loginError,
  loginRequest,
  loginSuccess,
  loginWithNewPassword,
  logoutError,
  logoutRequest,
  logoutSuccess,
  saveSettingsError,
  saveSettingsRequest,
  saveSettingsSuccess,
  setAppIds,
  setAutoHide,
  setLaunchbarPosition,
  setMe,
} from './actions';

import { DirectionalPosition } from '../../types/commons';

// State
export interface MeSettingsState {
  appIds: string[];
  autoHide: boolean;
  launcherPosition: DirectionalPosition;
}

export interface MeLoginState {
  changePassword: boolean;
  error: boolean;
  session: string;
  message: string;
}

// Reducer
export interface MeState {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
  login: MeLoginState;
  settings: MeSettingsState;
}

// Action payloads
export interface LoginRequestPayload {
  username: string;
  password: string;
}

export interface LoginWithNewPasswordPayload {
  username: string;
  newPassword: string;
  session: string;
}

export interface LoginSuccessPayload {
  firstName: string;
  email: string;
  isAdmin: boolean;
  lastName: string;
}

export interface SetMePayload {
  firstName: string;
  email: string;
  isAdmin: boolean;
  lastName: string;
}

export interface SetAppIdsPayload {
  appIds: string[];
}

export interface SetAutoHidePayload {
  autoHide: boolean;
}

export interface SetLaunchbarPayload {
  launcherPosition: DirectionalPosition;
}

export interface ChangePasswordPayload {
  session: string;
  message: string;
}

// Actions
export type GetSettingsRequest = ReturnType<typeof getSettingsRequest>;
export type GetSettingsSuccess = ReturnType<typeof getSettingsSuccess>;
export type GetSettingsError = ReturnType<typeof getSettingsError>;

export type LoginRequest = ReturnType<typeof loginRequest>;
export type LoginSuccess = ReturnType<typeof loginSuccess>;
export type LoginError = ReturnType<typeof loginError>;

export type LogoutRequest = ReturnType<typeof logoutRequest>;
export type LogoutSuccess = ReturnType<typeof logoutSuccess>;
export type LogoutError = ReturnType<typeof logoutError>;

export type LoginWithNewPassword = ReturnType<typeof loginWithNewPassword>;

export type SaveSettingsRequest = ReturnType<typeof saveSettingsRequest>;
export type SaveSettingsSuccess = ReturnType<typeof saveSettingsSuccess>;
export type SaveSettingsError = ReturnType<typeof saveSettingsError>;

export type SetMe = ReturnType<typeof setMe>;

export type SetAppIds = ReturnType<typeof setAppIds>;
export type SetAutoHide = ReturnType<typeof setAutoHide>;
export type SetLaunchbarPosition = ReturnType<typeof setLaunchbarPosition>;

export type ChangePassword = ReturnType<typeof changePassword>;

export type MeActions =
  | GetSettingsRequest
  | GetSettingsSuccess
  | GetSettingsError
  | LoginRequest
  | LoginSuccess
  | LoginError
  | SaveSettingsRequest
  | SaveSettingsSuccess
  | SaveSettingsError
  | SetMe
  | SetLaunchbarPosition
  | ChangePassword;
