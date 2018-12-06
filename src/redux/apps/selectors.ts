import { createSelector } from 'reselect';

import { App } from '../../types/commons';
import { objectsFromIds } from '../../utils/byIds';
import { State } from '../types';

export const getAppsState = (state: State) => state.apps;

// byId
export const getAppsById = (state: State) => getAppsState(state).byId;
export const getAppById = (state: State, id: string): App | undefined => getAppsById(state)[id];

// ids
export const getAppsIds = (state: State) => getAppsState(state).ids;

// statusByName
export const getAppsStatusByName = (state: State) => getAppsState(state).statusByName;
export const getAppStatusByName = (state: State, id: string) => getAppsStatusByName(state)[id];

// Selectors
export const getAppsDirectoryAppList = createSelector(
  getAppsById,
  getAppsIds,
  objectsFromIds,
);
