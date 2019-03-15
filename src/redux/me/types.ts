import {
  addToAppLauncher,
  confirmPassword,
  forgotPassword,
  getSettings,
  login,
  logout,
  removeFromAppLauncher,
  saveSettings,
  setAppIds,
  setAutoHide,
  setLauncherMonitorSettings,
  setLauncherPosition,
  setLauncherSize,
  setMe,
  updatePassword,
} from './actions';

import { DirectionalPosition, LauncherSize, Point } from '../../types/commons';
import { ActionsUnion } from '../types';

// State
export interface MeInfo {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
}

export interface MeSettingsState {
  appIds: string[];
  autoHide: boolean;
  launcherMonitorId: string | number | null;
  launcherMonitorReferencePoint: Point;
  launcherPosition: DirectionalPosition;
  launcherSize: LauncherSize;
}

// Reducer
export interface MeState extends MeInfo {
  settings: MeSettingsState;
}

// Action payloads
export interface ConfirmPasswordPayload {
  code: string;
  newPassword: string;
  username: string;
}

export interface ForgotPasswordPayload {
  username: string;
}

export interface LoginRequestPayload {
  password: string;
  session?: string;
  username: string;
}

export interface LoginErrorPayload {
  code: string;
  message: string;
  session?: string;
  status: string;
  username: string;
}

export interface LoginSuccessPayload {
  firstName: string;
  email: string;
  isAdmin: boolean;
  lastName: string;
}

export interface LoginWithNewPasswordPayload {
  username: string;
  newPassword: string;
  session: string;
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

export interface SetLauncherPositionPayload {
  launcherPosition: DirectionalPosition;
}

export interface SetLauncherSizePayload {
  launcherSize: LauncherSize;
}

export interface NewPasswordPayload {
  session: string;
  message: string;
}

export interface UpdatePasswordRequestPayload {
  password: string;
  newPassword: string;
}

export interface UpdatePasswordErrorPayload {
  status: string;
  code?: string;
  message?: string;
}

// Actions
export type MeActions =
  | ReturnType<typeof addToAppLauncher>
  | ActionsUnion<typeof confirmPassword>
  | ActionsUnion<typeof forgotPassword>
  | ActionsUnion<typeof getSettings>
  | ActionsUnion<typeof login>
  | ActionsUnion<typeof logout>
  | ReturnType<typeof removeFromAppLauncher>
  | ActionsUnion<typeof saveSettings>
  | ReturnType<typeof setAppIds>
  | ReturnType<typeof setAutoHide>
  | ReturnType<typeof setLauncherMonitorSettings>
  | ReturnType<typeof setLauncherPosition>
  | ReturnType<typeof setLauncherSize>
  | ReturnType<typeof setMe>
  | ActionsUnion<typeof updatePassword>;
