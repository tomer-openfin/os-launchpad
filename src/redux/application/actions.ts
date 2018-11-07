import { createAction } from 'redux-actions';

import { OpenfinReadyPayload } from './types';

// Action Types
export const APPLICATION_STARTED = 'APPLICATION_STARTED';
export const LAUNCH_APP_LAUNCHER = 'LAUNCH_APP_LAUNCHER';
export const OPENFIN_READY = 'OPENFIN_READY';
export const SET_IS_ENTERPRISE = 'SET_IS_ENTERPRISE';

// Action Creators
export const applicationStarted = createAction(APPLICATION_STARTED);
export const launchAppLauncher = createAction(LAUNCH_APP_LAUNCHER);
export const openfinReady = createAction<OpenfinReadyPayload, string>(OPENFIN_READY, finName => ({ finName }));
export const setIsEnterprise = createAction(SET_IS_ENTERPRISE);
