export interface App {
  appPage: string;
  contexts: Array<{ $type: string }>;
  contact_email: string;
  description: string;
  icon: string;
  id: string | number;
  images: Array<{ url: string }>;
  intents: Array<{ displayName: string; name: string }>;
  manifest_url: string;
  name: string;
  publisher: string;
  signature: string;
  support_email: string | null;
  title: string;
}

export interface Bounds extends Dimensions, DirectionalCoordinates {}

export interface CreateAppResponse {
  status: 'ok' | 'failure';
  message?: string;
}

export interface DeleteAppResponse {
  status: 'ok' | 'failure';
  message?: string;
}

export interface UpdateAppResponse {
  status: 'ok' | 'failure';
  message?: string;
}

export enum AppFormNames {
  Logo = 'AppLogo',
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface ErrorResponse {
  status: string;
  message?: string;
}

export type MonitorInfo = fin.MonitorInfo;

export interface Theme {
  backgroundColor: string;
  id: string;
  name: string;
}

export enum LauncherPosition {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export interface LoginErrorResponse {
  status: string | 'newPassword';
  message?: string;
  requiredFields?: string[];
}

export interface DirectionalCoordinates {
  left: number;
  top: number;
}

export interface User {
  email: string;
  firstName: string;
  id: string;
  isAdmin: boolean;
  lastName: string;
  middleInitial: string;
  organizationId: string;
  username: string;
  password: string;
}

export interface ObjectWithId {
  id: string | number;
}

export interface ById<T extends ObjectWithId> {
  [n: string]: T;
}
