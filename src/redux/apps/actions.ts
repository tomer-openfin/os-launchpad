import { createAction } from 'redux-actions';

import noop from '../../utils/noop';
import { App } from './';

// Action Types
export const GET_APP_DIRECTORY_LIST = 'GET_APP_DIRECTORY_LIST';
export const SET_APP_DIRECTORY_LIST = 'SET_APP_DIRECTORY_LIST';
export const ADD_TO_APP_LAUNCHER = 'ADD_TO_APP_LAUNCHER';
export const REMOVE_FROM_APP_LAUNCHER = 'REMOVE_FROM_APP_LAUNCHER';

// Action Creators
export const getAppDirectoryList = createAction(GET_APP_DIRECTORY_LIST, noop);
export const setAppDirectoryList = createAction(SET_APP_DIRECTORY_LIST, (appList: App[]) => ({
  appList,
}));
export const addToAppLauncher = createAction(ADD_TO_APP_LAUNCHER, (id: string) => ({
  id,
}));
export const removeFromAppLauncher = createAction(REMOVE_FROM_APP_LAUNCHER, (id: string) => ({
  id,
}));
