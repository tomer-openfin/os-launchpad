import { createAction } from '../utils';
import { GlobalHotkeyPressedPayload } from './types';

// Action types
const GLOBAL_HOTKEY_PRESSED = 'GLOBAL_HOTKEY_PRESSED';

// Action creators
export const globalHotkeyPressed = createAction(GLOBAL_HOTKEY_PRESSED)<GlobalHotkeyPressedPayload>();
