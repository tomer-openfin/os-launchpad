import { Bounds, Identity, WindowOption } from '../../types/commons';
import { createAction, createAsyncActionCreators } from '../utils';
import { WindowConfig, WindowNamePayload } from './types';

// Action types
const LAUNCH_WINDOW = 'LAUNCH_WINDOW';
const RECOVER_LOST_WINDOWS = 'RECOVER_LOST_WINDOWS';
const TOGGLE_WINDOW = 'TOGGLE_WINDOW';
const WINDOW_BLURRED = 'WINDOW_BLURRED';
const WINDOW_BOUNDS_CHANGED = 'WINDOW_BOUNDS_CHANGED';
const WINDOW_CLOSED = 'WINDOW_CLOSED';
const WINDOW_HIDDEN = 'WINDOW_HIDDEN';
const WINDOW_SHOWN = 'WINDOW_SHOWN';

const HIDE_WINDOW_REQUEST = 'HIDE_WINDOW_REQUEST';
const HIDE_WINDOW_SUCCESS = 'HIDE_WINDOW_SUCCESS';
const HIDE_WINDOW_FAILURE = 'HIDE_WINDOW_FAILURE';
const OPEN_WINDOW_REQUEST = 'OPEN_WINDOW_REQUEST';
const OPEN_WINDOW_SUCCESS = 'OPEN_WINDOW_SUCCESS';
const OPEN_WINDOW_FAILURE = 'OPEN_WINDOW_FAILURE';

// Action creators
export const hideWindow = createAsyncActionCreators(HIDE_WINDOW_REQUEST, HIDE_WINDOW_SUCCESS, HIDE_WINDOW_FAILURE)<
  { uuid?: string; name: string },
  void,
  Error
>();
export const openWindow = createAsyncActionCreators(OPEN_WINDOW_REQUEST, OPEN_WINDOW_SUCCESS, OPEN_WINDOW_FAILURE)<
  WindowOption,
  { uuid: string; name: string; bounds: Bounds },
  Error
>();
export const launchWindow = createAction(LAUNCH_WINDOW)<WindowConfig>();
export const recoverLostWindows = createAction(RECOVER_LOST_WINDOWS)();
export const toggleWindow = createAction(TOGGLE_WINDOW)<WindowNamePayload>();
export const windowBlurred = createAction(WINDOW_BLURRED)<Identity>();
export const windowBoundsChanged = createAction(WINDOW_BOUNDS_CHANGED)<{ identity: Identity; bounds: Bounds }>();
export const windowClosed = createAction(WINDOW_CLOSED)<Identity>();
export const windowHidden = createAction(WINDOW_HIDDEN)<Identity>();
export const windowShown = createAction(WINDOW_SHOWN)<Identity>();
