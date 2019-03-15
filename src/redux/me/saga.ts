import { Application, Window } from '@giantmachines/redux-openfin';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import eraseCookie from '../../utils/eraseCookie';

import { LOGIN_WINDOW } from '../../config/windows';
import { ApiResponseStatus } from '../../types/enums';
import { UnPromisfy } from '../../types/utils';
import { getAdminApps, getAdminUsers } from '../admin';
import { getManifestOverride, initResources, launchAppLauncher, reboundLauncher } from '../application';
import { getAdminOrgSettings } from '../organization';
import { getErrorFromCatch } from '../utils';
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
    const response: UnPromisfy<ReturnType<typeof ApiService.confirmPassword>> = yield call(ApiService.confirmPassword, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(confirmPassword.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(confirmPassword.failure(error, action.meta));
  }
}

function* watchForgotPasswordRequest(action: ReturnType<typeof forgotPassword.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.forgotPassword>> = yield call(ApiService.forgotPassword, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(forgotPassword.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(forgotPassword.failure(error, action.meta));
  }
}

function* watchLoginRequest(action: ReturnType<typeof login.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.login>> = action.payload.session
      ? yield call(ApiService.newPasswordLogin, { username: action.payload.username, newPassword: action.payload.password, session: action.payload.session })
      : yield call(ApiService.login, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      const error = new Error(response.message);
      if (action.meta && action.meta.onFailure && response.meta) {
        action.meta.onFailure(error, {
          code: response.meta.code,
          message: response.message,
          session: response.meta.session || action.payload.session,
          status: response.status,
          username: action.payload.username,
        });
        return;
      } else {
        throw error;
      }
    }

    const { isAdmin, email, firstName, lastName } = response.data;
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
    const response: UnPromisfy<ReturnType<typeof ApiService.logout>> = yield call(ApiService.logout);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
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
    const response: UnPromisfy<ReturnType<typeof ApiService.getUserSettings>> = yield call(ApiService.getUserSettings);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(getSettings.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getSettings.failure(error, action.meta));
  }
}

function* watchSaveSettingsRequest(action: ReturnType<typeof saveSettings.request>) {
  try {
    const settings: ReturnType<typeof getMeSettings> = yield select(getMeSettings);

    const response: UnPromisfy<ReturnType<typeof ApiService.saveUserSettings>> = yield call(ApiService.saveUserSettings, settings);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(saveSettings.success(undefined, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(saveSettings.failure(error, action.meta));
  }
}

function* watchUpdatePasswordRequest(action: ReturnType<typeof updatePassword.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.updateUserPassword>> = yield call(ApiService.updateUserPassword, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(updatePassword.success(response.data, action.meta));
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
