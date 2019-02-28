import { globalHotkeyPressed } from './actions';

export interface GlobalHotkeyPressedPayload {
  hotkey: string;
}

export type GlobalHotkeyPressedAction = ReturnType<typeof globalHotkeyPressed>;
