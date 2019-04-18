import { MonitorInfo, SystemBaseEvent, WindowBaseEvent, WindowBoundsEvent, WindowGroupChangedEvent, WindowInfo } from '../../types/commons';
import { createAction, createAsyncActionCreators } from '../utils';
import { SystemWindow } from './types';

const GET_MACHINE_ID_REQUEST = 'GET_MACHINE_ID_REQUEST';
const GET_MACHINE_ID_SUCCESS = 'GET_MACHINE_ID_SUCCESS';
const GET_MACHINE_ID_FAILURE = 'GET_MACHINE_ID_FAILURE';
const GET_AND_SET_MONITOR_INFO_REQUEST = 'GET_AND_SET_MONITOR_INFO_REQUEST';
const GET_AND_SET_MONITOR_INFO_SUCCESS = 'GET_AND_SET_MONITOR_INFO_SUCCESS';
const GET_AND_SET_MONITOR_INFO_FAILURE = 'GET_AND_SET_MONITOR_INFO_FAILURE';
const SET_MONITOR_INFO = 'SET_MONITOR_INFO';
const STORE_ALL_SYSTEM_WINDOWS_REQUEST = 'STORE_ALL_SYSTEM_WINDOWS_REQUEST';
const STORE_ALL_SYSTEM_WINDOWS_SUCCESS = 'STORE_ALL_SYSTEM_WINDOWS_SUCCESS';
const STORE_ALL_SYSTEM_WINDOWS_FAILURE = 'STORE_ALL_SYSTEM_WINDOWS_FAILURE';
const SYSTEM_EVENT_APPLICATION_CLOSED = 'SYSTEM_EVENT:APPLICATION_CLOSED';
const SYSTEM_EVENT_APPLICATION_CRASHED = 'SYSTEM_EVENT:APPLICATION_CRASHED';
const SYSTEM_EVENT_APPLICATION_STARTED = 'SYSTEM_EVENT:APPLICATION_STARTED';
const SYSTEM_EVENT_WINDOW_BOUNDS_CHANGED = 'SYSTEM_EVENT:WINDOW_BOUNDS_CHANGED';
const SYSTEM_EVENT_WINDOW_CLOSED = 'SYSTEM_EVENT:WINDOW_CLOSED';
const SYSTEM_EVENT_WINDOW_CREATED = 'SYSTEM_EVENT:WINDOW_CREATED';
const SYSTEM_WINDOW_CREATED_WITH_DETAILS = 'SYSTEM_WINDOW_CREATED_WITH_DETAILS';
const SYSTEM_EVENT_WINDOW_HIDDEN = 'SYSTEM_EVENT:WINDOW_HIDDEN';
const SYSTEM_EVENT_WINDOW_GROUP_CHANGED = 'SYSTEM_EVENT_WINDOW_GROUP_CHANGED';
const SYSTEM_EVENT_WINDOW_SHOWN = 'SYSTEM_EVENT:WINDOW_SHOWN';

const GET_ALL_WINDOWS_REQUEST = 'GET_ALL_WINDOWS_REQUEST';
const GET_ALL_WINDOWS_SUCCESS = 'GET_ALL_WINDOWS_SUCCESS';
const GET_ALL_WINDOWS_FAILURE = 'GET_ALL_WINDOWS_FAILURE';

// Action creators
export const getMachineId = createAsyncActionCreators(GET_MACHINE_ID_REQUEST, GET_MACHINE_ID_SUCCESS, GET_MACHINE_ID_FAILURE)<
  void,
  { machineId: string },
  Error
>();
export const getAndSetMonitorInfo = createAsyncActionCreators(
  GET_AND_SET_MONITOR_INFO_REQUEST,
  GET_AND_SET_MONITOR_INFO_SUCCESS,
  GET_AND_SET_MONITOR_INFO_FAILURE,
)<void, MonitorInfo, Error>();
export const setMonitorInfo = createAction(SET_MONITOR_INFO)<MonitorInfo>();
export const systemEventApplicationClosed = createAction(SYSTEM_EVENT_APPLICATION_CLOSED)<SystemBaseEvent>();
export const systemEventApplicationCrashed = createAction(SYSTEM_EVENT_APPLICATION_CRASHED)<SystemBaseEvent>();
export const systemEventApplicationStarted = createAction(SYSTEM_EVENT_APPLICATION_STARTED)<SystemBaseEvent>();
export const systemEventWindowBoundsChanged = createAction(SYSTEM_EVENT_WINDOW_BOUNDS_CHANGED)<WindowBoundsEvent>();
export const systemEventWindowClosed = createAction(SYSTEM_EVENT_WINDOW_CLOSED)<WindowBaseEvent>();
export const systemEventWindowCreated = createAction(SYSTEM_EVENT_WINDOW_CREATED)<WindowBaseEvent>();
export const systemWindowCreatedWithDetails = createAction(SYSTEM_WINDOW_CREATED_WITH_DETAILS)<SystemWindow>();
export const systemEventWindowHidden = createAction(SYSTEM_EVENT_WINDOW_HIDDEN)<WindowBaseEvent>();
export const systemEventWindowGroupChanged = createAction(SYSTEM_EVENT_WINDOW_GROUP_CHANGED)<WindowGroupChangedEvent>();
export const systemEventWindowShown = createAction(SYSTEM_EVENT_WINDOW_SHOWN)<WindowBaseEvent>();
export const getAllWindows = createAsyncActionCreators(GET_ALL_WINDOWS_REQUEST, GET_ALL_WINDOWS_SUCCESS, GET_ALL_WINDOWS_FAILURE)<void, WindowInfo[], Error>();
export const storeAllSystemWindows = createAsyncActionCreators(
  STORE_ALL_SYSTEM_WINDOWS_REQUEST,
  STORE_ALL_SYSTEM_WINDOWS_SUCCESS,
  STORE_ALL_SYSTEM_WINDOWS_FAILURE,
)<void, SystemWindow[], Error>();
