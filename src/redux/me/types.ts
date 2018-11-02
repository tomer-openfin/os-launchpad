import { loginError, loginRequest, loginSuccess, setMe } from './';

// Reducer
export interface MeState {
  username: string;
}

// Action payloads
export interface SetMePayload {
  username: string;
}

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginSuccessPayload {
  email: string;
}

export interface LoginErrorPayload {
  message: string;
}

// Actions
export type SetMe = ReturnType<typeof setMe>;
export type LoginRequest = ReturnType<typeof loginRequest>;
export type LoginSuccess = ReturnType<typeof loginSuccess>;
export type LoginError = ReturnType<typeof loginError>;

export type MeActions = SetMe | LoginRequest | LoginSuccess | LoginError;
