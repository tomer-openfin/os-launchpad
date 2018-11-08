import { State } from '../types';

export const getMeState = (state: State) => state.me;
export const getMeSettings = (state: State) => getMeState(state).settings;
export const getLauncherPosition = (state: State) => getMeSettings(state).launcherPosition;
export const getAutoHide = (state: State) => getMeSettings(state).autoHide;
