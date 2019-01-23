import { createAction } from 'redux-actions';

import { DirectionalPosition, ErrorResponse } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import {
  ChangePasswordPayload,
  LoginRequestPayload,
  LoginSuccessPayload,
  LoginWithNewPasswordPayload,
  MeSettingsState,
  SetAppIdsPayload,
  SetAutoHidePayload,
  SetLaunchbarPayload,
  SetMePayload,
} from './types';

// Action Types
export const LOGIN = generateAsyncActionTypes('LOGIN');
export const LOGOUT = generateAsyncActionTypes('LOGOUT');
export const LOGIN_WITH_NEW_PASSWORD = 'LOGIN_WITH_NEW_PASSWORD';

export const GET_ME = generateAsyncActionTypes('GET_ME');

export const SET_ME = 'SET_ME';

export const GET_SETTINGS = generateAsyncActionTypes('GET_SETTINGS');
export const SAVE_SETTINGS = generateAsyncActionTypes('SAVE_SETTINGS');

export const SAVE_APP_IDS = 'SAVE_APP_IDS';
export const SET_APPLICATION_LAUNCHER = 'SET_APPLICATION_LAUNCHER';
export const SET_APP_IDS = 'SET_APP_IDS';
export const SET_AUTO_HIDE = 'SET_AUTO_HIDE';
export const SET_LAUNCHER_POSITION = 'SET_LAUNCHER_POSITION';

export const ADD_TO_APP_LAUNCHER = 'ADD_TO_APP_LAUNCHER';
export const REMOVE_FROM_APP_LAUNCHER = 'REMOVE_FROM_APP_LAUNCHER';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

// Action Creators
export const getSettingsRequest = createAction(GET_SETTINGS.REQUEST);
export const getSettingsSuccess = createAction<MeSettingsState>(GET_SETTINGS.SUCCESS);
export const getSettingsError = createAction<ErrorResponse>(GET_SETTINGS.ERROR);

export const loginRequest = createAction<LoginRequestPayload>(LOGIN.REQUEST);
export const loginSuccess = createAction<LoginSuccessPayload>(LOGIN.SUCCESS);
export const loginError = createAction<ErrorResponse>(LOGIN.ERROR);

export const logoutRequest = createAction(LOGOUT.REQUEST);
export const logoutSuccess = createAction(LOGOUT.SUCCESS);
export const logoutError = createAction<ErrorResponse>(LOGOUT.ERROR);

export const loginWithNewPassword = createAction<LoginWithNewPasswordPayload>(LOGIN_WITH_NEW_PASSWORD);

export const saveSettingsRequest = createAction(SAVE_SETTINGS.REQUEST);
export const saveSettingsSuccess = createAction(SAVE_SETTINGS.SUCCESS);
export const saveSettingsError = createAction<ErrorResponse>(SAVE_SETTINGS.ERROR);

export const getMeRequest = createAction(GET_ME.REQUEST);
export const getMeSuccess = createAction<LoginSuccessPayload>(GET_ME.SUCCESS);
export const getMeError = createAction<ErrorResponse>(GET_ME.ERROR);

export const setMe = createAction<SetMePayload>(SET_ME);

export const setAppIds = createAction<SetAppIdsPayload, string[]>(SET_APP_IDS, appIds => ({ appIds }));
export const setAutoHide = createAction<SetAutoHidePayload, boolean>(SET_AUTO_HIDE, autoHide => ({ autoHide }));
export const setLaunchbarPosition = createAction<SetLaunchbarPayload, DirectionalPosition>(SET_LAUNCHER_POSITION, launcherPosition => ({ launcherPosition }));

export const addToAppLauncher = createAction<string>(ADD_TO_APP_LAUNCHER);
export const removeFromAppLauncher = createAction<string>(REMOVE_FROM_APP_LAUNCHER);

export const changePassword = createAction<ChangePasswordPayload>(CHANGE_PASSWORD);
