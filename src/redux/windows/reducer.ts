import { Window } from '@giantmachines/redux-openfin';

import { DeepReadonly } from '../../types/utils';
import { windowHidden, windowShown } from './actions';
import { WindowsActions, WindowsState } from './types';

const defaultState = {
  ...Window.reducer(undefined, {}),
};

type ReadonlyWindowState = DeepReadonly<WindowsState>;

const isShowingMutation = (state: ReadonlyWindowState, action: ReturnType<typeof windowHidden> | ReturnType<typeof windowShown>, isShowing: boolean) => {
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

export default (state: ReadonlyWindowState = defaultState, action: WindowsActions): ReadonlyWindowState => {
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
