import { Bounds } from '../../types/commons';
import { blurWindowWithDelay, launchWindow, windowHidden, windowShown } from './actions';

// State
export interface WindowsState {
  byId: {
    [id: string]: {
      bounds: Bounds;
      id: string;
      isShowing?: boolean;
    };
  };
  ids: string[];
}

// Action payloads
export interface BlurWindowWithDelayPayload {
  delayDuration: number;
  name: string;
}

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

// Actions
export type BlurWindowWithDelayAction = ReturnType<typeof blurWindowWithDelay>;
export type LaunchWindowAction = ReturnType<typeof launchWindow>;
export type WindowHiddenAction = ReturnType<typeof windowHidden>;
export type WindowShownAction = ReturnType<typeof windowShown>;

export type WindowsActions = BlurWindowWithDelayAction | LaunchWindowAction | WindowHiddenAction | WindowShownAction;
