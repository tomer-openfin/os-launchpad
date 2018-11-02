import { createAction } from 'redux-actions';

import {
  OpenfinReadyPayload,
} from './types';

// Action Types
export const APPLICATION_STARTED = 'APPLICATION_STARTED';
export const OPENFIN_READY = 'OPENFIN_READY';

// Action Creators
export const applicationStarted = createAction(APPLICATION_STARTED);
export const openfinReady = createAction<OpenfinReadyPayload, string>(
  OPENFIN_READY,
  finName => ({ finName }),
);
