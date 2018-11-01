import { createAction } from 'redux-actions';

import { SET_ME_TYPE, SetMePayload } from './';

// Action Types
export const SET_ME: SET_ME_TYPE = 'SET_ME';

// Action Creators
export const setMe = createAction<SetMePayload, string>(SET_ME, username => ({
  username,
}));
