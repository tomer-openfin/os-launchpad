import { DeepReadonly } from '../../types/utils';
import { closeContextMenu, openContextMenu } from './actions';
import { ContextMenuActions, ContextMenuState } from './types';

type ReadonlyContextMenuState = DeepReadonly<ContextMenuState>;

const defaultState: ReadonlyContextMenuState = {
  anchor: undefined,
  bounds: undefined,
  options: [],
  // TODO: Add origin window name to know where context menu is attached,
  //       will be needed if context menu is attached to
  //       a window other than the main app launcher
};

export default (state: ReadonlyContextMenuState = defaultState, action: ContextMenuActions): ReadonlyContextMenuState => {
  switch (action.type) {
    case openContextMenu.success.toString(): {
      const { anchor, bounds, options } = action.payload;
      return {
        ...state,
        anchor,
        bounds,
        options,
      };
    }
    case closeContextMenu.success.toString(): {
      return defaultState;
    }
    default: {
      return state;
    }
  }
};
