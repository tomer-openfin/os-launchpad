import { blurWindowWithDelay, launchWindow } from './actions';

// Action payloads
export interface BlurWindowWithDelayPayload {
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
  maxHeight: number;
  maximizable: boolean;
  minHeight: number;
  minWidth: number;
  minimizable: boolean;
  name: string;
  resizable: boolean;
  saveWindowState: boolean;
  showTaskbarIcon: boolean;
  // smallWindow: boolean;
  url: string;
  waitForPageLoad: boolean;
}

// Actions
export type BlurWindowWithDelayAction = ReturnType<typeof blurWindowWithDelay>;
export type LaunchWindow = ReturnType<typeof launchWindow>;
