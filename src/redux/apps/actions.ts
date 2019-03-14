import { App } from '../../types/commons';
import { createAction, createAsyncActionCreators } from '../utils';
import { CloseFinAppPayload, FinAppStatusStatePayload, OpenFinAppSuccessPayload } from './types';

// Action Types
// CLOSE_FIN_APP
const CLOSE_FIN_APP_FAILURE = 'CLOSE_FIN_APP_FAILURE';
const CLOSE_FIN_APP_REQUEST = 'CLOSE_FIN_APP_REQUEST';
const CLOSE_FIN_APP_SUCCESS = 'CLOSE_FIN_APP_SUCCESS';
// GET_APP_DIRECTORY_LIST
const GET_APP_DIRECTORY_LIST_FAILURE = 'GET_APP_DIRECTORY_LIST_FAILURE';
const GET_APP_DIRECTORY_LIST_REQUEST = 'GET_APP_DIRECTORY_LIST_REQUEST';
const GET_APP_DIRECTORY_LIST_SUCCESS = 'GET_APP_DIRECTORY_LIST_SUCCESS';
// OPEN_FIN_APP
const OPEN_FIN_APP_FAILURE = 'OPEN_FIN_APP_FAILURE';
const OPEN_FIN_APP_REQUEST = 'OPEN_FIN_APP_REQUEST';
const OPEN_FIN_APP_SUCCESS = 'OPEN_FIN_APP_SUCCESS';
// SET_FIN_APP_STATUS_STATE
const SET_FIN_APP_STATUS_STATE = 'SET_FIN_APP_STATUS_STATE';

// Action Creators
export const closeFinApp = createAsyncActionCreators(CLOSE_FIN_APP_REQUEST, CLOSE_FIN_APP_SUCCESS, CLOSE_FIN_APP_FAILURE)<
  CloseFinAppPayload,
  CloseFinAppPayload,
  Error
>();
export const getAppDirectoryList = createAsyncActionCreators(GET_APP_DIRECTORY_LIST_REQUEST, GET_APP_DIRECTORY_LIST_SUCCESS, GET_APP_DIRECTORY_LIST_FAILURE)<
  void,
  App[],
  Error
>();
export const openFinApp = createAsyncActionCreators(OPEN_FIN_APP_REQUEST, OPEN_FIN_APP_SUCCESS, OPEN_FIN_APP_FAILURE)<App, OpenFinAppSuccessPayload, Error>();
export const setFinAppStatusState = createAction(SET_FIN_APP_STATUS_STATE)<FinAppStatusStatePayload>();
