import { AnyAction } from 'redux';

import { MeActions, MeState, SET_ME } from './';

const defaultState: MeState = { username: '' };

export default (state: MeState = defaultState, action: MeActions) => {
  switch (action.type) {
    case SET_ME: {
      return {
        ...state,
        username: action.payload!.username,
      };
    }
    default: {
      return state;
    }
  }
};
