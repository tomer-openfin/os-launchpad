import { globalHotkeyPressed } from './actions';
import { DevGlobalHotkeys, GlobalHotkeys } from './enums';

export interface GlobalHotkeyPressedPayload {
  hotkey: typeof GlobalHotkeys[keyof typeof GlobalHotkeys] | typeof DevGlobalHotkeys[keyof typeof DevGlobalHotkeys];
}

export type GlobalHotkeyPressedAction = ReturnType<typeof globalHotkeyPressed>;
