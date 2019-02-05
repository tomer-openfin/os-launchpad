import { Layout } from 'openfin-layouts/dist/client/types';

import { RouteComponentProps } from 'react-router';
import { ResponseStatus, UserStatus } from './enums';

export interface App {
  appPage: string;
  appUrl?: string;
  contexts: Array<{ $type: string }>;
  contact_email: string;
  description: string;
  icon: string;
  id: string;
  images: Array<{ url: string }>;
  intents: Array<{ displayName: string; name: string }>;
  manifest_url?: string;
  name: string;
  publisher: string;
  signature: string;
  support_email: string | null;
  title: string;
  withAppUrl?: boolean;
}

export interface Bounds extends Dimensions, PrimaryDirectionalCoordinates {}

export interface Dimensions {
  height: number;
  width: number;
}

export interface ResponseObject {
  status: ResponseStatus;
  message?: string;
}

// TODO: ensure type consistency across all Api Response objects
// Ideal types are:
//
// export interface APIResponse<T> extends Response {
//   status: ResponseStatus;
//   message?: string;
//   data?: T;
// }
//
// export interface ErrorResponse<T> extends APIResponse<T> {
//   status: ResponseStatus.FAILURE;
// }

/* tslint:disable-next-line:no-any */
export type APIResponse = ResponseObject | any;

export interface ErrorResponse extends APIResponse {
  status: ResponseStatus.FAILURE;
}

export interface Theme {
  backgroundColor: string;
  id: string;
  name: string;
}

export interface LoginErrorResponse {
  status: string | 'newPassword';
  message?: string;
  requiredFields?: string[];
}

export interface PrimaryDirectionalCoordinates {
  left: number;
  top: number;
}

export interface DirectionalCoordinates extends PrimaryDirectionalCoordinates {
  bottom: number;
  right: number;
}

export interface User {
  email: string;
  firstName: string;
  id: string;
  isAdmin: boolean;
  lastName: string;
  middleInitial: string;
  tmpPassword?: string;
  username: string;
  phone?: string;
  // created on backend
  created?: string;
  enabled?: boolean;
  lastModified?: string;
  status?: UserStatus;
}

export interface ObjectWithId {
  id: string | number;
}

export interface ById<T extends ObjectWithId> {
  [n: string]: T;
}

export interface UserLayout {
  id: string;
  name: string;
  layout: Layout;
}

export interface NewUserLayout {
  name: string;
  layout: Layout;
}

export interface MetaWithCallbacks {
  successCb?: Function;
  errorCb?: Function;
}

export interface XYCoord {
  x: number;
  y: number;
}

/* tslint:disable-next-line:no-any */
export type RequestFormSubmit<T = any> = (payload: T, meta: MetaWithCallbacks, actions?) => void;

export type PushRoute = RouteComponentProps['history']['push'];
