import { App } from '../../types/commons';

// Reducer
export interface AppsById {
  [n: number]: App;
}

export interface AppsState {
  ids: string[];
  byId: AppsById;
}

// Payloads
export interface SetMePayload {
  appList: App[];
}
