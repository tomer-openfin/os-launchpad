import {
  getSettingsError,
  getSettingsRequest,
  getSettingsSuccess,
  loginError,
  loginRequest,
  loginSuccess,
  saveSettingsError,
  saveSettingsRequest,
  saveSettingsSuccess,
  setAutoHide,
  setLaunchbarPosition,
  setMe,
} from './actions';

import { LauncherPosition } from '../../types/commons';

// State
export interface MeStateSettings {
  appIds: string[];
  autoHide: boolean;
  launcherPosition: LauncherPosition;
}

// Reducer
export interface MeState {
  firstName: string;
  email: string;
  settings: MeStateSettings;
  isAdmin: boolean;
  lastName: string;
}

// Action payloads
export interface SetLaunchbarPayload {
  launcherPosition: LauncherPosition;
}
export interface LoginRequestPayload {
  username: string;
  password: string;
}
export interface LoginSuccessPayload {
  firstName: string;
  email: string;
  isAdmin: boolean;
  lastName: string;
}
export interface SetAutoHidePayload {
  autoHide: boolean;
}
export interface SetMePayload {
  firstName: string;
  email: string;
  isAdmin: boolean;
  lastName: string;
}

// Actions
export type GetSettingsRequest = ReturnType<typeof getSettingsRequest>;
export type GetSettingsSuccess = ReturnType<typeof getSettingsSuccess>;
export type GetSettingsError = ReturnType<typeof getSettingsError>;
export type LoginRequest = ReturnType<typeof loginRequest>;
export type LoginSuccess = ReturnType<typeof loginSuccess>;
export type LoginError = ReturnType<typeof loginError>;
export type SaveSettingsRequest = ReturnType<typeof saveSettingsRequest>;
export type SaveSettingsSuccess = ReturnType<typeof saveSettingsSuccess>;
export type SaveSettingsError = ReturnType<typeof saveSettingsError>;
export type SetAutoHide = ReturnType<typeof setAutoHide>;
export type SetMe = ReturnType<typeof setMe>;
export type SetLaunchbarPosition = ReturnType<typeof setLaunchbarPosition>;

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
  | SetLaunchbarPosition;
