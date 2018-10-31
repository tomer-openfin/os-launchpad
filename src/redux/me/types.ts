import { Action } from 'redux';

import { setMe } from './';

// Reducer
export interface MeState {
  username: string;
}

// Types
export type SET_ME_TYPE = 'SET_ME';

// Payloads
export interface SetMePayload {
  username: string;
}

// Actions
type SetMeAction = ReturnType<typeof setMe>;

export type MeActions = SetMeAction;
