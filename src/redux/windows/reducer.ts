import { Window } from '@giantmachines/redux-openfin';

import { WINDOW_HIDDEN, WINDOW_SHOWN } from './actions';
import { WindowHiddenAction, WindowsActions, WindowShownAction, WindowsState } from './types';

const defaultState = {
  ...Window.reducer(undefined, {}),
};

const isShowingMutation = (state: WindowsState, action: WindowHiddenAction | WindowShownAction, isShowing: boolean) => {
  if (!action.payload) {
    return state;
  }

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

export default (state: WindowsState = defaultState, action: WindowsActions) => {
  const windowState = Window.reducer(state, action);

  switch (action.type) {
    case WINDOW_HIDDEN: {
      return isShowingMutation(windowState, action, false);
    }
    case WINDOW_SHOWN: {
      return isShowingMutation(windowState, action, true);
    }
    default: {
      return windowState;
    }
  }
};
