import { Dispatch } from 'redux';

import { isDevelopmentEnv } from '../../utils/processHelpers';
import { globalHotkeyPressed } from './actions';
import { DevGlobalHotkeys, GlobalHotkeys } from './enums';

type GlobalHotkeyEnumType = typeof DevGlobalHotkeys | typeof GlobalHotkeys;
const registerEnumToFinGlobalHotkey = (Enum: GlobalHotkeyEnumType, dispatch: Dispatch) => {
  const { fin } = window;
  if (!fin) {
    return;
  }

  for (const hotkey in Enum) {
    if (Enum.hasOwnProperty(hotkey)) {
      const hotkeyToRegister = Enum[hotkey];

      const cb = () => {
        dispatch(globalHotkeyPressed(hotkeyToRegister));
      };

      fin.GlobalHotkey.register(hotkeyToRegister, cb);
    }
  }
};

export const registerGlobalDevHotKeys = (dispatch: Dispatch) => {
  if (isDevelopmentEnv()) {
    registerEnumToFinGlobalHotkey(DevGlobalHotkeys, dispatch);
  }
};

export const registerGlobalHotkeys = (dispatch: Dispatch) => {
  registerEnumToFinGlobalHotkey(GlobalHotkeys, dispatch);
};
