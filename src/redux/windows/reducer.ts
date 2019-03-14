import { Window } from '@giantmachines/redux-openfin';

import { windowHidden, windowShown } from './actions';
import { WindowsActions, WindowsState } from './types';

const defaultState = {
  ...Window.reducer(undefined, {}),
};

const isShowingMutation = (state: WindowsState, action: ReturnType<typeof windowHidden> | ReturnType<typeof windowShown>, isShowing: boolean) => {
  const { name } = action.payload;
  const window = state.byId[name];
  const byId = {
    ...state.byId,
    [name]: {
      ...window,
      isShowing,
    },
  };
  const ids = window ? state.ids : [...state.ids, name];

  return {
    ...state,
    byId,
    ids,
  };
};

export default (state: WindowsState = defaultState, action: WindowsActions): WindowsState => {
  const windowState = Window.reducer(state, action);

  switch (action.type) {
    case windowHidden.toString(): {
      return isShowingMutation(windowState, action, false);
    }
    case windowShown.toString(): {
      return isShowingMutation(windowState, action, true);
    }
    default: {
      return windowState;
    }
  }
};
