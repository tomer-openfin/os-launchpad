import {
  applicationStarted,
  collapseApp,
  expandApp,
  getManifestError,
  getManifestOverrideError,
  getManifestOverrideRequest,
  getManifestOverrideSuccess,
  getManifestRequest,
  getManifestSuccess,
  openfinReady,
  reboundLauncherRequest,
  setIsDragAndDrop,
  setIsDrawerExpanded,
  setIsEnterprise,
  setIsExpanded,
  setRuntimeVersion,
  updateManifestOverrideError,
  updateManifestOverrideRequest,
  updateManifestOverrideSuccess,
} from './actions';

// State
export interface ApplicationState {
  isDragAndDrop: boolean;
  isDrawerExpanded: boolean;
  isEnterprise: boolean;
  isExpanded: boolean;
  manifest: Manifest;
  manifestOverride: ManifestOverride;
  runtimeVersion: string;
}

export interface ManifestImages {
  shortcut: {
    icon: string;
  };
  splashScreenImage: string;
  startup_app: {
    icon: string;
  };
}

export interface Manifest extends ManifestImages {
  /* tslint:disable-next-line:no-any */
  [key: string]: any;
}

export type ManifestOverride = Partial<Manifest>;

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
export type GetManifestErrorAction = ReturnType<typeof getManifestError>;
export type GetManifestRequestAction = ReturnType<typeof getManifestRequest>;
export type GetManifestSuccessAction = ReturnType<typeof getManifestSuccess>;
export type OpenfinReadyAction = ReturnType<typeof openfinReady>;
export type ReboundLauncherRequestAction = ReturnType<typeof reboundLauncherRequest>;
export type SetIsDragAndDropAction = ReturnType<typeof setIsDragAndDrop>;
export type SetIsDrawerExpandedAction = ReturnType<typeof setIsDrawerExpanded>;
export type SetIsEnterpriseAction = ReturnType<typeof setIsEnterprise>;
export type SetIsExpandedAction = ReturnType<typeof setIsExpanded>;
export type UpdateManifestOverrideRequestAction = ReturnType<typeof updateManifestOverrideRequest>;
export type UpdateManifestOverrideSuccessAction = ReturnType<typeof updateManifestOverrideSuccess>;
export type UpdateManifestOverrideErrorAction = ReturnType<typeof updateManifestOverrideError>;
export type GetManifestOverrideRequestAction = ReturnType<typeof getManifestOverrideRequest>;
export type GetManifestOverrideSuccessAction = ReturnType<typeof getManifestOverrideSuccess>;
export type GetManifestOverrideErrorAction = ReturnType<typeof getManifestOverrideError>;
export type SetRuntimeVersionAction = ReturnType<typeof setRuntimeVersion>;

export type ApplicationActions =
  | ApplicationStartedAction
  | CollapseAppAction
  | ExpandAppAction
  | GetManifestErrorAction
  | GetManifestRequestAction
  | GetManifestSuccessAction
  | OpenfinReadyAction
  | ReboundLauncherRequestAction
  | SetIsDragAndDropAction
  | SetIsDrawerExpandedAction
  | SetIsEnterpriseAction
  | SetIsExpandedAction
  | UpdateManifestOverrideRequestAction
  | UpdateManifestOverrideSuccessAction
  | UpdateManifestOverrideErrorAction
  | SetRuntimeVersionAction;
