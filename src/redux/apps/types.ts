import { App, AppStatusOrigins, AppStatusStates } from '../../types/commons';
import {
  closeFinAppError,
  closeFinAppRequest,
  closeFinAppSuccess,
  openFinAppError,
  openFinAppRequest,
  openFinAppSuccess,
  setFinAppStatusState,
} from './actions';

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

export interface OpenFinAppErrorPayload {
  id: string;
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

// Actions
export type CloseFinAppRequest = ReturnType<typeof closeFinAppRequest>;
export type CloseFinAppSuccess = ReturnType<typeof closeFinAppSuccess>;
export type CloseFinAppError = ReturnType<typeof closeFinAppError>;
export type OpenFinAppRequest = ReturnType<typeof openFinAppRequest>;
export type OpenFinAppSuccess = ReturnType<typeof openFinAppSuccess>;
export type OpenFinAppError = ReturnType<typeof openFinAppError>;
export type SetFinAppStatusState = ReturnType<typeof setFinAppStatusState>;
