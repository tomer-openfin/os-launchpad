import { createSelector } from 'reselect';

import { objectsFromIds } from '../../utils/byIds';
import { State } from '../types';
import { AdminAppsById, AdminAppsState, AdminState, AdminUsersState } from './types';

export const getAdminState = (state: State): AdminState => state.admin;

// Apps
export const getAdminAppsState = (state: State): AdminAppsState => state.admin.apps;

export const getAdminAppsById = (state: State): AdminAppsById => getAdminAppsState(state).byId;

export const getAdminAppsIds = (state: State) => getAdminAppsState(state).ids;

export const getAdminAppFromId = createSelector(
  [getAdminAppsById, (_, appId) => appId],
  (appsById, appId) => appsById[`${appId}`],
);

export const getAdminAppsList = createSelector(
  getAdminAppsById,
  getAdminAppsIds,
  objectsFromIds,
);

// Users
export const getAdminUsersState = (state: State): AdminUsersState => state.admin.users;

export const getAdminUsersById = createSelector(
  getAdminUsersState,
  (adminUsersState: AdminUsersState) => adminUsersState.byId,
);

export const getAdminUsersIds = createSelector(
  getAdminUsersState,
  (adminUsersState: AdminUsersState) => adminUsersState.ids,
);

export const getAdminUserFromId = createSelector(
  [getAdminUsersById, (_, appId) => appId],
  (appsById, appId) => appsById[`${appId}`],
);

export const getAdminUsersList = createSelector(
  getAdminUsersById,
  getAdminUsersIds,
  objectsFromIds,
);
