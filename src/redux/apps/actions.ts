import { createAction } from 'redux-actions';

import { App } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { CloseFinAppPayload, FinAppStatusStatePayload, OpenFinAppErrorPayload, OpenFinAppSuccessPayload } from './types';

// Action Types
export const CLOSE_FIN_APP = generateAsyncActionTypes('CLOSE_FIN_APP');
export const OPEN_FIN_APP = generateAsyncActionTypes('OPEN_FIN_APP');
export const SET_FIN_APP_STATUS_STATE = 'SET_FIN_APP_STATUS_STATE';
export const GET_APP_DIRECTORY_LIST = generateAsyncActionTypes('GET_APP_DIRECTORY_LIST');

// Action Creators
export const closeFinAppRequest = createAction<CloseFinAppPayload>(CLOSE_FIN_APP.REQUEST);
export const closeFinAppSuccess = createAction<CloseFinAppPayload>(CLOSE_FIN_APP.SUCCESS);
export const closeFinAppError = createAction<CloseFinAppPayload>(CLOSE_FIN_APP.ERROR);
export const openFinAppRequest = createAction<App>(OPEN_FIN_APP.REQUEST);
export const openFinAppSuccess = createAction<OpenFinAppSuccessPayload>(OPEN_FIN_APP.SUCCESS);
export const openFinAppError = createAction<OpenFinAppErrorPayload>(OPEN_FIN_APP.ERROR);
export const getAppDirectoryListRequest = createAction(GET_APP_DIRECTORY_LIST.REQUEST);
export const getAppDirectoryListSuccess = createAction<App[]>(GET_APP_DIRECTORY_LIST.SUCCESS);
export const getAppDirectoryListError = createAction(GET_APP_DIRECTORY_LIST.ERROR);
export const setFinAppStatusState = createAction<FinAppStatusStatePayload>(SET_FIN_APP_STATUS_STATE);
