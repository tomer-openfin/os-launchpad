import { createAction } from 'redux-actions';

import { BlurWindowWithDelayPayload, WindowConfig } from './types';

// Action types
export const BLUR_WINDOW_WITH_DELAY = 'BLUR_WINDOW_WITH_DELAY';
export const LAUNCH_WINDOW = 'LAUNCH_WINDOW';

// Action creators
export const blurWindowWithDelay = createAction<BlurWindowWithDelayPayload, string>(BLUR_WINDOW_WITH_DELAY, name => ({ name }));
export const launchWindow = createAction<WindowConfig>(LAUNCH_WINDOW);
