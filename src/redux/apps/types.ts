import { App } from '../../types/commons';
import { closeFinAppRequest, finAppClosed, finAppLoading, openFinAppError, openFinAppRequest, openFinAppSuccess } from './actions';

export enum AppStatusStates {
  Closed = 'closed',
  Error = 'error',
  Loading = 'loading',
  Running = 'running',
  Warning = 'warning',
}

// Reducer
export interface AppsById {
  [n: string]: App;
}

export interface AppStatus {
  [id: string]:
    | {
        state: AppStatusStates;
        uuid: string | undefined;
      }
    | undefined;
}

export interface AppsState {
  byId: AppsById;
  ids: string[];
  statusByName: AppStatus;
}

// Payloads
export interface SetMePayload {
  appList: App[];
}

export interface CloseFinAppPayload {
  uuid: string;
}

export interface FinAppPayload {
  id: string;
}

export interface OpenFinAppSuccessPayload {
  id: string;
  uuid: string;
}

// Actions
export type CloseFinAppRequest = ReturnType<typeof closeFinAppRequest>;
export type FinAppClosed = ReturnType<typeof finAppClosed>;
export type FinAppLoading = ReturnType<typeof finAppLoading>;
export type OpenFinAppRequest = ReturnType<typeof openFinAppRequest>;
export type OpenFinAppSuccess = ReturnType<typeof openFinAppSuccess>;
export type OpenFinAppError = ReturnType<typeof openFinAppError>;
