import { Application, Window } from '@giantmachines/redux-openfin';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import eraseCookie from '../../utils/eraseCookie';

import { LOGIN_WINDOW } from '../../config/windows';
import { getAdminApps, getAdminUsers } from '../admin';
import { getManifestOverride, initResources, launchAppLauncher, reboundLauncher } from '../application';
import { getAdminOrgSettings } from '../organization';
import { getErrorFromCatch, getErrorMessageFromResponse, isErrorResponse } from '../utils';
import {
  addToAppLauncher,
  confirmPassword,
  forgotPassword,
  getSettings,
  login,
  logout,
  removeFromAppLauncher,
  saveSettings,
  setAutoHide,
  setLauncherMonitorSettings,
  setLauncherPosition,
  setLauncherSize,
  setMe,
  updatePassword,
} from './actions';
import { getMeSettings } from './selectors';

function* watchConfirmPasswordRequest(action: ReturnType<typeof confirmPassword.request>) {
  try {
    const response = yield call(ApiService.confirmPassword, action.payload);

    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(confirmPassword.success(response, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(confirmPassword.failure(error, action.meta));
  }
}

function* watchForgotPasswordRequest(action: ReturnType<typeof forgotPassword.request>) {
  try {
    const response = yield call(ApiService.forgotPassword, action.payload);

    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(forgotPassword.success(response, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(forgotPassword.failure(error, action.meta));
  }
}

function* watchLoginRequest(action: ReturnType<typeof login.request>) {
  try {
    const response = action.payload.session
      ? yield call(ApiService.newPasswordLogin, { username: action.payload.username, newPassword: action.payload.password, session: action.payload.session })
      : yield call(ApiService.login, action.payload);

    if (isErrorResponse(response)) {
      const error = new Error(getErrorMessageFromResponse(response));
      if (action.meta && action.meta.onFailure) {
        action.meta.onFailure(error, { username: action.payload.username, session: action.payload.session, ...response });
        return;
      } else {
        throw error;
      }
    }

    const { isAdmin, email, firstName, lastName } = response;
    yield put(login.success({ isAdmin, email, firstName, lastName }, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(login.failure(error, action.meta));
  }
}

function* watchLoginSuccess(action: ReturnType<typeof login.success>) {
  try {
    yield put(setMe(action.payload));

    if (action.payload.isAdmin) {
      yield all([put(getAdminApps.request()), put(getAdminUsers.request()), put(getAdminOrgSettings.request()), put(getManifestOverride.request())]);
    }

    yield call(initResources);

    yield put(Window.closeWindow({ id: LOGIN_WINDOW }));
    yield put(launchAppLauncher());
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchLoginSuccess', error);
  }
}

function* watchLogoutRequest(action: ReturnType<typeof logout.request>) {
  try {
    const response = yield call(ApiService.logout);
    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(logout.success(undefined, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(logout.failure(error, action.meta));
  }

  eraseCookie();
  yield put(Application.restart());
}

function* watchGetSettingsRequest(action: ReturnType<typeof getSettings.request>) {
  try {
    const response = yield call(ApiService.getUserSettings);

    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(getSettings.success(response, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getSettings.failure(error, action.meta));
  }
}

function* watchSaveSettingsRequest(action: ReturnType<typeof saveSettings.request>) {
  try {
    const settings: ReturnType<typeof getMeSettings> = yield select(getMeSettings);

    const response = yield call(ApiService.saveUserSettings, settings);

    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(saveSettings.success(undefined, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(saveSettings.failure(error, action.meta));
  }
}

function* watchUpdatePasswordRequest(action: ReturnType<typeof updatePassword.request>) {
  try {
    const response = yield call(ApiService.updateUserPassword, action.payload);

    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(updatePassword.success(response, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(updatePassword.failure(error, action.meta));
  }
}

function* reboundLauncherAndSaveSettings(shouldAnimate: boolean, delay: number, _) {
  try {
    yield put(reboundLauncher.request({ shouldAnimate, delay }));

    yield put(saveSettings.request());
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchUpdateLauncherApps', error);
  }
}

export function* meSaga() {
  yield takeLatest(confirmPassword.request, watchConfirmPasswordRequest);
  yield takeLatest(forgotPassword.request, watchForgotPasswordRequest);
  yield takeLatest(login.request, watchLoginRequest);
  yield takeLatest(login.success, watchLoginSuccess);
  yield takeLatest(logout.request, watchLogoutRequest);
  yield takeLatest(getSettings.request, watchGetSettingsRequest);
  yield takeLatest(saveSettings.request, watchSaveSettingsRequest);
  yield takeLatest(addToAppLauncher, reboundLauncherAndSaveSettings, true, 0);
  yield takeLatest(removeFromAppLauncher, reboundLauncherAndSaveSettings, true, 200);
  yield takeEvery(updatePassword.request, watchUpdatePasswordRequest);

  yield takeLatest(
    [setAutoHide.toString(), setLauncherPosition.toString(), setLauncherSize.toString(), setLauncherMonitorSettings.toString(), getSettings.success.toString()],
    reboundLauncherAndSaveSettings,
    false,
    0,
  );
}
