import { createAction } from 'redux-actions';

import noop from '../../utils/noop';

// Action Types
export const APPLICATION_STARTED = 'APPLICATION_STARTED';
export const OPENFIN_READY = 'OPENFIN_READY';

// Action Creators
export const applicationStarted = createAction(APPLICATION_STARTED, noop);
export const openfinReady = createAction(OPENFIN_READY, noop);
