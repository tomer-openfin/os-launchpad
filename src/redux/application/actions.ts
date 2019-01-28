import { createAction } from 'redux-actions';

import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { OpenfinReadyPayload, ReboundLauncherRequestPayload } from './types';

// Action Types
export const APPLICATION_STARTED = 'APPLICATION_STARTED';
export const COLLAPSE_APP = 'COLLAPSE_APP';
export const EXIT_APPLICATION = 'EXIT_APPLICATION';
export const EXPAND_APP = 'EXPAND_APP';
export const INIT_DEV_TOOLS = 'INIT_DEV_TOOLS';
export const LAUNCH_APP_LAUNCHER = 'LAUNCH_APP_LAUNCHER';
export const OPENFIN_READY = 'OPENFIN_READY';
export const REBOUND_LAUNCHER = generateAsyncActionTypes('REBOUND_LAUNCHER');
export const SET_IS_DRAG_AND_DROP = 'SET_IS_DRAG_AND_DROP';
export const SET_IS_DRAWER_EXPANDED = 'SET_IS_DRAWER_EXPANDED';
export const SET_IS_ENTERPRISE = 'SET_IS_ENTERPRISE';
export const SET_IS_EXPANDED = 'SET_IS_EXPANDED';
export const SET_RUNTIME_VERSION = 'SET_RUNTIME_VERSION';

// Action Creators
export const applicationStarted = createAction(APPLICATION_STARTED);
export const collapseApp = createAction(COLLAPSE_APP);
export const exitApplication = createAction(EXIT_APPLICATION);
export const expandApp = createAction(EXPAND_APP);
export const initDevTools = createAction(INIT_DEV_TOOLS);
export const launchAppLauncher = createAction(LAUNCH_APP_LAUNCHER);
export const openfinReady = createAction<OpenfinReadyPayload, string>(OPENFIN_READY, finName => ({ finName }));
export const reboundLauncherRequest = createAction<ReboundLauncherRequestPayload, boolean, number>(
  REBOUND_LAUNCHER.REQUEST,
  (shouldAnimate: boolean, delay: number) => ({
    delay,
    shouldAnimate,
  }),
);
export const reboundLauncherSuccess = createAction(REBOUND_LAUNCHER.SUCCESS);
export const reboundLauncherError = createAction(REBOUND_LAUNCHER.ERROR);
export const setIsDragAndDrop = createAction(SET_IS_DRAG_AND_DROP);
export const setIsDrawerExpanded = createAction(SET_IS_DRAWER_EXPANDED);
export const setIsEnterprise = createAction(SET_IS_ENTERPRISE);
export const setIsExpanded = createAction(SET_IS_EXPANDED);
export const setRuntimeVersion = createAction(SET_RUNTIME_VERSION);
