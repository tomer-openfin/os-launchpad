import { getUniqueWindowId } from '../windows/utils';
import {
  getMachineId,
  setMonitorInfo,
  storeAllSystemWindows,
  systemEventWindowBoundsChanged,
  systemEventWindowClosed,
  systemEventWindowGroupChanged,
  systemEventWindowHidden,
  systemEventWindowShown,
  systemWindowCreatedWithDetails,
} from './actions';
import { SystemActions, SystemState } from './types';

export const defaultState: SystemState = {
  machineId: null,
  monitorInfo: null,
  windowBoundsById: {},
  windowDetailsById: {},
  windowIds: [],
};

type NormalizedWindows = Pick<SystemState, 'windowBoundsById'> & Pick<SystemState, 'windowDetailsById'> & Pick<SystemState, 'windowIds'>;

export default (state: SystemState = defaultState, action: SystemActions): SystemState => {
  switch (action.type) {
    case getMachineId.success.toString(): {
      return {
        ...state,
        machineId: action.payload.machineId,
      };
    }
    case setMonitorInfo.toString(): {
      const monitorInfo = action.payload;

      return {
        ...state,
        monitorInfo,
      };
    }
    case storeAllSystemWindows.success.toString(): {
      const normalizedWindows: NormalizedWindows = {
        windowBoundsById: {},
        windowDetailsById: {},
        windowIds: [],
      };
      const { windowBoundsById, windowDetailsById, windowIds } = action.payload.reduce((acc, next) => {
        const { height, isGrouped, isShowing, left, name, top, uuid, width } = next;
        const id = getUniqueWindowId(next);
        acc.windowBoundsById[id] = {
          height,
          left,
          name,
          top,
          uuid,
          width,
        };
        acc.windowDetailsById[id] = {
          isGrouped,
          isShowing,
          name,
          uuid,
        };
        acc.windowIds.push(id);
        return acc;
      }, normalizedWindows);

      return {
        ...state,
        windowBoundsById,
        windowDetailsById,
        windowIds,
      };
    }
    case systemEventWindowBoundsChanged.toString(): {
      const { windowBoundsById, windowDetailsById, windowIds } = state;
      const { name, uuid, height, width, top, left } = action.payload;
      const id = getUniqueWindowId(action.payload);
      const systemWindowBounds = state.windowBoundsById[id];

      if (!systemWindowBounds) {
        return {
          ...state,
          windowBoundsById: {
            ...windowBoundsById,
            [id]: {
              height,
              left,
              name,
              top,
              uuid,
              width,
            },
          },
          windowDetailsById: {
            ...windowDetailsById,
            [id]: {
              isGrouped: false,
              isShowing: false,
              name,
              uuid,
            },
          },
          windowIds: [...windowIds, id],
        };
      }

      return {
        ...state,
        windowBoundsById: {
          ...windowBoundsById,
          [id]: {
            ...systemWindowBounds,
            height,
            left,
            top,
            width,
          },
        },
      };
    }
    case systemEventWindowClosed.toString(): {
      const { windowBoundsById, windowDetailsById, windowIds } = state;
      const id = getUniqueWindowId(action.payload);
      const systemWindow = state.windowBoundsById[id] || state.windowDetailsById[id];

      if (!systemWindow) {
        return state;
      }

      const nextWindowBoundsById = { ...windowBoundsById };
      delete nextWindowBoundsById[id];
      const nextWindowDetailsById = { ...windowDetailsById };
      delete nextWindowDetailsById[id];
      const index = windowIds.findIndex(windowId => windowId === id);

      return {
        ...state,
        windowBoundsById: nextWindowBoundsById,
        windowDetailsById: nextWindowDetailsById,
        windowIds: [...windowIds.slice(0, index), ...windowIds.slice(index + 1)],
      };
    }
    case systemWindowCreatedWithDetails.toString(): {
      const { height, isGrouped, isShowing, left, name, top, uuid, width } = action.payload;
      const { windowBoundsById, windowDetailsById, windowIds } = state;
      const id = getUniqueWindowId(action.payload);
      const systemWindow = state.windowBoundsById[id] || state.windowDetailsById[id];

      return {
        ...state,
        windowBoundsById: {
          ...windowBoundsById,
          [id]: {
            height,
            left,
            name,
            top,
            uuid,
            width,
          },
        },
        windowDetailsById: {
          ...windowDetailsById,
          [id]: {
            isGrouped,
            isShowing,
            name,
            uuid,
          },
        },
        windowIds: systemWindow ? windowIds : [...windowIds, id],
      };
    }
    case systemEventWindowHidden.toString(): {
      const { name, uuid } = action.payload;
      const { windowBoundsById, windowDetailsById, windowIds } = state;
      const id = getUniqueWindowId(action.payload);
      const systemWindow = state.windowBoundsById[id] || state.windowDetailsById[id];

      if (!systemWindow) {
        return {
          ...state,
          windowBoundsById: {
            ...windowBoundsById,
            [id]: {
              height: 0,
              left: 0,
              name,
              top: 0,
              uuid,
              width: 0,
            },
          },
          windowDetailsById: {
            ...windowDetailsById,
            [id]: {
              isShowing: false,
              name,
              uuid,
            },
          },
          windowIds: [...windowIds, id],
        };
      }

      return {
        ...state,
        windowDetailsById: {
          ...windowDetailsById,
          [id]: {
            ...windowDetailsById[id],
            isShowing: false,
          },
        },
      };
    }
    case systemEventWindowGroupChanged.toString(): {
      const { name, uuid } = action.payload;
      const { windowBoundsById, windowDetailsById, windowIds } = state;
      const id = getUniqueWindowId(action.payload);
      const systemWindow = state.windowBoundsById[id] || state.windowDetailsById[id];

      const isGrouped = action.payload.memberOf !== 'nothing';

      if (!systemWindow) {
        return {
          ...state,
          windowBoundsById: {
            ...windowBoundsById,
            [id]: {
              height: 0,
              left: 0,
              name,
              top: 0,
              uuid,
              width: 0,
            },
          },
          windowDetailsById: {
            ...windowDetailsById,
            [id]: {
              isGrouped,
              isShowing: false,
              name,
              uuid,
            },
          },
          windowIds: [...windowIds, id],
        };
      }

      return {
        ...state,
        windowDetailsById: {
          ...windowDetailsById,
          [id]: {
            ...windowDetailsById[id],
            isGrouped,
          },
        },
      };
    }
    case systemEventWindowShown.toString(): {
      const { name, uuid } = action.payload;
      const { windowBoundsById, windowDetailsById, windowIds } = state;
      const id = getUniqueWindowId(action.payload);
      const systemWindow = state.windowBoundsById[id] || state.windowDetailsById[id];

      if (!systemWindow) {
        return {
          ...state,
          windowBoundsById: {
            ...windowBoundsById,
            [id]: {
              height: 0,
              left: 0,
              name,
              top: 0,
              uuid,
              width: 0,
            },
          },
          windowDetailsById: {
            ...windowDetailsById,
            [id]: {
              isShowing: true,
              name,
              uuid,
            },
          },
          windowIds: [...windowIds, id],
        };
      }

      return {
        ...state,
        windowDetailsById: {
          ...windowDetailsById,
          [id]: {
            ...windowDetailsById[id],
            isShowing: true,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};
