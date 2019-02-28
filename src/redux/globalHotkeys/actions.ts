import { createAction } from 'redux-actions';

import { GlobalHotkeyPressedPayload } from './types';

// Action types
export const GLOBAL_HOTKEY_PRESSED = 'GLOBAL_HOTKEY_PRESSED';

// Action creators
export const globalHotkeyPressed = createAction<GlobalHotkeyPressedPayload>(GLOBAL_HOTKEY_PRESSED);
