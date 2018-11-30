import { App } from '../../types/commons';
import { closeFinAppRequest, finAppClosed, finAppLoading, openFinAppError, openFinAppRequest, openFinAppSuccess } from './actions';

export enum AppStatusStates {
  Loading = 'loading',
  Running = 'running',
  Closed = 'closed',
}

// Reducer
export interface AppsById {
  [n: string]: App;
}

export interface AppStatus {
  [name: string]:
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
  name: string;
}

export interface OpenFinAppSuccessPayload {
  name: string;
  uuid: string;
}

// Actions
export type CloseFinAppRequest = ReturnType<typeof closeFinAppRequest>;
export type FinAppClosed = ReturnType<typeof finAppClosed>;
export type FinAppLoading = ReturnType<typeof finAppLoading>;
export type OpenFinAppRequest = ReturnType<typeof openFinAppRequest>;
export type OpenFinAppSuccess = ReturnType<typeof openFinAppSuccess>;
export type OpenFinAppError = ReturnType<typeof openFinAppError>;
