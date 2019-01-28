import { createAction } from 'redux-actions';

import { MonitorInfo, SystemBaseEvent } from '../../types/commons';

// Action types
export const SET_MONITOR_INFO = 'SET_MONITOR_INFO';
export const SYSTEM_EVENT_APPLICATION_CLOSED = 'SYSTEM_EVENT:APPLICATION_CLOSED';
export const SYSTEM_EVENT_APPLICATION_CRASHED = 'SYSTEM_EVENT:APPLICATION_CRASHED';
export const SYSTEM_EVENT_APPLICATION_STARTED = 'SYSTEM_EVENT:APPLICATION_STARTED';

// Action creators
export const setMonitorInfo = createAction<MonitorInfo>(SET_MONITOR_INFO);
export const systemEventApplicationClosed = createAction<SystemBaseEvent>(SYSTEM_EVENT_APPLICATION_CLOSED);
export const systemEventApplicationCrashed = createAction<SystemBaseEvent>(SYSTEM_EVENT_APPLICATION_CRASHED);
export const systemEventApplicationStarted = createAction<SystemBaseEvent>(SYSTEM_EVENT_APPLICATION_STARTED);
