import { Bounds } from '../../types/commons';
import { hideWindow, launchWindow, toggleWindow, windowBlurred, windowHidden, windowShown } from './actions';

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
export type HideWindowAction = ReturnType<typeof hideWindow>;
export type LaunchWindowAction = ReturnType<typeof launchWindow>;
export type ToggleWindowAction = ReturnType<typeof toggleWindow>;
export type WindowBlurredAction = ReturnType<typeof windowBlurred>;
export type WindowHiddenAction = ReturnType<typeof windowHidden>;
export type WindowShownAction = ReturnType<typeof windowShown>;

export type WindowsActions = LaunchWindowAction | ToggleWindowAction | WindowBlurredAction | WindowHiddenAction | WindowShownAction;
