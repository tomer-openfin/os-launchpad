import { normalizeData } from '../../utils/reduxHelpers';

import { UserLayout } from '../../types/commons';
import { CREATE_LAYOUT, DELETE_LAYOUT, GET_LAYOUTS, UPDATE_LAYOUT } from './actions';
import { GetLayoutsSuccess, LayoutsActions, LayoutsState } from './types';

const defaultState: LayoutsState = {
  byId: {},
  ids: [],
};

export default (state: LayoutsState = defaultState, action: LayoutsActions) => {
  switch (action.type) {
    case GET_LAYOUTS.SUCCESS: {
      return normalizeData<UserLayout>((action as GetLayoutsSuccess).payload!);
    }
    case UPDATE_LAYOUT.SUCCESS:
    case CREATE_LAYOUT.SUCCESS: {
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
    case DELETE_LAYOUT.SUCCESS: {
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
    default: {
      return state;
    }
  }
};
