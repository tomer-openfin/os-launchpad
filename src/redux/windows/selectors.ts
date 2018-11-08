import { State } from '../types';

export const getWindowsState = (state: State) => state.windows;
export const getWindowsById = (state: State) => getWindowsState(state).byId;
export const getWindowsIds = (state: State) => getWindowsState(state).ids;
export const getWindowById = (state: State, id: string) => getWindowsById(state)[id];

export const getWindowBounds = (state: State, id: string) => {
  const win = getWindowById(state, id);

  return win
    ? win.bounds
    : { width: 0, height: 0, top: 0, left: 0 };
};

export const getPosition = (state: State) => state.me.settings.launcherPosition;
