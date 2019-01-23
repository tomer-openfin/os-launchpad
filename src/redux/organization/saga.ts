import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiService from '../../services/ApiService/index';
import { ResponseStatus } from '../../types/enums';
import {
  GET_ADMIN_ORG_SETTINGS,
  GET_ORG_SETTINGS,
  getAdminOrgSettingsError,
  getAdminOrgSettingsRequest,
  getAdminOrgSettingsSuccess,
  getOrgSettingsError,
  getOrgSettingsSuccess,
  SAVE_ADMIN_ORG_SETTINGS,
  SAVE_ORG_ACTIVE_THEME_ID,
  SAVE_ORG_AUTO_LOGIN,
  SAVE_ORG_LOGO,
  saveAdminOrgSettingsError,
  saveAdminOrgSettingsRequest,
  saveAdminOrgSettingsSuccess,
} from './actions';
import { getOrganizationSettings } from './selectors';
import { SaveAdminOrgSettingsRequest, SaveOrgActiveThemeId, SaveOrgAutoLogin, SaveOrgLogo } from './types';

function* watchSaveOrgAutoLogin(action: SaveOrgAutoLogin) {
  const orgSettings = yield select(getOrganizationSettings);

  const autoLogin = action.payload;

  if (typeof autoLogin !== 'boolean') return;

  orgSettings.autoLogin = autoLogin;

  yield put(saveAdminOrgSettingsRequest(orgSettings, action.meta));
}

function* watchSaveOrgLogo(action: SaveOrgLogo) {
  const orgSettings = yield select(getOrganizationSettings);

  const logo = action.payload;

  if (!logo) return;

  orgSettings.logo = logo;

  yield put(saveAdminOrgSettingsRequest(orgSettings, action.meta));
}

function* watchSaveOrgActiveThemeId(action: SaveOrgActiveThemeId) {
  const orgSettings = yield select(getOrganizationSettings);

  const activeThemeId = action.payload;

  if (!activeThemeId) return;

  orgSettings.activeThemeId = activeThemeId;

  yield put(saveAdminOrgSettingsRequest(orgSettings, action.meta));
}

function* watchGetOrgSettingsRequest() {
  const response = yield call(ApiService.getOrgSettings);

  if (response.status !== ResponseStatus.FAILURE) {
    yield put(getOrgSettingsSuccess(response));
  } else {
    yield put(getOrgSettingsError(response));
  }
}

function* watchGetAdminOrgSettingsRequest() {
  const response = yield call(ApiService.getAdminOrgSettings);

  if (response.status !== ResponseStatus.FAILURE) {
    yield put(getAdminOrgSettingsSuccess(response));
  } else {
    yield put(getAdminOrgSettingsError(response));
  }
}

function* watchSaveAdminOrgSettingsRequest(action: SaveAdminOrgSettingsRequest) {
  const orgSettings = action.payload;

  if (!orgSettings) return;

  const response = yield call(ApiService.saveAdminOrgSettings, orgSettings);

  if (response.status === ResponseStatus.SUCCESS) {
    yield put(saveAdminOrgSettingsSuccess(orgSettings, action.meta));
  } else {
    yield put(saveAdminOrgSettingsError(response, action.meta));
  }

  yield put(getAdminOrgSettingsRequest());
}

function* watchRequestError(action) {
  const error = action.payload;

  const errorMessage = error ? error.message || error : 'Unknown Error';

  // tslint:disable-next-line:no-console
  console.error('Error on', action.type, ':', errorMessage, '\n');

  if (action.meta && action.meta.errorCb) {
    action.meta.errorCb(errorMessage);
  }
}

function* watchRequestSuccess(action) {
  if (action.meta && action.meta.successCb) {
    action.meta.successCb();
  }
}

export function* organizationSaga() {
  yield takeLatest(SAVE_ORG_AUTO_LOGIN, watchSaveOrgAutoLogin);
  yield takeLatest(SAVE_ORG_LOGO, watchSaveOrgLogo);
  yield takeLatest(SAVE_ORG_ACTIVE_THEME_ID, watchSaveOrgActiveThemeId);

  yield takeLatest(GET_ORG_SETTINGS.REQUEST, watchGetOrgSettingsRequest);
  yield takeLatest(GET_ADMIN_ORG_SETTINGS.REQUEST, watchGetAdminOrgSettingsRequest);
  yield takeLatest(SAVE_ADMIN_ORG_SETTINGS.REQUEST, watchSaveAdminOrgSettingsRequest);

  yield takeLatest(GET_ORG_SETTINGS.ERROR, watchRequestError);
  yield takeLatest(GET_ADMIN_ORG_SETTINGS.ERROR, watchRequestError);
  yield takeLatest(SAVE_ADMIN_ORG_SETTINGS.ERROR, watchRequestError);

  yield takeLatest(SAVE_ADMIN_ORG_SETTINGS.SUCCESS, watchRequestSuccess);
}
