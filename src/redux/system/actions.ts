import { MonitorInfo, SystemBaseEvent } from '../../types/commons';
import { createAction, createAsyncActionCreators } from '../utils';

const GET_AND_SET_MONITOR_INFO_REQUEST = 'GET_AND_SET_MONITOR_INFO_REQUEST';
const GET_AND_SET_MONITOR_INFO_SUCCESS = 'GET_AND_SET_MONITOR_INFO_SUCCESS';
const GET_AND_SET_MONITOR_INFO_FAILURE = 'GET_AND_SET_MONITOR_INFO_FAILURE';
const SET_MONITOR_INFO = 'SET_MONITOR_INFO';
const SYSTEM_EVENT_APPLICATION_CLOSED = 'SYSTEM_EVENT:APPLICATION_CLOSED';
const SYSTEM_EVENT_APPLICATION_CRASHED = 'SYSTEM_EVENT:APPLICATION_CRASHED';
const SYSTEM_EVENT_APPLICATION_STARTED = 'SYSTEM_EVENT:APPLICATION_STARTED';

// Action creators
export const getAndSetMonitorInfo = createAsyncActionCreators(
  GET_AND_SET_MONITOR_INFO_REQUEST,
  GET_AND_SET_MONITOR_INFO_SUCCESS,
  GET_AND_SET_MONITOR_INFO_FAILURE,
)<void, MonitorInfo, Error>();
export const setMonitorInfo = createAction(SET_MONITOR_INFO)<MonitorInfo>();
export const systemEventApplicationClosed = createAction(SYSTEM_EVENT_APPLICATION_CLOSED)<SystemBaseEvent>();
export const systemEventApplicationCrashed = createAction(SYSTEM_EVENT_APPLICATION_CRASHED)<SystemBaseEvent>();
export const systemEventApplicationStarted = createAction(SYSTEM_EVENT_APPLICATION_STARTED)<SystemBaseEvent>();
