import { setMonitorInfo } from './actions';
import { SystemActions, SystemState } from './types';

export const defaultState: SystemState = {
  monitorInfo: null,
};

export default (state: SystemState = defaultState, action: SystemActions) => {
  switch (action.type) {
    case setMonitorInfo.toString(): {
      const monitorInfo = action.payload;

      return {
        ...state,
        monitorInfo,
      };
    }
    default: {
      return state;
    }
  }
};
