import {
  addToAppLauncher,
  confirmPassword,
  forgotPassword,
  getSettings,
  login,
  logout,
  removeFromAppLauncher,
  resetSettings,
  saveSettings,
  setAppIds,
  setAuthMessaging,
  setAutoHide,
  setLauncherMonitorSettings,
  setLauncherPosition,
  setLauncherSize,
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
  sessionTimestamp: string | null;
}

export interface MeAuthMessagingState {
  message: string;
  isError: boolean;
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
  authMessaging: MeAuthMessagingState;
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
  sessionTimestamp: string;
}

export interface LoginWithNewPasswordPayload {
  username: string;
  newPassword: string;
  session: string;
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
  | ActionsUnion<typeof confirmPassword>
  | ActionsUnion<typeof forgotPassword>
  | ActionsUnion<typeof getSettings>
  | ActionsUnion<typeof login>
  | ActionsUnion<typeof logout>
  | ActionsUnion<typeof saveSettings>
  | ActionsUnion<typeof updatePassword>
  | ReturnType<typeof addToAppLauncher>
  | ReturnType<typeof removeFromAppLauncher>
  | ReturnType<typeof resetSettings>
  | ReturnType<typeof setAppIds>
  | ReturnType<typeof setAuthMessaging>
  | ReturnType<typeof setAutoHide>
  | ReturnType<typeof setLauncherMonitorSettings>
  | ReturnType<typeof setLauncherPosition>
  | ReturnType<typeof setLauncherSize>
  | ActionsUnion<typeof updatePassword>;
