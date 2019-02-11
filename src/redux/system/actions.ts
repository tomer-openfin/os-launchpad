import { createAction } from 'redux-actions';

import { MonitorInfo, SystemBaseEvent } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';

// Action types
export const GET_AND_SET_MONITOR_INFO = generateAsyncActionTypes('GET_AND_SET_MONITOR_INFO');
export const SET_MONITOR_INFO = 'SET_MONITOR_INFO';
export const SYSTEM_EVENT_APPLICATION_CLOSED = 'SYSTEM_EVENT:APPLICATION_CLOSED';
export const SYSTEM_EVENT_APPLICATION_CRASHED = 'SYSTEM_EVENT:APPLICATION_CRASHED';
export const SYSTEM_EVENT_APPLICATION_STARTED = 'SYSTEM_EVENT:APPLICATION_STARTED';

// Action creators
export const getAndSetMonitorInfoRequest = createAction(GET_AND_SET_MONITOR_INFO.REQUEST);
export const getAndSetMonitorInfoSuccess = createAction<MonitorInfo>(GET_AND_SET_MONITOR_INFO.SUCCESS);
export const getAndSetMonitorInfoError = createAction(GET_AND_SET_MONITOR_INFO.ERROR);
export const setMonitorInfo = createAction<MonitorInfo>(SET_MONITOR_INFO);
export const systemEventApplicationClosed = createAction<SystemBaseEvent>(SYSTEM_EVENT_APPLICATION_CLOSED);
export const systemEventApplicationCrashed = createAction<SystemBaseEvent>(SYSTEM_EVENT_APPLICATION_CRASHED);
export const systemEventApplicationStarted = createAction<SystemBaseEvent>(SYSTEM_EVENT_APPLICATION_STARTED);
