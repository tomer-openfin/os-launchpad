import { createSelector } from 'reselect';

import { getAppsById } from '../apps';
import { State } from '../types';

import { objectsFromIds } from '../../utils/byIds';

export const getMeState = (state: State) => state.me;

export const getIsAdmin = (state: State) => getMeState(state).isAdmin;
export const getMeSettings = (state: State) => getMeState(state).settings;

export const getAutoHide = (state: State) => getMeSettings(state).autoHide;
export const getLauncherPosition = (state: State) => getMeSettings(state).launcherPosition;

export const getAppsLauncherIds = (state: State) => getMeSettings(state).appIds;

export const getIsLauncherAppFromId = (state: State, appId: string) => getAppsLauncherIds(state).indexOf(`${appId}`) !== -1;

export const getAppsLauncherAppList = createSelector(
  // imported selector is undefined at module resolution,
  // must delay invocation by putting behind anon func until resolved
  // https://github.com/reduxjs/reselect/issues/169
  (state: State) => getAppsById(state),
  getAppsLauncherIds,
  objectsFromIds,
);
