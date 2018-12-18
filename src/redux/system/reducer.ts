import { SET_MONITOR_INFO } from './actions';
import { SetMonitorInfo, SystemActions, SystemState } from './types';

export const defaultState: SystemState = {
  monitorInfo: null,
};

export default (state: SystemState = defaultState, action: SystemActions) => {
  switch (action.type) {
    case SET_MONITOR_INFO: {
      const monitorInfo = (action as SetMonitorInfo).payload;
      if (!monitorInfo) {
        return state;
      }

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
