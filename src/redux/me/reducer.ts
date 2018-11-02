import {
  MeActions,
  MeState,
  SET_ME,
  SetMePayload,
} from './';

const defaultState: MeState = { username: '' };

export default (state: MeState = defaultState, action: MeActions) => {
  switch (action.type) {
    case SET_ME: {
      return {
        ...state,
        username: (action.payload! as SetMePayload).username,
      };
    }
    default: {
      return state;
    }
  }
};
