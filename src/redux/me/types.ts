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
  setLaunchbarPosition,
  setMe,
} from './';

export interface MeStateSettings {
  launcherPosition: 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';
}

// Reducer
export interface MeState {
  username: string;
  settings: MeStateSettings;
}

// Action payloads
export interface LoginRequestPayload {
  email: string;
  password: string;
}
export interface LoginSuccessPayload {
  email: string;
}

export interface SetLaunchbarPayload {
  launcherPosition: 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';
}

export interface LoginRequestPayload {
  email: string;
  password: string;
}
export interface LoginSuccessPayload {
  email: string;
}
export interface SetMePayload {
  username: string;
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
