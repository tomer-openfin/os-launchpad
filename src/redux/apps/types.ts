import { App, AppStatusOrigins, AppStatusStates } from '../../types/commons';
import { ActionsUnion } from '../types';
import { closeFinApp, getAppDirectoryList, openFinApp, resetAppDirectoryList, setFinAppStatusState } from './actions';

// Reducer
export interface AppsById {
  [n: string]: App;
}

export interface AppStatus {
  [id: string]:
    | {
        message: string | undefined;
        origin: AppStatusOrigins | undefined;
        state: AppStatusStates;
        uuid: string | undefined;
        runtimeVersion: string | undefined;
      }
    | undefined;
}

export interface AppsState {
  byId: AppsById;
  ids: string[];
  statusById: AppStatus;
}

// Payloads
export interface SetMePayload {
  appList: App[];
}

export interface CloseFinAppPayload {
  uuid: string;
}

export interface FinAppStatusStatePayload {
  id: string;
  statusState: AppStatusStates;
  origin?: AppStatusOrigins;
  message?: string;
}

export interface OpenFinAppSuccessPayload {
  id: string;
  origin: AppStatusOrigins;
  runtimeVersion: string;
  uuid: string;
}

export interface ExternalAppSuccessPayload {
  uuid: string;
}

// Actions
export type AppsActions =
  | ActionsUnion<typeof closeFinApp>
  | ActionsUnion<typeof getAppDirectoryList>
  | ActionsUnion<typeof openFinApp>
  | ReturnType<typeof resetAppDirectoryList>
  | ReturnType<typeof setFinAppStatusState>;
