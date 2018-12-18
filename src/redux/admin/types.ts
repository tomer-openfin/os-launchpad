import { App, User } from '../../types/commons';

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

export interface AdminState {
  apps: AdminAppsState;
  users: AdminUsersState;
}
