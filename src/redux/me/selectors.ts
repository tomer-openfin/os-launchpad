import { State } from '../types';

export const getMeState = (state: State) => state.me;
export const getMeSettings = (state: State) => getMeState(state).settings;
