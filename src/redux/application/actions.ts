import { createAction } from 'redux-actions';

import { OpenfinReadyPayload } from './types';

// Action Types
export const APPLICATION_STARTED = 'APPLICATION_STARTED';
export const COLLAPSE_APP = 'COLLAPSE_APP';
export const EXPAND_APP = 'EXPAND_APP';
export const LAUNCH_APP_LAUNCHER = 'LAUNCH_APP_LAUNCHER';
export const OPENFIN_READY = 'OPENFIN_READY';
export const SET_IS_ENTERPRISE = 'SET_IS_ENTERPRISE';
export const SET_IS_EXPANDED = 'SET_IS_EXPANDED';

// Action Creators
export const applicationStarted = createAction(APPLICATION_STARTED);
export const collapseApp = createAction(COLLAPSE_APP);
export const expandApp = createAction(EXPAND_APP);
export const launchAppLauncher = createAction(LAUNCH_APP_LAUNCHER);
export const openfinReady = createAction<OpenfinReadyPayload, string>(OPENFIN_READY, finName => ({ finName }));
export const setIsEnterprise = createAction(SET_IS_ENTERPRISE);
export const setIsExpanded = createAction(SET_IS_EXPANDED);
