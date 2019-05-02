import { State } from '../types';

import { createSelector } from 'reselect';
import { denormalizeData } from '../../utils/reduxHelpers';

export const getWindowsState = (state: State) => state.windows;
export const getWindowsById = (state: State) => getWindowsState(state).byId;
export const getWindowsIds = (state: State) => getWindowsState(state).ids;
export const getWindowById = (state: State, id: string) => getWindowsById(state)[id];
export const getWindows = createSelector(
  [getWindowsIds, getWindowsById],
  (ids, byId) => denormalizeData(ids, byId),
);

export const getWindowBounds = (state: State, id: string) => {
  const win = getWindowById(state, id);

  return win ? win.bounds : undefined;
};

export const getWindowIsShowing = (state: State, id: string) => {
  const win = getWindowById(state, id);

  return win ? !!win.isShowing : false;
};

export const getPosition = (state: State) => state.me.settings.launcherPosition;
