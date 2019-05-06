import { getApplicationManifestUrl, getRuntimeVersion, getRvmVersion } from '../redux/application';
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
  desktopId: string | null;
  event: AnalyticsEvent;
  manifestUrl: string;
  runtimeVersion: string;
  rvmVersion: string;
}

interface AnalyticsEvent {
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
  sessionTimestamp?: string | null;
  sid?: string | number; // subject
  timestamp?: string; // timestamp of event
}

interface MetaOptions {
  includeAppList?: boolean;
  includeFinWindows?: boolean;
}

export const sendAnalytics = async (payload: AnalyticsEvent, metaOptions: MetaOptions = {}, store: Window['store'] = window.store || window.opener.store) => {
  const isAnalyticsOn = isAnalyticsEnvOn();
  if (!store || !isAnalyticsOn) {
    return;
  }

  const state = store.getState();

  const desktopId = getSystemMachineId(state);
  const manifestUrl = getApplicationManifestUrl(state);
  const runtimeVersion = getRuntimeVersion(state);
  const rvmVersion = getRvmVersion(state);
  const sessionTimestamp = getSessionTimestamp(state);
  const sid = getSID(state);
  const timestamp = generateTimestamp();

  const analyticsPayload = {
    desktopId,
    event: { sessionTimestamp, sid, timestamp, ...payload },
    manifestUrl,
    runtimeVersion,
    rvmVersion,
  };

  if (metaOptions.includeAppList) {
    const launcherAppList = getAppListNames(state);
    if (analyticsPayload.event.meta) {
      analyticsPayload.event.meta.launcherAppList = launcherAppList;
    } else {
      analyticsPayload.event.meta = { launcherAppList };
    }
  }

  const fin = window.fin;
  if (fin && metaOptions.includeFinWindows) {
    const finWindows = await fin.System.getAllWindows();

    if (analyticsPayload.event.meta) {
      analyticsPayload.event.meta.windows = finWindows;
    } else {
      analyticsPayload.event.meta = { windows: finWindows };
    }
  }

  return ApiService.postUserStats(analyticsPayload);
};
