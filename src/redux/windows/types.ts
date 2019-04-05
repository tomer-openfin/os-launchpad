import { Bounds } from '../../types/commons';
import { NormalizedById } from '../../utils/reduxHelpers';
import { hideWindow, launchWindow, recoverLostWindows, toggleWindow, windowBlurred, windowHidden, windowShown } from './actions';

export interface WindowState {
  bounds: Bounds;
  id: string;
  isShowing?: boolean;
}

// State
export interface WindowsState {
  byId: NormalizedById<WindowState>;
  ids: string[];
}

// Action payloads
export interface WindowNamePayload {
  name: string;
}

export interface WindowConfig {
  alwaysOnTop: boolean;
  autoShow: boolean;
  contextMenu: boolean;
  defaultCentered: boolean;
  defaultHeight: number;
  defaultWidth: number;
  frame: boolean;
  maxHeight?: number;
  maximizable: boolean;
  minHeight?: number;
  minWidth?: number;
  minimizable: boolean;
  name: string;
  opactity?: number;
  resizable: boolean;
  saveWindowState: boolean;
  showTaskbarIcon: boolean;
  // smallWindow: boolean;
  url: string;
  waitForPageLoad: boolean;
}

export interface WindowConfigsMap {
  [key: string]: WindowConfig;
}

// Actions
export type WindowsActions =
  | ReturnType<typeof hideWindow>
  | ReturnType<typeof launchWindow>
  | ReturnType<typeof recoverLostWindows>
  | ReturnType<typeof toggleWindow>
  | ReturnType<typeof windowBlurred>
  | ReturnType<typeof windowHidden>
  | ReturnType<typeof windowShown>;
