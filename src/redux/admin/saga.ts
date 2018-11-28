import { call, put, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';

import {
  CREATE_ADMIN_USER,
  createAdminUserError,
  createAdminUserSuccess,
  DELETE_ADMIN_USER,
  deleteAdminUserError,
  deleteAdminUserSuccess,
  GET_ADMIN_APPS,
  GET_ADMIN_USERS,
  getAdminAppsError,
  getAdminAppsSuccess,
  getAdminUsersError,
  getAdminUsersSuccess,
  UPDATE_ADMIN_USER,
  updateAdminUserError,
  updateAdminUserSuccess,
} from './actions';

const addIdFromUsername = user => {
  user.id = user.username;
  return user;
};

function* watchGetAdminAppsRequest() {
  const response = yield call(ApiService.getAdminApps);

  // TODO: hone the criteria for error response once it is more than empty object
  if (response.length && response.status !== 'error') {
    yield put(getAdminAppsSuccess(response));
  } else {
    yield put(getAdminAppsError(response));
  }
}

function* watchGetAdminUsersRequest() {
  const response = yield call(ApiService.getAdminUsers);

  // TODO: hone the criteria for error response once it is more than empty object
  if (response.length && response.status !== 'error') {
    const userList = response.map(addIdFromUsername);

    yield put(getAdminUsersSuccess(userList));
  } else {
    yield put(getAdminUsersError(response));
  }
}

function* watchCreateAdminUserRequest(action) {
  const response = yield call(ApiService.createAdminUser, action.payload);

  if (response.status === 'error' || response === 'Internal Server Error' || !response.username) {
    yield put(createAdminUserError(response.message));
  } else {
    const newUser = addIdFromUsername(response);

    yield put(createAdminUserSuccess(newUser));
  }
}

function* watchUpdateAdminUserRequest(action) {
  const response = yield call(ApiService.updateAdminUser, action.payload);

  if (response.status === 'error' || response === 'Internal Server Error' || !response.username) {
    yield put(updateAdminUserError(response));
  } else {
    const updatedUser = addIdFromUsername(response);

    yield put(updateAdminUserSuccess(updatedUser));
  }
}

function* watchDeleteAdminUserRequest(action) {
  const response = yield call(ApiService.updateAdminUser, action.payload);

  if (response.status === 'error' || response === 'Internal Server Error' || !response.username) {
    yield put(deleteAdminUserError(response));
  } else {
    const updatedUser = addIdFromUsername(response);

    yield put(deleteAdminUserSuccess(updatedUser));
  }
}

function* watchRequestError(action) {
  const error = action.payload;

  const message = error ? error.message || error : 'Unknown Error';

  // tslint:disable-next-line:no-console
  console.log('Error on', action.type, ':', message, '\n');
}

export function* adminSaga() {
  yield takeLatest(GET_ADMIN_APPS.REQUEST, watchGetAdminAppsRequest);
  yield takeLatest(GET_ADMIN_APPS.ERROR, watchRequestError);
  yield takeLatest(GET_ADMIN_USERS.REQUEST, watchGetAdminUsersRequest);
  yield takeLatest(CREATE_ADMIN_USER.REQUEST, watchCreateAdminUserRequest);
  yield takeLatest(UPDATE_ADMIN_USER.REQUEST, watchUpdateAdminUserRequest);
  yield takeLatest(DELETE_ADMIN_USER.REQUEST, watchDeleteAdminUserRequest);
  yield takeLatest(GET_ADMIN_USERS.ERROR, watchRequestError);
}
