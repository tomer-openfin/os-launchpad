import { Layout } from 'openfin-layouts/dist/client/types';

import normalizeRedux from '../../utils/normalizeRedux';

import { GET_LAYOUTS } from './actions';
import { GetLayoutsSuccess, LayoutsActions, LayoutsState } from './types';

const defaultState: LayoutsState = {
  byId: {},
  ids: [],
};

export default (state: LayoutsState = defaultState, action: LayoutsActions) => {
  switch (action.type) {
    case GET_LAYOUTS.SUCCESS: {
      return normalizeRedux<Layout>((action as GetLayoutsSuccess).payload!, 'customData');
    }
    default: {
      return state;
    }
  }
};
