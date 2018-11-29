import { createSelector } from 'reselect';

import { objectsFromIds } from '../../utils/byIds';
import { State } from '../types';
import { AppsState } from './types';

export const getAppsState = (state: State) => state.apps;
export const getAppsStatusByName = (state: State) => getAppsState(state).statusByName;
export const getAppStatusByName = (state: State, name: string) => getAppsStatusByName(state)[name];

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
  objectsFromIds,
);
