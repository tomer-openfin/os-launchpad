import { MonitorInfo } from '../../types/commons';
import { setMonitorInfo, systemEventApplicationClosed, systemEventApplicationCrashed, systemEventApplicationStarted } from './actions';

// State
export interface SystemState {
  monitorInfo: MonitorInfo | null;
}

// Actions
export type SetMonitorInfoAction = ReturnType<typeof setMonitorInfo>;
export type SystemEventApplicationClosedAction = ReturnType<typeof systemEventApplicationClosed>;
export type SystemEventApplicationCrashedAction = ReturnType<typeof systemEventApplicationCrashed>;
export type SystemEventApplicationStartedAction = ReturnType<typeof systemEventApplicationStarted>;

export type SystemActions =
  | SetMonitorInfoAction
  | SystemEventApplicationClosedAction
  | SystemEventApplicationCrashedAction
  | SystemEventApplicationStartedAction;
