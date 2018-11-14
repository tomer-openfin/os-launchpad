import { State } from '../types';

export const getAutoHide = (state: State) => getMeSettings(state).autoHide;
export const getIsAdmin = (state: State) => getMeState(state).isAdmin;
export const getLauncherPosition = (state: State) => getMeSettings(state).launcherPosition;
export const getMeSettings = (state: State) => getMeState(state).settings;
export const getMeState = (state: State) => state.me;
