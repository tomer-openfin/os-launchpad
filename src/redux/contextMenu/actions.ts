import { createAsyncActionCreators } from '../utils';
import { ContextMenuRequestPayload, ContextMenuSuccessPayload } from './types';

// Action types
// CLOSE_CONTEXT_MENU
const CLOSE_CONTEXT_MENU_REQUEST = 'CLOSE_CONTEXT_MENU_REQUEST';
const CLOSE_CONTEXT_MENU_SUCCESS = 'CLOSE_CONTEXT_MENU_SUCCESS';
const CLOSE_CONTEXT_MENU_FAILURE = 'CLOSE_CONTEXT_MENU_FAILURE';
// OPEN_CONTEXT_MENU
const OPEN_CONTEXT_MENU_REQUEST = 'OPEN_CONTEXT_MENU_REQUEST';
const OPEN_CONTEXT_MENU_SUCCESS = 'OPEN_CONTEXT_MENU_SUCCESS';
const OPEN_CONTEXT_MENU_FAILURE = 'OPEN_CONTEXT_MENU_FAILURE';

// Action creators
export const closeContextMenu = createAsyncActionCreators(CLOSE_CONTEXT_MENU_REQUEST, CLOSE_CONTEXT_MENU_SUCCESS, CLOSE_CONTEXT_MENU_FAILURE)<
  void,
  void,
  Error
>();
export const openContextMenu = createAsyncActionCreators(OPEN_CONTEXT_MENU_REQUEST, OPEN_CONTEXT_MENU_SUCCESS, OPEN_CONTEXT_MENU_FAILURE)<
  ContextMenuRequestPayload,
  ContextMenuSuccessPayload,
  Error
>();
