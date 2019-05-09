import { Identity } from '../../types/fin';
import { DeepReadonly } from '../../types/utils';
import { openWindow, windowBoundsChanged, windowClosed, windowHidden, windowShown } from './actions';
import { WindowsActions, WindowsState, WindowState } from './types';
import { getUniqueWindowId } from './utils';

type ReadonlyWindowsState = DeepReadonly<WindowsState>;

const defaultState: ReadonlyWindowsState = {
  byId: {},
  ids: [],
};

const addOrUpdateWindowState = (
  state: ReadonlyWindowsState,
  identity: Identity,
  options: Pick<WindowState, 'bounds'> | Pick<WindowState, 'isShowing'>,
): ReadonlyWindowsState => {
  const id = getUniqueWindowId(identity);
  const winState = state.byId[id];
  if (winState) {
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: {
          ...winState,
          ...options,
        },
      },
    };
  }

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...options,
        id,
        name: identity.name || '',
        uuid: identity.uuid,
      },
    },
    ids: [...new Set([...state.ids, id])],
  };
};

export default (state: ReadonlyWindowsState = defaultState, action: WindowsActions): ReadonlyWindowsState => {
  switch (action.type) {
    case openWindow.success.toString(): {
      const id = getUniqueWindowId(action.payload);

      return {
        byId: {
          ...state.byId,
          [id]: {
            ...action.payload,
            id,
          },
        },
        ids: [...new Set([...state.ids, id])],
      };
    }
    case windowBoundsChanged.toString(): {
      const { identity, bounds } = action.payload;
      return addOrUpdateWindowState(state, identity, { bounds });
    }
    case windowClosed.toString(): {
      const id = getUniqueWindowId(action.payload);
      const index = state.ids.findIndex(item => item === id);

      if (index === -1) {
        return state;
      }

      const { byId, ids } = state;
      const nextById = { ...byId };
      delete nextById[id];

      return {
        ...state,
        byId: nextById,
        ids: [...ids.slice(0, index), ...ids.slice(index + 1)],
      };
    }
    case windowHidden.toString(): {
      const { name, uuid } = action.payload;
      return addOrUpdateWindowState(state, { name, uuid }, { isShowing: false });
    }
    case windowShown.toString(): {
      const { name, uuid } = action.payload;
      return addOrUpdateWindowState(state, { name, uuid }, { isShowing: true });
    }
    default: {
      return state;
    }
  }
};
