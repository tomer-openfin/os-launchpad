import { call, put, takeEvery } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';

import { ResponseStatus } from '../../types/commons';

import { getAppDirectoryListRequest } from '../apps';
import {
  CREATE_ADMIN_APP,
  CREATE_ADMIN_USER,
  createAdminAppError,
  createAdminAppSuccess,
  createAdminUserError,
  createAdminUserSuccess,
  DELETE_ADMIN_APP,
  DELETE_ADMIN_USER,
  deleteAdminAppError,
  deleteAdminAppSuccess,
  deleteAdminUserError,
  deleteAdminUserSuccess,
  GET_ADMIN_APPS,
  GET_ADMIN_USERS,
  getAdminAppsError,
  getAdminAppsSuccess,
  getAdminUsersError,
  getAdminUsersSuccess,
  UPDATE_ADMIN_APP,
  UPDATE_ADMIN_USER,
  updateAdminAppError,
  updateAdminAppSuccess,
  updateAdminUserError,
  updateAdminUserSuccess,
} from './actions';

function* watchGetAdminAppsRequest() {
  const response = yield call(ApiService.getAdminApps);

  // TODO: hone the criteria for error response once it is more than empty object
  if (response.length && response.status !== ResponseStatus.FAILURE) {
    const appList = response;

    yield put(getAdminAppsSuccess(appList));
  } else {
    yield put(getAdminAppsError(response));
  }
}

function* watchCreateAdminAppRequest(action) {
  const response = yield call(ApiService.createAdminApp, action.payload);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error' || !response.app) {
    yield put(createAdminAppError(response, action.meta));
  } else {
    const app = response.app;

    if (!app) return yield put(createAdminAppError(response, action.meta));

    yield put(createAdminAppSuccess(app, action.meta));

    yield put(getAppDirectoryListRequest());
  }
}

function* watchUpdateAdminAppRequest(action) {
  const response = yield call(ApiService.updateAdminApp, action.payload);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error') {
    yield put(updateAdminAppError(response, action.meta));
  } else {
    const app = response.app;

    if (!app) return yield put(updateAdminAppError(response, action.meta));

    yield put(updateAdminAppSuccess(app, action.meta));

    yield put(getAppDirectoryListRequest());
  }
}

function* watchDeleteAdminAppRequest(action) {
  const response = yield call(ApiService.deleteAdminApp, action.payload);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error') {
    yield put(deleteAdminAppError(response, action.meta));
  } else {
    yield put(deleteAdminAppSuccess(action.payload, action.meta));

    yield put(getAppDirectoryListRequest());
  }
}

function* watchGetAdminUsersRequest() {
  const response = yield call(ApiService.getAdminUsers);

  // TODO: hone the criteria for error response once it is more than empty object
  if (response.length && response.status !== ResponseStatus.FAILURE) {
    yield put(getAdminUsersSuccess(response));
  } else {
    yield put(getAdminUsersError(response));
  }
}

function* watchCreateAdminUserRequest(action) {
  const response = yield call(ApiService.createAdminUser, action.payload);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error') {
    yield put(createAdminUserError(response, action.meta));
  } else {
    yield put(createAdminUserSuccess(response.user, action.meta));
  }
}

function* watchUpdateAdminUserRequest(action) {
  const response = yield call(ApiService.updateAdminUser, action.payload);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error') {
    yield put(updateAdminUserError(response, action.meta));
  } else {
    yield put(updateAdminUserSuccess(response.user, action.meta));
  }
}

function* watchDeleteAdminUserRequest(action) {
  const response = yield call(ApiService.deleteAdminUser, action.payload);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error') {
    yield put(deleteAdminUserError(response, action.meta));
  } else {
    yield put(deleteAdminUserSuccess(action.payload, action.meta));
  }
}

function* watchRequestError(action) {
  const error = action.payload;

  const errorMessage = error ? error.message || error : 'Unknown Error';

  // tslint:disable-next-line:no-console
  console.log('Error on', action.type, ':', errorMessage, '\n');

  if (action.meta && action.meta.errorCb) {
    action.meta.errorCb(errorMessage);
  }
}

function* watchRequestSuccess(action) {
  if (action.meta && action.meta.successCb) {
    action.meta.successCb();
  }
}

export function* adminSaga() {
  yield takeEvery(GET_ADMIN_APPS.REQUEST, watchGetAdminAppsRequest);
  yield takeEvery(GET_ADMIN_USERS.REQUEST, watchGetAdminUsersRequest);

  yield takeEvery(CREATE_ADMIN_USER.REQUEST, watchCreateAdminUserRequest);
  yield takeEvery(UPDATE_ADMIN_USER.REQUEST, watchUpdateAdminUserRequest);
  yield takeEvery(DELETE_ADMIN_USER.REQUEST, watchDeleteAdminUserRequest);

  yield takeEvery(CREATE_ADMIN_APP.REQUEST, watchCreateAdminAppRequest);
  yield takeEvery(UPDATE_ADMIN_APP.REQUEST, watchUpdateAdminAppRequest);
  yield takeEvery(DELETE_ADMIN_APP.REQUEST, watchDeleteAdminAppRequest);

  yield takeEvery(CREATE_ADMIN_USER.SUCCESS, watchRequestSuccess);
  yield takeEvery(UPDATE_ADMIN_USER.SUCCESS, watchRequestSuccess);
  yield takeEvery(DELETE_ADMIN_USER.SUCCESS, watchRequestSuccess);

  yield takeEvery(CREATE_ADMIN_APP.SUCCESS, watchRequestSuccess);
  yield takeEvery(UPDATE_ADMIN_APP.SUCCESS, watchRequestSuccess);
  yield takeEvery(DELETE_ADMIN_APP.SUCCESS, watchRequestSuccess);

  yield takeEvery(GET_ADMIN_APPS.ERROR, watchRequestError);
  yield takeEvery(GET_ADMIN_USERS.ERROR, watchRequestError);

  yield takeEvery(CREATE_ADMIN_USER.ERROR, watchRequestError);
  yield takeEvery(UPDATE_ADMIN_USER.ERROR, watchRequestError);
  yield takeEvery(DELETE_ADMIN_USER.ERROR, watchRequestError);

  yield takeEvery(CREATE_ADMIN_APP.ERROR, watchRequestError);
  yield takeEvery(UPDATE_ADMIN_APP.ERROR, watchRequestError);
  yield takeEvery(DELETE_ADMIN_APP.ERROR, watchRequestError);
}
