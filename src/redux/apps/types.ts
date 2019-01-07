import { App } from '../../types/commons';
import { closeFinAppRequest, openFinAppError, openFinAppRequest, openFinAppSuccess, setFinAppStatusState } from './actions';

export enum AppStatusStates {
  Closed = 'closed',
  Error = 'error',
  Loading = 'loading',
  Running = 'running',
  Warning = 'warning',
}

export enum AppStatusOrigins {
  Default = 'default',
  Event = 'event',
  LayoutRestore = 'layoutRestore',
}

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

export interface OpenFinAppErrorPayload {
  id: string;
}

export interface FinAppStatusStatePayload {
  id: string;
  statusState: AppStatusStates;
  origin: AppStatusOrigins;
  message?: string;
}

export interface OpenFinAppSuccessPayload {
  id: string;
  uuid: string;
  origin: AppStatusOrigins;
}

// Actions
export type CloseFinAppRequest = ReturnType<typeof closeFinAppRequest>;
export type OpenFinAppRequest = ReturnType<typeof openFinAppRequest>;
export type OpenFinAppSuccess = ReturnType<typeof openFinAppSuccess>;
export type OpenFinAppError = ReturnType<typeof openFinAppError>;
export type SetFinAppStatusState = ReturnType<typeof setFinAppStatusState>;
