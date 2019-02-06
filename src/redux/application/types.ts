import {
  applicationStarted,
  collapseApp,
  expandApp,
  openfinReady,
  reboundLauncherRequest,
  setIsDragAndDrop,
  setIsDrawerExpanded,
  setIsEnterprise,
  setIsExpanded,
  setRuntimeVersion,
} from './actions';

// State
export interface ApplicationState {
  isDragAndDrop: boolean;
  isDrawerExpanded: boolean;
  isEnterprise: boolean;
  isExpanded: boolean;
  runtimeVersion: string;
}

// Action payloads
export interface OpenfinReadyPayload {
  finName: string;
}

export interface ReboundLauncherRequestPayload {
  delay: number;
  shouldAnimate: boolean;
}

// Actions
export type ApplicationStartedAction = ReturnType<typeof applicationStarted>;
export type CollapseAppAction = ReturnType<typeof collapseApp>;
export type ExpandAppAction = ReturnType<typeof expandApp>;
export type OpenfinReadyAction = ReturnType<typeof openfinReady>;
export type ReboundLauncherRequestAction = ReturnType<typeof reboundLauncherRequest>;
export type SetIsDragAndDropAction = ReturnType<typeof setIsDragAndDrop>;
export type SetIsDrawerExpandedAction = ReturnType<typeof setIsDrawerExpanded>;
export type SetIsEnterpriseAction = ReturnType<typeof setIsEnterprise>;
export type SetIsExpandedAction = ReturnType<typeof setIsExpanded>;
export type SetRuntimeVersion = ReturnType<typeof setRuntimeVersion>;

export type ApplicationActions =
  | ApplicationStartedAction
  | CollapseAppAction
  | ExpandAppAction
  | OpenfinReadyAction
  | ReboundLauncherRequestAction
  | SetIsDragAndDropAction
  | SetIsDrawerExpandedAction
  | SetIsEnterpriseAction
  | SetIsExpandedAction
  | SetRuntimeVersion;
