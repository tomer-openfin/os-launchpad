import { Action } from 'redux';

export interface App {
  appPage: string;
  contact_email: string;
  description: string;
  icon: string;
  id: number;
  images: Array<{}>;
  manifest_url: string;
  name: string;
  publisher: string;
  signature: string;
  support_email: string | null;
  title: string;
}

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
