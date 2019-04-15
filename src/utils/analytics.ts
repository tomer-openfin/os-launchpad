import { getSessionTimestamp, getSID } from '../redux/me';
import { getAppListNames } from '../redux/selectors';
import { getSystemMachineId } from '../redux/system';
import ApiService from '../services/ApiService';
import { isAnalyticsEnvOn } from './processHelpers';
import { generateTimestamp } from './timestampUtils';

export enum EventType {
  Click = 'click',
  Close = 'close',
  Drag = 'drag',
  Drop = 'drop',
  HotKey = 'hotkey',
  Login = 'login',
  Logout = 'logout',
}

export interface SendAnalyticsPayload {
  // sid: number; // subject
  // machineId: string; // subject
  // sessionTimestamp?: string;

  timestamp?: string; // timestamp of event
  type: EventType; // verb/action which occurred
  label: string; // what the verb/action acted upon
  context?: {
    // additional information pertaining to what was acted upon
    // tslint:disable-next-line:no-any
    [key: string]: any;
  };
  meta?: {
    // secondary information pertaining to what was acted upon based on the action
    // tslint:disable-next-line:no-any
    [key: string]: any;
  };
}

export interface PostUserStatsPayload extends SendAnalyticsPayload {
  machineId: string | null;
  sessionTimestamp: string | null;
  sid: number;
  timestamp: string;
}

interface MetaOptions {
  includeAppList?: boolean;
  includeFinWindows?: boolean;
}

export const sendAnalytics = async (
  payload: SendAnalyticsPayload,
  metaOptions: MetaOptions = {},
  store: Window['store'] = window.store || window.opener.store,
) => {
  const isAnalyticsOn = isAnalyticsEnvOn();
  if (!store || !isAnalyticsOn) {
    return;
  }

  const timestamp = payload.timestamp || generateTimestamp();

  const state = store.getState();
  const sid = getSID(state);
  const machineId = getSystemMachineId(state);
  const sessionTimestamp = getSessionTimestamp(state);

  const analyticsPayload = {
    machineId,
    sessionTimestamp,
    sid,
    ...payload,
    timestamp,
  };

  if (metaOptions.includeAppList) {
    const launcherAppList = getAppListNames(state);
    if (analyticsPayload.meta) {
      analyticsPayload.meta.launcherAppList = launcherAppList;
    } else {
      analyticsPayload.meta = { launcherAppList };
    }
  }

  const fin = window.fin;
  if (fin && metaOptions.includeFinWindows) {
    const finWindows = await fin.System.getAllWindows();

    if (analyticsPayload.meta) {
      analyticsPayload.meta.windows = finWindows;
    } else {
      analyticsPayload.meta = { windows: finWindows };
    }
  }

  return ApiService.postUserStats(analyticsPayload);
};
