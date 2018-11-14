import { createAction } from 'redux-actions';

import { ErrorResponse } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { LoginRequestPayload, LoginSuccessPayload, MeStateSettings, SetLaunchbarPayload, SetMePayload } from './';

// Action Types
export const GET_SETTINGS = generateAsyncActionTypes('GET_SETTINGS');
export const LOGIN = generateAsyncActionTypes('LOGIN');
export const SAVE_SETTINGS = generateAsyncActionTypes('SAVE_SETTINGS');
export const SET_LAUNCHBAR_POSITION = 'SET_LAUNCHBAR_POSITION';
export const SET_APPLICATION_LAUNCHER = 'SET_APPLICATION_LAUNCHER';
export const SET_ME = 'SET_ME';
export const SET_AUTO_HIDE = 'SET_AUTO_HIDE';

// Action Creators
export const getSettingsRequest = createAction(GET_SETTINGS.REQUEST);
export const getSettingsSuccess = createAction<MeStateSettings>(GET_SETTINGS.SUCCESS);
export const getSettingsError = createAction<ErrorResponse>(GET_SETTINGS.ERROR);
export const loginRequest = createAction<LoginRequestPayload>(LOGIN.REQUEST);
export const loginSuccess = createAction<LoginSuccessPayload>(LOGIN.SUCCESS);
export const loginError = createAction<ErrorResponse>(LOGIN.ERROR);
export const saveSettingsRequest = createAction<MeStateSettings>(SAVE_SETTINGS.REQUEST);
export const saveSettingsSuccess = createAction(SAVE_SETTINGS.SUCCESS);
export const saveSettingsError = createAction<ErrorResponse>(SAVE_SETTINGS.ERROR);
export const setMe = createAction<SetMePayload, boolean, string>(SET_ME, (isAdmin, username) => ({
  isAdmin,
  username,
}));
export const setLaunchbarPosition = createAction<SetLaunchbarPayload, 'TOP' | 'RIGHT' | 'LEFT' | 'BOTTOM'>(SET_LAUNCHBAR_POSITION, launcherPosition => ({
  launcherPosition,
}));
export const setAutoHide = createAction(SET_AUTO_HIDE);
