import { MonitorInfo } from '../../types/commons';
import { setMonitorInfo } from './actions';

// State
export interface SystemState {
  monitorInfo: MonitorInfo | null;
}

// Action Payloads
export type SetMonitorInfoPayload = MonitorInfo;

// Actions
export type SetMonitorInfo = ReturnType<typeof setMonitorInfo>;

export type SystemActions = SetMonitorInfo;
