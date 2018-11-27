import { createAction } from 'redux-actions';

import { SetMonitorInfoPayload } from './types';

// Action types
export const SET_MONITOR_INFO = 'SET_MONITOR_INFO';

// Action creators
export const setMonitorInfo = createAction<SetMonitorInfoPayload>(SET_MONITOR_INFO);
