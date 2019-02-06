import { SET_MONITOR_INFO } from './actions';
import { SetMonitorInfoAction, SystemActions, SystemState } from './types';

export const defaultState: SystemState = {
  monitorInfo: null,
};

export default (state: SystemState = defaultState, action: SystemActions) => {
  switch (action.type) {
    case SET_MONITOR_INFO: {
      const monitorInfo = (action as SetMonitorInfoAction).payload;
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
