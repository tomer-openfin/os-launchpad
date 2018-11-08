import { SET_MONITOR_INFO } from './actions';
import { SetMonitorInfo, SystemActions, SystemState } from './types';

export const defaultState: SystemState = {
  monitorInfo: {},
};

export default (state: SystemState = defaultState, action: SystemActions) => {
  switch (action.type) {
    case SET_MONITOR_INFO: {
      return {
        ...state,
        monitorInfo: (action as SetMonitorInfo).payload || {},
      };
    }
    default: {
      return state;
    }
  }
};
