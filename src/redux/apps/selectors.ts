import { createSelector } from 'reselect';

import appsFromIds from '../../utils/appsFromIds';
import { AppsState } from './types';

export const getAppsState = state => state.apps;

export const getAppsById = createSelector(
  getAppsState,
  (appsState: AppsState) => appsState.byId,
);
export const getAppsIds = createSelector(
  getAppsState,
  (appsState: AppsState) => appsState.ids,
);

export const getAppFromId = createSelector(
  [getAppsById, (_, appId) => appId],
  (appsById, appId) => appsById[`${appId}`],
);

export const getAppsDirectoryAppList = createSelector(
  getAppsById,
  getAppsIds,
  appsFromIds,
);
