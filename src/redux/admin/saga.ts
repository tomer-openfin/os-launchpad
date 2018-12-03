import { call, put, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';

import { getAppDirectoryList } from '../apps/index';
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

export const addIdFromKey = (key: string) => item => {
  item.id = item[key];
  return item;
};

function* watchGetAdminAppsRequest() {
  const response = yield call(ApiService.getAdminApps);

  // TODO: hone the criteria for error response once it is more than empty object
  if (response.length && response.status !== 'error') {
    const appList = response.map(addIdFromKey('name'));

    yield put(getAdminAppsSuccess(appList));
  } else {
    yield put(getAdminAppsError(response));
  }
}

function* watchCreateAdminAppRequest(action) {
  const response = yield call(ApiService.createAdminApp, action.payload);

  if (response.status === 'error' || response === 'Internal Server Error') {
    yield put(createAdminAppError(response, action.meta));
  } else {
    // modify after api updated
    const getAppResponse = yield call(ApiService.getAdminApps);

    const desiredApp = getAppResponse.find(app => app.name === action.payload.name);

    if (!desiredApp) {
      yield put(createAdminAppError(response, action.meta));

      return;
    }

    const newApp = addIdFromKey('name')(desiredApp);

    yield put(createAdminAppSuccess(newApp, action.meta));
    yield put(getAppDirectoryList());
  }
}

function* watchUpdateAdminAppRequest(action) {
  const response = yield call(ApiService.updateAdminApp, action.payload);

  if (response.status === 'error' || response === 'Internal Server Error') {
    yield put(updateAdminAppError(response, action.meta));
  } else {
    // modify after api updated
    const getAppResponse = yield call(ApiService.getAdminApp, action.payload);

    const updatedApp = addIdFromKey('name')(getAppResponse);

    yield put(updateAdminAppSuccess(updatedApp, action.meta));
    yield put(getAppDirectoryList());
  }
}

function* watchDeleteAdminAppRequest(action) {
  const response = yield call(ApiService.deleteAdminApp, action.payload);

  if (response.status === 'error' || response === 'Internal Server Error') {
    yield put(deleteAdminAppError(response, action.meta));
  } else {
    yield put(deleteAdminAppSuccess(action.payload, action.meta));
    yield put(getAppDirectoryList());
  }
}

function* watchGetAdminUsersRequest() {
  const response = yield call(ApiService.getAdminUsers);

  // TODO: hone the criteria for error response once it is more than empty object
  if (response.length && response.status !== 'error') {
    const userList = response.map(addIdFromKey('username'));

    yield put(getAdminUsersSuccess(userList));
  } else {
    yield put(getAdminUsersError(response));
  }
}

function* watchCreateAdminUserRequest(action) {
  const response = yield call(ApiService.createAdminUser, action.payload);

  if (response.status === 'error' || response === 'Internal Server Error') {
    yield put(createAdminUserError(response, action.meta));
  } else {
    // modify after api updated
    const getUserResponse = yield call(ApiService.getAdminUsers);

    const desiredUser = getUserResponse.find(user => user.email === action.payload.email);

    if (!desiredUser) {
      yield put(createAdminUserError(response, action.meta));

      return;
    }

    const newUser = addIdFromKey('username')(desiredUser);

    yield put(createAdminUserSuccess(newUser, action.meta));
  }
}

function* watchUpdateAdminUserRequest(action) {
  const response = yield call(ApiService.updateAdminUser, action.payload);

  if (response.status === 'error' || response === 'Internal Server Error') {
    yield put(updateAdminUserError(response, action.meta));
  } else {
    // modify after api updated
    const getUserResponse = yield call(ApiService.getAdminUser, action.payload);

    const updatedUser = addIdFromKey('username')(getUserResponse);

    yield put(updateAdminUserSuccess(updatedUser, action.meta));
  }
}

function* watchDeleteAdminUserRequest(action) {
  const response = yield call(ApiService.deleteAdminUser, action.payload);

  if (response.status === 'error' || response === 'Internal Server Error') {
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
  yield takeLatest(GET_ADMIN_APPS.REQUEST, watchGetAdminAppsRequest);
  yield takeLatest(GET_ADMIN_USERS.REQUEST, watchGetAdminUsersRequest);

  yield takeLatest(CREATE_ADMIN_USER.REQUEST, watchCreateAdminUserRequest);
  yield takeLatest(UPDATE_ADMIN_USER.REQUEST, watchUpdateAdminUserRequest);
  yield takeLatest(DELETE_ADMIN_USER.REQUEST, watchDeleteAdminUserRequest);

  yield takeLatest(CREATE_ADMIN_APP.REQUEST, watchCreateAdminAppRequest);
  yield takeLatest(UPDATE_ADMIN_APP.REQUEST, watchUpdateAdminAppRequest);
  yield takeLatest(DELETE_ADMIN_APP.REQUEST, watchDeleteAdminAppRequest);

  yield takeLatest(GET_ADMIN_APPS.ERROR, watchRequestError);
  yield takeLatest(GET_ADMIN_USERS.ERROR, watchRequestError);

  yield takeLatest(CREATE_ADMIN_USER.ERROR, watchRequestError);
  yield takeLatest(UPDATE_ADMIN_USER.ERROR, watchRequestError);
  yield takeLatest(DELETE_ADMIN_USER.ERROR, watchRequestError);

  yield takeLatest(CREATE_ADMIN_APP.ERROR, watchRequestError);
  yield takeLatest(UPDATE_ADMIN_APP.ERROR, watchRequestError);
  yield takeLatest(DELETE_ADMIN_APP.ERROR, watchRequestError);

  yield takeLatest(CREATE_ADMIN_USER.SUCCESS, watchRequestSuccess);
  yield takeLatest(UPDATE_ADMIN_USER.SUCCESS, watchRequestSuccess);
  yield takeLatest(DELETE_ADMIN_USER.SUCCESS, watchRequestSuccess);

  yield takeLatest(CREATE_ADMIN_APP.SUCCESS, watchRequestSuccess);
  yield takeLatest(UPDATE_ADMIN_APP.SUCCESS, watchRequestSuccess);
  yield takeLatest(DELETE_ADMIN_APP.SUCCESS, watchRequestSuccess);
}
