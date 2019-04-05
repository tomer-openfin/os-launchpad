import { normalizeData } from '../../utils/reduxHelpers';
import { createLayout, deleteLayout, getLayouts, resetLayouts, updateLayout } from './actions';
import { LayoutsActions, LayoutsState } from './types';

const defaultState: LayoutsState = {
  byId: {},
  ids: [],
};

export default (state: LayoutsState = defaultState, action: LayoutsActions): LayoutsState => {
  switch (action.type) {
    case getLayouts.success.toString(): {
      return normalizeData(action.payload);
    }
    case updateLayout.success.toString():
    case createLayout.success.toString(): {
      const { layout } = action.payload;
      const { id } = layout;

      const ids = state.ids.includes(id) ? state.ids : [...state.ids, id];

      return {
        byId: {
          ...state.byId,
          [id]: layout,
        },
        ids,
      };
    }
    case deleteLayout.success.toString(): {
      const id = action.payload;

      const idIndex = state.ids.findIndex(el => el === id);
      if (idIndex === -1) {
        return state;
      }

      const byId = { ...state.byId };
      delete byId[id];

      const idsStart = state.ids.slice(0, idIndex);
      const idsEnd = state.ids.slice(idIndex + 1);
      const ids = [...idsStart, ...idsEnd];

      return {
        byId,
        ids,
      };
    }
    case resetLayouts.toString():
    default: {
      return state;
    }
  }
};
