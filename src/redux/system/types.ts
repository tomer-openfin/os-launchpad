import { setMonitorInfo } from './actions';

// State
export interface SystemState {
  monitorInfo: object;
}

// Actions
export type SetMonitorInfo = ReturnType<typeof setMonitorInfo>;

export type SystemActions = SetMonitorInfo;
