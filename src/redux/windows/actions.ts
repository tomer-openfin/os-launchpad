import { createAction } from 'redux-actions';

import { WindowConfig, WindowNamePayload } from './types';

// Action types
export const BLUR_WINDOW_WITH_DELAY = 'BLUR_WINDOW_WITH_DELAY';
export const LAUNCH_WINDOW = 'LAUNCH_WINDOW';
export const WINDOW_HIDDEN = 'WINDOW_HIDDEN';
export const WINDOW_SHOWN = 'WINDOW_SHOWN';

// Action creators
export const blurWindowWithDelay = createAction<WindowNamePayload, string>(BLUR_WINDOW_WITH_DELAY, name => ({ name }));
export const launchWindow = createAction<WindowConfig>(LAUNCH_WINDOW);
export const windowHidden = createAction<WindowNamePayload, string>(WINDOW_HIDDEN, name => ({ name }));
export const windowShown = createAction<WindowNamePayload, string>(WINDOW_SHOWN, name => ({ name }));
