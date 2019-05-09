import { createSelector } from 'reselect';

import getOwnUuid from '../../utils/getOwnUuid';
import { denormalizeData } from '../../utils/reduxHelpers';
import { State } from '../types';
import { getUniqueWindowId } from './utils';

export const getWindowsState = (state: State) => state.windows;
export const getWindowsById = (state: State) => getWindowsState(state).byId;
export const getWindowsIds = (state: State) => getWindowsState(state).ids;
export const getWindowById = (state: State, name: string) => {
  const id = getUniqueWindowId({ uuid: getOwnUuid(), name });
  return getWindowsById(state)[id];
};
export const getWindows = createSelector(
  [getWindowsIds, getWindowsById],
  (ids, byId) => denormalizeData(ids, byId),
);

export const getWindowBounds = (state: State, name: string) => {
  const win = getWindowById(state, name);

  return win ? win.bounds : undefined;
};

export const getWindowIsShowing = (state: State, name: string) => {
  const win = getWindowById(state, name);

  return win ? !!win.isShowing : false;
};

export const getPosition = (state: State) => state.me.settings.launcherPosition;
