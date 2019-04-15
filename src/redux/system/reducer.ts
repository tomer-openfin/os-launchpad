import { getMachineId, setMonitorInfo } from './actions';
import { SystemActions, SystemState } from './types';

export const defaultState: SystemState = {
  machineId: null,
  monitorInfo: null,
};

export default (state: SystemState = defaultState, action: SystemActions) => {
  switch (action.type) {
    case getMachineId.success.toString(): {
      return {
        ...state,
        machineId: action.payload.machineId,
      };
    }
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
