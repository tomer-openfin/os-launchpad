import { applicationStarted, openfinReady, setIsEnterprise } from './actions';

// State
export interface ApplicationState {
  isEnterprise: boolean;
}

// Action payloads
export interface OpenfinReadyPayload {
  finName: string;
}

// Actions creators
export type ApplicationStartedAction = ReturnType<typeof applicationStarted>;
export type IsEnterpriseAction = ReturnType<typeof setIsEnterprise>;
export type OpenfinReadyAction = ReturnType<typeof openfinReady>;

export type ApplicationActions = ApplicationStartedAction | IsEnterpriseAction | OpenfinReadyAction;
