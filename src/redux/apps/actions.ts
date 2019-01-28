import { createAction } from 'redux-actions';

import { App } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import noop from '../../utils/noop';
import { CloseFinAppPayload, FinAppStatusStatePayload, OpenFinAppErrorPayload, OpenFinAppSuccessPayload } from './types';

// Action Types
export const CLOSE_FIN_APP = generateAsyncActionTypes('CLOSE_FIN_APP');
export const OPEN_FIN_APP = generateAsyncActionTypes('OPEN_FIN_APP');
export const SET_FIN_APP_STATUS_STATE = 'SET_FIN_APP_STATUS_STATE';
export const GET_APP_DIRECTORY_LIST = 'GET_APP_DIRECTORY_LIST';
export const SET_APP_DIRECTORY_LIST = 'SET_APP_DIRECTORY_LIST';

// Action Creators
export const closeFinAppRequest = createAction<CloseFinAppPayload>(CLOSE_FIN_APP.REQUEST);
export const closeFinAppSuccess = createAction<CloseFinAppPayload>(CLOSE_FIN_APP.SUCCESS);
export const closeFinAppError = createAction<CloseFinAppPayload>(CLOSE_FIN_APP.ERROR);
export const openFinAppRequest = createAction<App>(OPEN_FIN_APP.REQUEST);
export const openFinAppSuccess = createAction<OpenFinAppSuccessPayload>(OPEN_FIN_APP.SUCCESS);
export const openFinAppError = createAction<OpenFinAppErrorPayload>(OPEN_FIN_APP.ERROR);
export const getAppDirectoryList = createAction(GET_APP_DIRECTORY_LIST, noop);
export const setAppDirectoryList = createAction<App[]>(SET_APP_DIRECTORY_LIST);
export const setFinAppStatusState = createAction<FinAppStatusStatePayload>(SET_FIN_APP_STATUS_STATE);
