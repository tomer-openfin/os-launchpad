import { CLOSE_CONTEXT_MENU, OPEN_CONTEXT_MENU } from './actions';
import { ContextMenuState, OpenContextMenuSuccess } from './types';

const defaultState: ContextMenuState = {
  anchor: undefined,
  bounds: undefined,
  isOpen: false,
  options: [],
  // TODO: Add origin window name to know where context menu is attached,
  //       will be needed if context menu is attached to
  //       a window other than the main app launcher
};

export default (state: ContextMenuState = defaultState, action) => {
  switch (action.type) {
    case OPEN_CONTEXT_MENU.SUCCESS: {
      const { payload } = action as OpenContextMenuSuccess;
      if (!payload) {
        return state;
      }

      const { anchor, bounds, options } = payload;
      return {
        ...state,
        anchor,
        bounds,
        isOpen: true,
        options,
      };
    }
    case CLOSE_CONTEXT_MENU.SUCCESS: {
      return defaultState;
    }
    default: {
      return state;
    }
  }
};
