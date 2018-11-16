import { createAction } from 'redux-actions';

import { App, ErrorResponse } from '../../types/commons';
import noop from '../../utils/noop';

import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';

// Action Types
export const GET_APP_DIRECTORY_LIST = 'GET_APP_DIRECTORY_LIST';
export const SET_APP_DIRECTORY_LIST = 'SET_APP_DIRECTORY_LIST';

export const SET_APP_LAUNCHER_IDS = 'SET_APP_LAUNCHER_LIST';

export const ADD_TO_APP_LAUNCHER = 'ADD_TO_APP_LAUNCHER';
export const REMOVE_FROM_APP_LAUNCHER = 'REMOVE_FROM_APP_LAUNCHER';

export const GET_LAUNCHER_APP_IDS = generateAsyncActionTypes('GET_LAUNCHER_APP_IDS');
export const SAVE_LAUNCHER_APP_IDS = generateAsyncActionTypes('SAVE_LAUNCHER_APP_IDS');

// Action Creators
export const getAppDirectoryList = createAction(GET_APP_DIRECTORY_LIST, noop);
export const setAppDirectoryList = createAction<App[]>(SET_APP_DIRECTORY_LIST);

export const setAppLauncherIds = createAction<string[]>(SET_APP_LAUNCHER_IDS);

export const addToAppLauncher = createAction<string>(ADD_TO_APP_LAUNCHER);
export const removeFromAppLauncher = createAction<string>(REMOVE_FROM_APP_LAUNCHER);

export const getLauncherAppIdsError = createAction<ErrorResponse>(GET_LAUNCHER_APP_IDS.ERROR);
export const getLauncherAppIdsRequest = createAction(GET_LAUNCHER_APP_IDS.REQUEST);
export const getLauncherAppIdsSuccess = createAction(GET_LAUNCHER_APP_IDS.SUCCESS);

export const saveLauncherAppIdsError = createAction<ErrorResponse>(SAVE_LAUNCHER_APP_IDS.ERROR);
export const saveLauncherAppIdsRequest = createAction<string[]>(SAVE_LAUNCHER_APP_IDS.REQUEST);
export const saveLauncherAppIdsSuccess = createAction(SAVE_LAUNCHER_APP_IDS.SUCCESS);
