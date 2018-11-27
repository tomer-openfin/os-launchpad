import { State } from '../types';

export const getSystem = (state: State) => state.system;
export const getMonitorInfo = (state: State) => getSystem(state).monitorInfo;
