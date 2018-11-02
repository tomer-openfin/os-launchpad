import { State } from '../types';

export const getWindows = (state: State) => state.windows;
export const getWindowsById = (state: State) => getWindows(state).byId;
export const getWindowsIds = (state: State) => getWindows(state).ids;
export const getWindowById = (state: State, id: string) => getWindowsById(state)[id];
