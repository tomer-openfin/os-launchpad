import { createAction, createAsyncActionCreators } from '../utils';
import { Manifest, ManifestOverride, OpenfinReadyPayload, ReboundLauncherRequestPayload } from './types';

// Action Types
const APPLICATION_STARTED = 'APPLICATION_STARTED';
const COLLAPSE_APP = 'COLLAPSE_APP';
const EXIT_APPLICATION = 'EXIT_APPLICATION';
const EXPAND_APP = 'EXPAND_APP';
const INIT_DEV_TOOLS = 'INIT_DEV_TOOLS';
const LAUNCH_APP_LAUNCHER = 'LAUNCH_APP_LAUNCHER';
const OPENFIN_READY = 'OPENFIN_READY';
const RESET_APPLICATION_UI = 'RESET_APPLICATION_UI';
const SET_IS_DRAG_AND_DROP = 'SET_IS_DRAG_AND_DROP';
const SET_IS_DRAWER_EXPANDED = 'SET_IS_DRAWER_EXPANDED';
const SET_IS_ENTERPRISE = 'SET_IS_ENTERPRISE';
const SET_IS_EXPANDED = 'SET_IS_EXPANDED';
const SET_RUNTIME_VERSION = 'SET_RUNTIME_VERSION';
// REBOUND_LAUNCHER
const REBOUND_LAUNCHER_REQUEST = 'REBOUND_LAUNCHER_REQUEST';
const REBOUND_LAUNCHER_SUCCESS = 'REBOUND_LAUNCHER_SUCCESS';
const REBOUND_LAUNCHER_FAILURE = 'REBOUND_LAUNCHER_FAILURE';
// GET_MANIFEST_OVERRIDE
const GET_MANIFEST_OVERRIDE_REQUEST = 'GET_MANIFEST_OVERRIDE_REQUEST';
const GET_MANIFEST_OVERRIDE_SUCCESS = 'GET_MANIFEST_OVERRIDE_SUCCESS';
const GET_MANIFEST_OVERRIDE_FAILURE = 'GET_MANIFEST_OVERRIDE_FAILURE';
// UPDATE_MANIFEST_OVERRIDE
const UPDATE_MANIFEST_OVERRIDE_REQUEST = 'UPDATE_MANIFEST_OVERRIDE_REQUEST';
const UPDATE_MANIFEST_OVERRIDE_SUCCESS = 'UPDATE_MANIFEST_OVERRIDE_SUCCESS';
const UPDATE_MANIFEST_OVERRIDE_FAILURE = 'UPDATE_MANIFEST_OVERRIDE_FAILURE';
// GET_MANIFEST
const GET_MANIFEST_REQUEST = 'GET_MANIFEST_REQUEST';
const GET_MANIFEST_SUCCESS = 'GET_MANIFEST_SUCCESS';
const GET_MANIFEST_FAILURE = 'GET_MANIFEST_FAILURE';
// FETCH_MANIFEST
const FETCH_MANIFEST_REQUEST = 'FETCH_MANIFEST_REQUEST';
const FETCH_MANIFEST_SUCCESS = 'FETCH_MANIFEST_SUCCESS';
const FETCH_MANIFEST_FAILURE = 'FETCH_MANIFEST_FAILURE';

// Action Creators
export const applicationStarted = createAction(APPLICATION_STARTED)();
export const collapseApp = createAction(COLLAPSE_APP)();
export const exitApplication = createAction(EXIT_APPLICATION)();
export const expandApp = createAction(EXPAND_APP)();
export const initDevTools = createAction(INIT_DEV_TOOLS)();
export const launchAppLauncher = createAction(LAUNCH_APP_LAUNCHER)();
export const openfinReady = createAction(OPENFIN_READY)<OpenfinReadyPayload>();
export const resetApplicationUi = createAction(RESET_APPLICATION_UI)();
export const setIsDragAndDrop = createAction(SET_IS_DRAG_AND_DROP)<boolean>();
export const setIsDrawerExpanded = createAction(SET_IS_DRAWER_EXPANDED)<boolean>();
export const setIsEnterprise = createAction(SET_IS_ENTERPRISE)<boolean>();
export const setIsExpanded = createAction(SET_IS_EXPANDED)<boolean>();
export const setRuntimeVersion = createAction(SET_RUNTIME_VERSION)<string>();
export const reboundLauncher = createAsyncActionCreators(REBOUND_LAUNCHER_REQUEST, REBOUND_LAUNCHER_SUCCESS, REBOUND_LAUNCHER_FAILURE)<
  ReboundLauncherRequestPayload,
  void,
  Error
>();
export const getManifestOverride = createAsyncActionCreators(GET_MANIFEST_OVERRIDE_REQUEST, GET_MANIFEST_OVERRIDE_SUCCESS, GET_MANIFEST_OVERRIDE_FAILURE)<
  void,
  ManifestOverride,
  Error
>();
export const updateManifestOverride = createAsyncActionCreators(
  UPDATE_MANIFEST_OVERRIDE_REQUEST,
  UPDATE_MANIFEST_OVERRIDE_SUCCESS,
  UPDATE_MANIFEST_OVERRIDE_FAILURE,
)<ManifestOverride, ManifestOverride, Error>();
export const fetchManifest = createAsyncActionCreators(FETCH_MANIFEST_REQUEST, FETCH_MANIFEST_SUCCESS, FETCH_MANIFEST_FAILURE)<void, Manifest, Error>();
export const getManifest = createAsyncActionCreators(GET_MANIFEST_REQUEST, GET_MANIFEST_SUCCESS, GET_MANIFEST_FAILURE)<void, Manifest, Error>();
