import normalizeRedux from '../../utils/normalizeRedux';

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
      return normalizeRedux<UserLayout>((action as GetLayoutsSuccess).payload!);
    }
    case UPDATE_LAYOUT.SUCCESS:
    case CREATE_LAYOUT.SUCCESS: {
      const { id } = action.payload;

      const ids = state.ids.includes(id) ? state.ids : [...state.ids, id];

      return {
        byId: {
          ...state.byId,
          [id]: action.payload,
        },
        ids,
      };
    }
    case DELETE_LAYOUT.SUCCESS: {
      const { id } = action.payload;

      const { [id]: deletedItem, ...byId } = state.byId;

      const ids: string[] = Object.keys(byId);

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
