import { App } from '../../types/commons';

// Reducer
export interface AppsById {
  [n: number]: App;
}

export interface AppsState {
  ids: string[];
  byId: AppsById;
  launcherIds: string[];
}

// Payloads
export interface SetMePayload {
  appList: App[];
}
