import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiService from '../../services/ApiService/index';
import { ResponseStatus } from '../../types/enums';
import {
  GET_ADMIN_ORG_SETTINGS,
  GET_ORG_SETTINGS,
  getAdminOrgSettingsError,
  getAdminOrgSettingsSuccess,
  getOrgSettingsError,
  getOrgSettingsSuccess,
  SAVE_ACTIVE_THEME_ID,
  SAVE_ADMIN_ORG_SETTINGS,
  SAVE_LOGO,
  saveAdminOrgSettingsError,
  saveAdminOrgSettingsRequest,
  saveAdminOrgSettingsSuccess,
} from './actions';
import { getOrganizationSettings } from './selectors';
import { SaveActiveThemeId, SaveAdminOrgSettingsRequest, SaveLogo } from './types';

function* watchSaveLogo(action: SaveLogo) {
  const orgSettings = yield select(getOrganizationSettings);

  const logo = action.payload;

  if (!logo) return;

  orgSettings.logo = logo;

  yield put(saveAdminOrgSettingsRequest(orgSettings, action.meta));
}

function* watchSaveActiveThemeId(action: SaveActiveThemeId) {
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

export function* organizationSaga() {
  yield takeLatest(SAVE_LOGO, watchSaveLogo);
  yield takeLatest(SAVE_ACTIVE_THEME_ID, watchSaveActiveThemeId);

  yield takeLatest(GET_ORG_SETTINGS.REQUEST, watchGetOrgSettingsRequest);
  yield takeLatest(GET_ADMIN_ORG_SETTINGS.REQUEST, watchGetAdminOrgSettingsRequest);
  yield takeLatest(SAVE_ADMIN_ORG_SETTINGS.REQUEST, watchSaveAdminOrgSettingsRequest);

  yield takeLatest(GET_ORG_SETTINGS.ERROR, watchRequestError);
  yield takeLatest(GET_ADMIN_ORG_SETTINGS.ERROR, watchRequestError);
  yield takeLatest(SAVE_ADMIN_ORG_SETTINGS.ERROR, watchRequestError);

  yield takeLatest(SAVE_ADMIN_ORG_SETTINGS.SUCCESS, watchRequestSuccess);
}
