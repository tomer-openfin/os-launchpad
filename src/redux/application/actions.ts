import { createAction } from 'redux-actions';

import { ErrorResponse, MetaWithCallbacks } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { metaWithCallbacksCreator, payloadIdentityCreator } from '../../utils/metaAndPayloadCreators';
import { ManifestImageViewKeys } from '../../utils/orgImages';
import { ManifestOverride, OpenfinReadyPayload, ReboundLauncherRequestPayload } from './types';

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

export const UPDATE_MANIFEST_OVERRIDE = generateAsyncActionTypes('UPDATE_MANIFEST_OVERRIDE');
export const GET_MANIFEST_OVERRIDE = generateAsyncActionTypes('GET_MANIFEST_OVERRIDE');

export const GET_MANIFEST = generateAsyncActionTypes('GET_MANIFEST');
export const FETCH_MANIFEST = generateAsyncActionTypes('FETCH_MANIFEST');

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

export const getManifestOverrideRequest = createAction(GET_MANIFEST_OVERRIDE.REQUEST);
export const getManifestOverrideSuccess = createAction(GET_MANIFEST_OVERRIDE.SUCCESS);
export const getManifestOverrideError = createAction(GET_MANIFEST_OVERRIDE.ERROR);

export const updateManifestOverrideRequest = createAction<ManifestOverride, MetaWithCallbacks>(
  UPDATE_MANIFEST_OVERRIDE.REQUEST,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);
export const updateManifestOverrideSuccess = createAction<ManifestOverride, MetaWithCallbacks>(
  UPDATE_MANIFEST_OVERRIDE.SUCCESS,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);
export const updateManifestOverrideError = createAction<ErrorResponse, MetaWithCallbacks>(
  UPDATE_MANIFEST_OVERRIDE.ERROR,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);

export const fetchManifestRequest = createAction(FETCH_MANIFEST.REQUEST);
export const fetchManifestSuccess = createAction(FETCH_MANIFEST.SUCCESS);
export const fetchManifestError = createAction(FETCH_MANIFEST.ERROR);
export const getManifestRequest = createAction(GET_MANIFEST.REQUEST);
export const getManifestSuccess = createAction(GET_MANIFEST.SUCCESS);
export const getManifestError = createAction(GET_MANIFEST.ERROR);
