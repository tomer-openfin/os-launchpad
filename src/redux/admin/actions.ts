import { createAction } from 'redux-actions';

import { App, ErrorResponse, User } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import noop from '../../utils/noop';

// Action Types
export const GET_ADMIN_APPS = generateAsyncActionTypes('GET_ADMIN_APPS');
export const CREATE_ADMIN_APP = generateAsyncActionTypes('CREATE_ADMIN_APP');
export const UPDATE_ADMIN_APP = generateAsyncActionTypes('UPDATE_ADMIN_APP');
export const DELETE_ADMIN_APP = generateAsyncActionTypes('DELETE_ADMIN_APP');

export const GET_ADMIN_USERS = generateAsyncActionTypes('GET_ADMIN_USERS');
export const CREATE_ADMIN_USER = generateAsyncActionTypes('CREATE_ADMIN_USER');
export const UPDATE_ADMIN_USER = generateAsyncActionTypes('UPDATE_ADMIN_USER');
export const DELETE_ADMIN_USER = generateAsyncActionTypes('DELETE_ADMIN_USER');

// Action Creators
export const getAdminAppsRequest = createAction(GET_ADMIN_APPS.REQUEST, noop);
export const getAdminAppsSuccess = createAction<App[]>(GET_ADMIN_APPS.SUCCESS);
export const getAdminAppsError = createAction<ErrorResponse>(GET_ADMIN_APPS.ERROR);

export const createAdminAppRequest = createAction<App>(CREATE_ADMIN_APP.REQUEST);
export const createAdminAppSuccess = createAction<App>(CREATE_ADMIN_APP.SUCCESS);
export const createAdminAppError = createAction<ErrorResponse>(CREATE_ADMIN_APP.ERROR);

export const updateAdminAppRequest = createAction<App>(UPDATE_ADMIN_APP.REQUEST);
export const updateAdminAppSuccess = createAction<App>(UPDATE_ADMIN_APP.SUCCESS);
export const updateAdminAppError = createAction<ErrorResponse>(UPDATE_ADMIN_APP.ERROR);

export const deleteAdminAppRequest = createAction<App>(DELETE_ADMIN_APP.REQUEST);
export const deleteAdminAppSuccess = createAction<App>(DELETE_ADMIN_APP.SUCCESS);
export const deleteAdminAppError = createAction<ErrorResponse>(DELETE_ADMIN_APP.ERROR);

export const getAdminUsersRequest = createAction(GET_ADMIN_USERS.REQUEST, noop);
export const getAdminUsersSuccess = createAction<User[]>(GET_ADMIN_USERS.SUCCESS);
export const getAdminUsersError = createAction<ErrorResponse>(GET_ADMIN_USERS.ERROR);

export const createAdminUserRequest = createAction<User>(CREATE_ADMIN_USER.REQUEST);
export const createAdminUserSuccess = createAction<User>(CREATE_ADMIN_USER.SUCCESS);
export const createAdminUserError = createAction<ErrorResponse>(CREATE_ADMIN_USER.ERROR);

export const updateAdminUserRequest = createAction<User>(UPDATE_ADMIN_USER.REQUEST);
export const updateAdminUserSuccess = createAction<User>(UPDATE_ADMIN_USER.SUCCESS);
export const updateAdminUserError = createAction<ErrorResponse>(UPDATE_ADMIN_USER.ERROR);

export const deleteAdminUserRequest = createAction<User>(DELETE_ADMIN_USER.REQUEST);
export const deleteAdminUserSuccess = createAction<User>(DELETE_ADMIN_USER.SUCCESS);
export const deleteAdminUserError = createAction<ErrorResponse>(DELETE_ADMIN_USER.ERROR);
