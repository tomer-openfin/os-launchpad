import { App, User } from '../../types/commons';
import { ActionsUnion } from '../types';
import {
  createAdminApp,
  createAdminUser,
  deleteAdminApp,
  deleteAdminUser,
  getAdminApps,
  getAdminUsers,
  setPreviewType,
  updateAdminApp,
  updateAdminUser,
} from './actions';

// Reducer
export interface AdminAppsById {
  [n: string]: App;
}

export interface UsersById {
  [n: string]: User;
}

export interface AdminAppsState {
  ids: string[];
  byId: AdminAppsById;
}

export interface AdminUsersState {
  ids: string[];
  byId: UsersById;
}

export enum PreviewType {
  Login = 'login',
  Splash = 'splash',
  Shortcut = 'shortcut',
}

export interface AdminState {
  apps: AdminAppsState;
  users: AdminUsersState;
  previewType: PreviewType;
}

// Actions
export type AdminActions =
  | ActionsUnion<typeof createAdminApp>
  | ActionsUnion<typeof createAdminUser>
  | ActionsUnion<typeof deleteAdminApp>
  | ActionsUnion<typeof deleteAdminUser>
  | ActionsUnion<typeof getAdminApps>
  | ActionsUnion<typeof getAdminUsers>
  | ActionsUnion<typeof updateAdminApp>
  | ActionsUnion<typeof updateAdminUser>
  | ReturnType<typeof setPreviewType>;
