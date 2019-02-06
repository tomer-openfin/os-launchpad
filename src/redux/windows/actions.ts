import { createAction } from 'redux-actions';

import { WindowConfig, WindowNamePayload } from './types';

// Action types
export const HIDE_WINDOW = 'HIDE_WINDOW';
export const LAUNCH_WINDOW = 'LAUNCH_WINDOW';
export const TOGGLE_WINDOW = 'TOGGLE_WINDOW';
export const WINDOW_HIDDEN = 'WINDOW_HIDDEN';
export const WINDOW_SHOWN = 'WINDOW_SHOWN';
export const WINDOW_BLURRED = 'WINDOW_BLURRED';

// Action creators
export const hideWindow = createAction<WindowNamePayload, string>(HIDE_WINDOW, name => ({ name }));
export const launchWindow = createAction<WindowConfig>(LAUNCH_WINDOW);
export const toggleWindow = createAction<WindowNamePayload, string>(TOGGLE_WINDOW, name => ({ name }));
export const windowBlurred = createAction<WindowNamePayload, string>(WINDOW_BLURRED, name => ({ name }));
export const windowHidden = createAction<WindowNamePayload, string>(WINDOW_HIDDEN, name => ({ name }));
export const windowShown = createAction<WindowNamePayload, string>(WINDOW_SHOWN, name => ({ name }));
