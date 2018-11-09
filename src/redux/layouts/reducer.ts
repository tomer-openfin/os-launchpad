import { Layout } from 'openfin-layouts/dist/client/types';

import normalizeRedux from '../../utils/normalizeRedux';

import { GET_LAYOUTS, RESTORE_LAYOUT, SAVE_LAYOUT } from './actions';
import { GetLayoutsSuccess, LayoutsActions, LayoutsState, SaveLayoutRequest, SaveLayoutSuccess } from './types';

const defaultState: LayoutsState = {
  byId: {},
  ids: [],
};

export default (state: LayoutsState = defaultState, action: LayoutsActions) => {
  switch (action.type) {
    case GET_LAYOUTS.SUCCESS: {
      return normalizeRedux<Layout>((action as GetLayoutsSuccess).payload!, 'customData');
    }

    case SAVE_LAYOUT.REQUEST: {
      return {
        ...state,
        byId: {
          ...(action as SaveLayoutRequest).payload!,
        },
      };
    }

    case SAVE_LAYOUT.SUCCESS: {
      return {
        ...state,
        byId: {
          ...(action as SaveLayoutSuccess).payload!,
        },
      };
    }

    case RESTORE_LAYOUT: {
      // tslint:disable:no-console
      console.log('Attempting to restore layout...');
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};
