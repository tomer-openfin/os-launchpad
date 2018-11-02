import { Window } from '@giantmachines/redux-openfin';
import { put, takeLatest } from 'redux-saga/effects';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LoginError, loginError, LoginRequest, LoginSuccess, loginSuccess, setMe } from './';
import { LOGIN_ERROR } from './actions';

function* watchLoginRequest(action: LoginRequest) {
  // tslint:disable-next-line:no-console
  console.log('Login Request', action);
  const { payload } = action;

  if (!payload) {
    return;
  }

  const { email, password } = payload;

  if (email === 'test@test.com' && password === 'test') {
    yield put(loginSuccess({ email }));
  } else {
    yield put(loginError({ message: 'LOGIN FAILED' }));
  }
}

function* watchLoginSuccess(action: LoginSuccess) {
  const { payload } = action;

  if (!payload) {
    return;
  }

  const { email } = payload;
  // tslint:disable-next-line:no-console
  console.log('Login Success for', email);
  yield put(setMe(email));
  // TODO: Use window config
  yield put(Window.closeWindow({ id: 'osLaunchpadLogin' }));
  yield put(Window.showWindow({ id: 'osLaunchpadMain' }));
}

function* watchLoginError(action: LoginError) {
  const { payload } = action;

  if (!payload) {
    return;
  }

  const { message } = payload;
  // tslint:disable-next-line:no-console
  console.log('Error Message:', message);
}

export function* meSaga() {
  yield takeLatest(LOGIN_REQUEST, watchLoginRequest);
  yield takeLatest(LOGIN_SUCCESS, watchLoginSuccess);
  yield takeLatest(LOGIN_ERROR, watchLoginError);
}
