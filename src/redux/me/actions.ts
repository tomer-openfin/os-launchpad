import { MonitorDetails } from '../../types/commons';
import { createAction, createAsyncActionCreators } from '../utils';
import {
  ConfirmPasswordPayload,
  ForgotPasswordPayload,
  LoginErrorPayload,
  LoginRequestPayload,
  LoginSuccessPayload,
  MeAuthMessagingState,
  MeSettingsState,
  SetAppIdsPayload,
  SetLauncherPositionPayload,
  SetLauncherSizePayload,
  SetSystemTrayEnabledPayload,
  UpdatePasswordRequestPayload,
} from './types';

// Action Types
const ADD_TO_APP_LAUNCHER = 'ADD_TO_APP_LAUNCHER';
const REMOVE_FROM_APP_LAUNCHER = 'REMOVE_FROM_APP_LAUNCHER';
const RESET_SETTINGS = 'RESET_SETTINGS';
const SET_APP_IDS = 'SET_APP_IDS';
const SET_LAUNCHER_MONITOR_SETTINGS = 'SET_LAUNCHER_MONITOR_SETTINGS';
const SET_LAUNCHER_POSITION = 'SET_LAUNCHER_POSITION';
const SET_LAUNCHER_SIZE = 'SET_LAUNCHER_SIZE';
const SET_AUTH_MESSAGING = 'SET_AUTH_MESSAGING';
const SET_SYSTEM_TRAY_ENABLED = 'SET_SYSTEM_TRAY_ENABLED';
// LOGIN
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
// LOGOUT
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
// CONFIRM_PASSWORD
const CONFIRM_PASSWORD_REQUEST = 'CONFIRM_PASSWORD_REQUEST';
const CONFIRM_PASSWORD_SUCCESS = 'CONFIRM_PASSWORD_SUCCESS';
const CONFIRM_PASSWORD_FAILURE = 'CONFIRM_PASSWORD_FAILURE';
// FORGOT_PASSWORD
const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';
// GET_SETTINGS
const GET_SETTINGS_REQUEST = 'GET_SETTINGS_REQUEST';
const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
const GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE';
// SAVE_SETTINGS
const SAVE_SETTINGS_REQUEST = 'SAVE_SETTINGS_REQUEST';
const SAVE_SETTINGS_SUCCESS = 'SAVE_SETTINGS_SUCCESS';
const SAVE_SETTINGS_FAILURE = 'SAVE_SETTINGS_FAILURE';
// UPDATE_PASSWORD
const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

// Action Creators
export const addToAppLauncher = createAction(ADD_TO_APP_LAUNCHER)<string>();
export const removeFromAppLauncher = createAction(REMOVE_FROM_APP_LAUNCHER)<string>();
export const resetSettings = createAction(RESET_SETTINGS)();
export const setAppIds = createAction(SET_APP_IDS)<SetAppIdsPayload>();
export const setLauncherMonitorSettings = createAction(SET_LAUNCHER_MONITOR_SETTINGS)<MonitorDetails>();
export const setLauncherPosition = createAction(SET_LAUNCHER_POSITION)<SetLauncherPositionPayload>();
export const setLauncherSize = createAction(SET_LAUNCHER_SIZE)<SetLauncherSizePayload>();
export const setAuthMessaging = createAction(SET_AUTH_MESSAGING)<MeAuthMessagingState>();
export const setSystemTrayEnabled = createAction(SET_SYSTEM_TRAY_ENABLED)<SetSystemTrayEnabledPayload>();

export const login = createAsyncActionCreators(LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE)<
  LoginRequestPayload,
  LoginSuccessPayload,
  Error,
  { onFailure: (error: Error, errorPayload: LoginErrorPayload) => void }
>();

export const logout = createAsyncActionCreators(LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE)<
  MeAuthMessagingState | void,
  MeAuthMessagingState | void,
  Error
>();
export const confirmPassword = createAsyncActionCreators(CONFIRM_PASSWORD_REQUEST, CONFIRM_PASSWORD_SUCCESS, CONFIRM_PASSWORD_FAILURE)<
  ConfirmPasswordPayload,
  void,
  Error
>();
export const forgotPassword = createAsyncActionCreators(FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE)<
  ForgotPasswordPayload,
  void,
  Error
>();
export const getSettings = createAsyncActionCreators(GET_SETTINGS_REQUEST, GET_SETTINGS_SUCCESS, GET_SETTINGS_FAILURE)<void, MeSettingsState, Error>();
export const saveSettings = createAsyncActionCreators(SAVE_SETTINGS_REQUEST, SAVE_SETTINGS_SUCCESS, SAVE_SETTINGS_FAILURE)<void, void, Error>();
export const updatePassword = createAsyncActionCreators(UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE)<
  UpdatePasswordRequestPayload,
  void,
  Error
>();
