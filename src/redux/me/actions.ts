import { createAction } from 'redux-actions';

import { LoginErrorPayload, LoginRequestPayload, LoginSuccessPayload, SetMePayload } from './';

// Action Types
export const SET_ME = 'SET_ME';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

// Action Creators
export const setMe = createAction<SetMePayload, string>(
  SET_ME,
  username => ({
    username,
  }),
);
export const loginRequest = createAction<LoginRequestPayload>(LOGIN_REQUEST);
export const loginSuccess = createAction<LoginSuccessPayload>(LOGIN_SUCCESS);
export const loginError = createAction<LoginErrorPayload>(LOGIN_ERROR);
