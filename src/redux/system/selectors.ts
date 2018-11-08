import { State } from '../types';

export const getSystem = (state: State) => state.system;
export const getSystemMonitorInfo = (state: State) => getSystem(state).monitorInfo;
