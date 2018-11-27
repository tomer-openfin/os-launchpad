import { createAction } from 'redux-actions';

import { App, ErrorResponse } from '../../types/commons';
import noop from '../../utils/noop';

// Action Types
export const GET_APP_DIRECTORY_LIST = 'GET_APP_DIRECTORY_LIST';
export const SET_APP_DIRECTORY_LIST = 'SET_APP_DIRECTORY_LIST';

// Action Creators
export const getAppDirectoryList = createAction(GET_APP_DIRECTORY_LIST, noop);
export const setAppDirectoryList = createAction<App[]>(SET_APP_DIRECTORY_LIST);
