import { createAction } from 'redux-actions';

import { APIResponse, DirectionalPosition, ErrorResponse, LauncherSize, MetaWithCallbacks, MonitorDetails } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { metaWithCallbacksCreator, payloadIdentityCreator } from '../../utils/metaAndPayloadCreators';
import {
  ConfirmPasswordPayload,
  ForgotPasswordPayload,
  LoginErrorPayload,
  LoginRequestPayload,
  LoginSuccessPayload,
  LoginWithNewPasswordPayload,
  MeSettingsState,
  NewPasswordPayload,
  SetAppIdsPayload,
  SetAutoHidePayload,
  SetLauncherPositionPayload,
  SetLauncherSizePayload,
  SetMePayload,
  UpdatePasswordErrorPayload,
  UpdatePasswordRequestPayload,
  UpdatePasswordSuccessPayload,
} from './types';

// Action Types
export const LOGIN = generateAsyncActionTypes('LOGIN');
export const LOGOUT = generateAsyncActionTypes('LOGOUT');
export const LOGIN_WITH_NEW_PASSWORD = 'LOGIN_WITH_NEW_PASSWORD';

export const CONFIRM_PASSWORD = generateAsyncActionTypes('CONFIRM_PASSWORD');
export const FORGOT_PASSWORD = generateAsyncActionTypes('FORGOT_PASSWORD');

export const GET_ME = generateAsyncActionTypes('GET_ME');

export const SET_ME = 'SET_ME';

export const GET_SETTINGS = generateAsyncActionTypes('GET_SETTINGS');
export const SAVE_SETTINGS = generateAsyncActionTypes('SAVE_SETTINGS');

export const SAVE_APP_IDS = 'SAVE_APP_IDS';
export const SET_APPLICATION_LAUNCHER = 'SET_APPLICATION_LAUNCHER';
export const SET_APP_IDS = 'SET_APP_IDS';
export const SET_AUTO_HIDE = 'SET_AUTO_HIDE';
export const SET_LAUNCHER_POSITION = 'SET_LAUNCHER_POSITION';
export const SET_LAUNCHER_SIZE = 'SET_LAUNCHER_SIZE';
export const SET_LAUNCHER_MONITOR_SETTINGS = 'SET_LAUNCHER_MONITOR_SETTINGS';

export const ADD_TO_APP_LAUNCHER = 'ADD_TO_APP_LAUNCHER';
export const REMOVE_FROM_APP_LAUNCHER = 'REMOVE_FROM_APP_LAUNCHER';

export const UPDATE_PASSWORD = generateAsyncActionTypes('UPDATE_PASSWORD');

// Action Creators
export const forgotPasswordRequest = createAction<ForgotPasswordPayload, MetaWithCallbacks>(
  FORGOT_PASSWORD.REQUEST,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);
export const forgotPasswordSuccess = createAction<APIResponse, MetaWithCallbacks>(FORGOT_PASSWORD.SUCCESS, payloadIdentityCreator, metaWithCallbacksCreator);
export const forgotPasswordError = createAction<ErrorResponse, MetaWithCallbacks>(FORGOT_PASSWORD.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);

export const confirmPasswordRequest = createAction<ConfirmPasswordPayload, MetaWithCallbacks>(
  CONFIRM_PASSWORD.REQUEST,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);
export const confirmPasswordSuccess = createAction<APIResponse, MetaWithCallbacks>(CONFIRM_PASSWORD.SUCCESS, payloadIdentityCreator, metaWithCallbacksCreator);
export const confirmPasswordError = createAction<ErrorResponse, MetaWithCallbacks>(CONFIRM_PASSWORD.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);

export const getSettingsRequest = createAction(GET_SETTINGS.REQUEST);
export const getSettingsSuccess = createAction<MeSettingsState>(GET_SETTINGS.SUCCESS);
export const getSettingsError = createAction<ErrorResponse>(GET_SETTINGS.ERROR);

export const loginRequest = createAction<LoginRequestPayload, MetaWithCallbacks>(LOGIN.REQUEST, payloadIdentityCreator, metaWithCallbacksCreator);
export const loginSuccess = createAction<LoginSuccessPayload, MetaWithCallbacks>(LOGIN.SUCCESS, payloadIdentityCreator, metaWithCallbacksCreator);
export const loginError = createAction<LoginErrorPayload, MetaWithCallbacks>(LOGIN.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);

export const logoutRequest = createAction(LOGOUT.REQUEST);
export const logoutSuccess = createAction(LOGOUT.SUCCESS);
export const logoutError = createAction<ErrorResponse>(LOGOUT.ERROR);

export const loginWithNewPassword = createAction<LoginWithNewPasswordPayload, MetaWithCallbacks>(
  LOGIN_WITH_NEW_PASSWORD,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);

export const saveSettingsRequest = createAction(SAVE_SETTINGS.REQUEST);
export const saveSettingsSuccess = createAction(SAVE_SETTINGS.SUCCESS);
export const saveSettingsError = createAction<ErrorResponse>(SAVE_SETTINGS.ERROR);

export const getMeRequest = createAction(GET_ME.REQUEST);
export const getMeSuccess = createAction<LoginSuccessPayload>(GET_ME.SUCCESS);
export const getMeError = createAction<ErrorResponse>(GET_ME.ERROR);

export const setMe = createAction<SetMePayload>(SET_ME);

export const setAppIds = createAction<SetAppIdsPayload, string[]>(SET_APP_IDS, appIds => ({ appIds }));
export const setAutoHide = createAction<SetAutoHidePayload, boolean>(SET_AUTO_HIDE, autoHide => ({ autoHide }));
export const setLauncherPosition = createAction<SetLauncherPositionPayload, DirectionalPosition>(SET_LAUNCHER_POSITION, launcherPosition => ({
  launcherPosition,
}));
export const setLauncherSize = createAction<SetLauncherSizePayload, LauncherSize>(SET_LAUNCHER_SIZE, launcherSize => ({ launcherSize }));
export const setLauncherMonitorSettings = createAction<MonitorDetails>(SET_LAUNCHER_MONITOR_SETTINGS);

export const addToAppLauncher = createAction<string>(ADD_TO_APP_LAUNCHER);
export const removeFromAppLauncher = createAction<string>(REMOVE_FROM_APP_LAUNCHER);

export const updatePasswordRequest = createAction<UpdatePasswordRequestPayload, MetaWithCallbacks>(
  UPDATE_PASSWORD.REQUEST,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);
export const updatePasswordSuccess = createAction<UpdatePasswordSuccessPayload, MetaWithCallbacks>(
  UPDATE_PASSWORD.SUCCESS,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);
export const updatePasswordError = createAction<UpdatePasswordErrorPayload, MetaWithCallbacks>(
  UPDATE_PASSWORD.ERROR,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);
