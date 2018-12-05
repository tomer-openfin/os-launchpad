import { createAction } from 'redux-actions';

import { App, ErrorResponse, MetaWithCallbacks, User } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import noop from '../../utils/noop';

const payloadIdentityCreator = <T>(payload: T): T => payload;

const metaWithCallbacksCreator = <T extends MetaWithCallbacks>(_, meta: T): T => meta;

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

export const createAdminAppRequest = createAction<App, MetaWithCallbacks>(CREATE_ADMIN_APP.REQUEST, payloadIdentityCreator, metaWithCallbacksCreator);
export const createAdminAppSuccess = createAction<App, MetaWithCallbacks>(CREATE_ADMIN_APP.SUCCESS, payloadIdentityCreator, metaWithCallbacksCreator);
export const createAdminAppError = createAction<ErrorResponse, MetaWithCallbacks>(CREATE_ADMIN_APP.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);

export const updateAdminAppRequest = createAction<App, MetaWithCallbacks>(UPDATE_ADMIN_APP.REQUEST, payloadIdentityCreator, metaWithCallbacksCreator);
export const updateAdminAppSuccess = createAction<App, MetaWithCallbacks>(UPDATE_ADMIN_APP.SUCCESS, payloadIdentityCreator, metaWithCallbacksCreator);
export const updateAdminAppError = createAction<ErrorResponse, MetaWithCallbacks>(UPDATE_ADMIN_APP.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);

export const deleteAdminAppRequest = createAction<App, MetaWithCallbacks>(DELETE_ADMIN_APP.REQUEST, payloadIdentityCreator, metaWithCallbacksCreator);
export const deleteAdminAppSuccess = createAction<App, MetaWithCallbacks>(DELETE_ADMIN_APP.SUCCESS, payloadIdentityCreator, metaWithCallbacksCreator);
export const deleteAdminAppError = createAction<ErrorResponse, MetaWithCallbacks>(DELETE_ADMIN_APP.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);

export const getAdminUsersRequest = createAction(GET_ADMIN_USERS.REQUEST, noop);
export const getAdminUsersSuccess = createAction<User[]>(GET_ADMIN_USERS.SUCCESS);
export const getAdminUsersError = createAction<ErrorResponse>(GET_ADMIN_USERS.ERROR);

export const createAdminUserRequest = createAction<User, MetaWithCallbacks>(CREATE_ADMIN_USER.REQUEST, payloadIdentityCreator, metaWithCallbacksCreator);
export const createAdminUserSuccess = createAction<User, MetaWithCallbacks>(CREATE_ADMIN_USER.SUCCESS, payloadIdentityCreator, metaWithCallbacksCreator);
export const createAdminUserError = createAction<ErrorResponse, MetaWithCallbacks>(CREATE_ADMIN_USER.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);

export const updateAdminUserRequest = createAction<User, MetaWithCallbacks>(UPDATE_ADMIN_USER.REQUEST, payloadIdentityCreator, metaWithCallbacksCreator);
export const updateAdminUserSuccess = createAction<User, MetaWithCallbacks>(UPDATE_ADMIN_USER.SUCCESS, payloadIdentityCreator, metaWithCallbacksCreator);
export const updateAdminUserError = createAction<ErrorResponse, MetaWithCallbacks>(UPDATE_ADMIN_USER.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);

export const deleteAdminUserRequest = createAction<User, MetaWithCallbacks>(DELETE_ADMIN_USER.REQUEST, payloadIdentityCreator, metaWithCallbacksCreator);
export const deleteAdminUserSuccess = createAction<User, MetaWithCallbacks>(DELETE_ADMIN_USER.SUCCESS, payloadIdentityCreator, metaWithCallbacksCreator);
export const deleteAdminUserError = createAction<ErrorResponse, MetaWithCallbacks>(DELETE_ADMIN_USER.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);
