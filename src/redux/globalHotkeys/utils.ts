import { Dispatch } from 'redux';

import { registerGlobalHotkey } from '../../utils/finUtils';
import { isDevelopmentEnv } from '../../utils/processHelpers';
import { globalHotkeyPressed } from './actions';
import { DevGlobalHotkeys, GlobalHotkeys } from './enums';

type GlobalHotkeyEnumType = typeof DevGlobalHotkeys | typeof GlobalHotkeys;
const registerEnumToFinGlobalHotkey = (Enum: GlobalHotkeyEnumType, dispatch: Dispatch) => {
  for (const hotkey in Enum) {
    if (Enum.hasOwnProperty(hotkey)) {
      const hotkeyToRegister = Enum[hotkey] as DevGlobalHotkeys | GlobalHotkeys;

      const cb = () => {
        dispatch(globalHotkeyPressed({ hotkey: hotkeyToRegister }));
      };

      registerGlobalHotkey(hotkeyToRegister, cb);
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
