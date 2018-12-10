import { createAction } from 'redux-actions';

// Action types
export const GLOBAL_HOTKEY_PRESSED = 'GLOBAL_HOTKEY_PRESSED';

// Action creators
export const globalHotkeyPressed = createAction(GLOBAL_HOTKEY_PRESSED);
