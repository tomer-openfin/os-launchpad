import { createAction } from 'redux-actions';

import { WindowConfig } from './types';

// Action types
export const LAUNCH_WINDOW = 'LAUNCH_WINDOW';

// Action creators
export const launchWindow = createAction<WindowConfig>(LAUNCH_WINDOW);
