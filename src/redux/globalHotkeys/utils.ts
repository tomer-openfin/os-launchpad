import { Dispatch } from 'redux';

import { globalHotkeyPressed } from './actions';
import { DevGlobalHotkeys, GlobalHotkeys } from './enums';

const { NODE_ENV = 'development' } = process.env;

type GlobalHotkeyEnumType = typeof DevGlobalHotkeys | typeof GlobalHotkeys;
const registerEmumToFinGlobalHotkey = (Enum: GlobalHotkeyEnumType, dispatch: Dispatch) => {
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

export const registerGlobalHotkeys = (dispatch: Dispatch) => {
  registerEmumToFinGlobalHotkey(GlobalHotkeys, dispatch);

  if (NODE_ENV === 'development') {
    registerEmumToFinGlobalHotkey(DevGlobalHotkeys, dispatch);
  }
};
