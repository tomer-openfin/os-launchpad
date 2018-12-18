import { Layout } from 'openfin-layouts/dist/client/types';

import { AppListTypes, ResponseStatus } from './enums';

export interface App {
  appPage: string;
  contexts: Array<{ $type: string }>;
  contact_email: string;
  description: string;
  icon: string;
  id: string;
  images: Array<{ url: string }>;
  intents: Array<{ displayName: string; name: string }>;
  manifest_url: string;
  name: string;
  publisher: string;
  signature: string;
  support_email: string | null;
  title: string;
}

export interface AppListItem {
  id: string;
  type: AppListTypes;
}

export interface Bounds extends Dimensions, PrimaryDirectionalCoordinates {}

export interface Dimensions {
  height: number;
  width: number;
}

interface Response {
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
export type APIResponse = Response | any;

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
  organizationId: string;
  tmpPassword?: string;
  username: string;
  phone?: string;
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
  successCb: Function;
  errorCb?: Function;
}
