import { MonitorInfo } from '../../types/commons';
import { ActionsUnion } from '../types';
import {
  getAndSetMonitorInfo,
  getMachineId,
  setMonitorInfo,
  systemEventApplicationClosed,
  systemEventApplicationCrashed,
  systemEventApplicationStarted,
} from './actions';

// State
export interface SystemState {
  machineId: string | null;
  monitorInfo: MonitorInfo | null;
}

// Actions
export type SystemActions =
  | ActionsUnion<typeof getMachineId>
  | ActionsUnion<typeof getAndSetMonitorInfo>
  | ReturnType<typeof setMonitorInfo>
  | ReturnType<typeof systemEventApplicationClosed>
  | ReturnType<typeof systemEventApplicationCrashed>
  | ReturnType<typeof systemEventApplicationStarted>;
