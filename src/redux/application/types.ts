import {
  applicationStarted,
  collapseApp,
  expandApp,
  openfinReady,
  reboundLauncherRequest,
  setBlurringWindow,
  setIsDragAndDrop,
  setIsDrawerExpanded,
  setIsEnterprise,
  setIsExpanded,
} from './actions';

// State
export interface ApplicationState {
  blurringWindows: {
    [name: string]: boolean;
  };
  isDragAndDrop: boolean;
  isDrawerExpanded: boolean;
  isEnterprise: boolean;
  isExpanded: boolean;
}

// Action payloads
export interface OpenfinReadyPayload {
  finName: string;
}

export interface ReboundLauncherRequestPayload {
  delay: number;
  shouldAnimate: boolean;
}

export interface SetBlurringWindowPayload {
  isBlurring: boolean;
  name: string;
}

// Actions
export type ApplicationStartedAction = ReturnType<typeof applicationStarted>;
export type CollapseAppAction = ReturnType<typeof collapseApp>;
export type ExpandAppAction = ReturnType<typeof expandApp>;
export type OpenfinReadyAction = ReturnType<typeof openfinReady>;
export type ReboundLauncherRequestAction = ReturnType<typeof reboundLauncherRequest>;
export type SetBlurringWindowAction = ReturnType<typeof setBlurringWindow>;
export type SetIsDragAndDropAction = ReturnType<typeof setIsDragAndDrop>;
export type SetIsDrawerExpandedAction = ReturnType<typeof setIsDrawerExpanded>;
export type SetIsEnterpriseAction = ReturnType<typeof setIsEnterprise>;
export type SetIsExpandedAction = ReturnType<typeof setIsExpanded>;

export type ApplicationActions =
  | ApplicationStartedAction
  | CollapseAppAction
  | ExpandAppAction
  | OpenfinReadyAction
  | ReboundLauncherRequestAction
  | SetIsDragAndDropAction
  | SetIsDrawerExpandedAction
  | SetIsEnterpriseAction
  | SetIsExpandedAction;
