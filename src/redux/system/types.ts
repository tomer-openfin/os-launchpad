import { MonitorInfo } from '../../types/commons';
import { ActionsUnion } from '../types';
import {
  getAndSetMonitorInfo,
  getMachineId,
  setMonitorInfo,
  storeAllSystemWindows,
  systemEventApplicationClosed,
  systemEventApplicationCrashed,
  systemEventApplicationStarted,
  systemEventWindowBoundsChanged,
  systemEventWindowClosed,
  systemEventWindowCreated,
  systemEventWindowGroupChanged,
  systemEventWindowHidden,
  systemEventWindowShown,
  systemWindowCreatedWithDetails,
} from './actions';

export interface SystemWindow {
  // bottom: number;
  height: number;
  isGrouped?: boolean;
  isShowing: boolean;
  left: number;
  name: string;
  // right: number;
  // state: string;
  top: number;
  uuid: string;
  width: number;
}

export interface SystemWindowBounds {
  // bottom: number;
  height: number;
  left: number;
  name: string;
  // right: number;
  top: number;
  uuid: string;
  width: number;
}

export interface SystemWindowDetails {
  isGrouped?: boolean;
  isShowing: boolean;
  name: string;
  uuid: string;
  // state: string;
}

// State
export interface SystemState {
  machineId: string | null;
  monitorInfo: MonitorInfo | null;
  windowBoundsById: { [id: string]: SystemWindowBounds };
  windowDetailsById: { [id: string]: SystemWindowDetails };
  windowIds: string[];
}

// Actions
export type SystemActions =
  | ActionsUnion<typeof getMachineId>
  | ActionsUnion<typeof getAndSetMonitorInfo>
  | ActionsUnion<typeof storeAllSystemWindows>
  | ReturnType<typeof setMonitorInfo>
  | ReturnType<typeof systemEventApplicationClosed>
  | ReturnType<typeof systemEventApplicationCrashed>
  | ReturnType<typeof systemEventApplicationStarted>
  | ReturnType<typeof systemEventWindowBoundsChanged>
  | ReturnType<typeof systemEventWindowClosed>
  | ReturnType<typeof systemEventWindowCreated>
  | ReturnType<typeof systemEventWindowHidden>
  | ReturnType<typeof systemEventWindowGroupChanged>
  | ReturnType<typeof systemEventWindowShown>
  | ReturnType<typeof systemWindowCreatedWithDetails>;
