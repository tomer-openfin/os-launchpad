import { createAction } from '../utils';
import { WindowConfig, WindowNamePayload } from './types';

// Action types
const HIDE_WINDOW = 'HIDE_WINDOW';
const LAUNCH_WINDOW = 'LAUNCH_WINDOW';
const RECOVER_LOST_WINDOWS = 'RECOVER_LOST_WINDOWS';
const TOGGLE_WINDOW = 'TOGGLE_WINDOW';
const WINDOW_HIDDEN = 'WINDOW_HIDDEN';
const WINDOW_SHOWN = 'WINDOW_SHOWN';
const WINDOW_BLURRED = 'WINDOW_BLURRED';

// Action creators
export const hideWindow = createAction(HIDE_WINDOW)<WindowNamePayload>();
export const launchWindow = createAction(LAUNCH_WINDOW)<WindowConfig>();
export const recoverLostWindows = createAction(RECOVER_LOST_WINDOWS)();
export const toggleWindow = createAction(TOGGLE_WINDOW)<WindowNamePayload>();
export const windowBlurred = createAction(WINDOW_BLURRED)<WindowNamePayload>();
export const windowHidden = createAction(WINDOW_HIDDEN)<WindowNamePayload>();
export const windowShown = createAction(WINDOW_SHOWN)<WindowNamePayload>();
