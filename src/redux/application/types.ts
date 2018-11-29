import { applicationStarted, collapseApp, expandApp, openfinReady, setIsEnterprise, setIsExpanded } from './actions';

// State
export interface ApplicationState {
  isEnterprise: boolean;
  isExpanded: boolean;
}

// Action payloads
export interface OpenfinReadyPayload {
  finName: string;
}

// Actions
export type ApplicationStartedAction = ReturnType<typeof applicationStarted>;
export type CollapseAppAction = ReturnType<typeof collapseApp>;
export type ExpandAppAction = ReturnType<typeof expandApp>;
export type OpenfinReadyAction = ReturnType<typeof openfinReady>;
export type SetIsEnterpriseAction = ReturnType<typeof setIsEnterprise>;
export type SetIsExpandedAction = ReturnType<typeof setIsExpanded>;

export type ApplicationActions =
  | ApplicationStartedAction
  | CollapseAppAction
  | ExpandAppAction
  | OpenfinReadyAction
  | SetIsEnterpriseAction
  | SetIsExpandedAction;
