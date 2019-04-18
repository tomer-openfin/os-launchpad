export enum LauncherSize {
  Small = 'small',
  Large = 'large',
}

export enum DirectionalPosition {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export enum OnOff {
  Off = 'off',
  On = 'on',
}

export enum YesNo {
  Yes = 'yes',
  No = 'no',
}

export enum Orientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum ApiResponseStatus {
  Success = 'ok',
  Failure = 'error',
}

export enum UserStatus {
  Confirmed = 'CONFIRMED',
  Unconfirmed = 'UNCONFIRMED',
  ChangePassword = 'FORCE_CHANGE_PASSWORD',
}

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

export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
