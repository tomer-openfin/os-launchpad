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

// Enums
export enum LauncherPosition {
  Top = 'TOP',
  Right = 'RIGHT',
  Bottom = 'BOTTOM',
  Left = 'LEFT',
}

// State
export interface MeStateSettings {
  autoHide: boolean;
  launcherPosition: LauncherPosition;
}

// Reducer
export interface MeState {
  username: string;
  settings: MeStateSettings;
  isAdmin: boolean;
}

// Action payloads
export interface SetLaunchbarPayload {
  launcherPosition: LauncherPosition;
}
export interface LoginRequestPayload {
  email: string;
  password: string;
}
export interface LoginSuccessPayload {
  token: string;
  email: string;
}
export interface SetAutoHidePayload {
  autoHide: boolean;
}
export interface SetMePayload {
  username: string;
  isAdmin: boolean;
}

// Actions creators
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
