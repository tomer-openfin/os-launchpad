import { getSessionTimestamp, getSID } from '../redux/me';
import { getSystemMachineId } from '../redux/system';
import ApiService from '../services/ApiService';
import { isAnalyticsEnvOn } from './processHelpers';
import { generateTimestamp } from './timestampUtils';

export enum EventType {
  Click = 'click',
  Close = 'close',
  Login = 'login',
  Logout = 'logout',
  Open = 'open',
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

export const sendAnalytics = (payload: SendAnalyticsPayload, store: Window['store'] = window.store || window.opener.store) => {
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

  return ApiService.postUserStats(analyticsPayload);
};
