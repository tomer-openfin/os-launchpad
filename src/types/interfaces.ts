import { RouteComponentProps } from 'react-router-dom';

import { ApiResponseStatus, UserStatus, YesNo } from './enums';
import { Workspace } from './fin';

export interface App {
  appPage?: string;
  appUrl?: string;
  contexts?: Array<{ $type: string }>;
  contact_email?: string;
  description: string;
  icon: string;
  id: string;
  images?: Array<{ url: string }>;
  intents?: Array<{ displayName: string; name: string }>;
  manifest_url?: string;
  name: string;
  publisher?: string;
  signature?: string;
  support_email?: string | null;
  title: string;
  withAppUrl?: boolean;
}

export interface Bounds extends Dimensions, PrimaryDirectionalCoordinates {}

export interface Dimensions {
  height: number;
  width: number;
}

export interface BaseApiResponse<M> {
  status: ApiResponseStatus;
  statusCode?: number;
  meta?: M;
}

export interface ApiSuccessResponse<T, M = void> extends BaseApiResponse<M> {
  data: T;
  status: ApiResponseStatus.Success;
}

/* tslint:disable-next-line:no-any */
export interface ApiFailureResponse extends BaseApiResponse<{ [key: string]: any }> {
  message: string;
  status: ApiResponseStatus.Failure;
}

export type ApiResponse<T, M = void> = ApiSuccessResponse<T, M> | ApiFailureResponse;

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

export interface Point {
  x: number;
  y: number;
}

export interface User {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
  middleName?: string;
  tmpPassword?: string;
  phone: string;
  // created on backend
  readonly created?: string;
  readonly enabled?: boolean;
  readonly id: string;
  readonly lastModified?: string;
  readonly status?: UserStatus;
  readonly username: string;
}

export interface UserFormData {
  email: string;
  firstName: string;
  isAdmin: YesNo;
  lastName: string;
  middleName?: string;
  tmpPassword?: string;
  phone: string;
  // created on backend
  readonly created?: string;
  readonly enabled?: boolean;
  readonly id: string;
  readonly lastModified?: string;
  readonly status?: UserStatus;
  readonly username: string;
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
  layout?: Workspace;
}

export interface NewUserLayout {
  name: string;
  layout: Workspace;
}

export interface MetaWithAsyncHandlers<P = void> {
  onSuccess?: (payload: P) => void;
  onFailure?: (error?: Error) => void;
}

export interface XYCoord {
  x: number;
  y: number;
}

/* tslint:disable-next-line:no-any */
export type DispatchRequest<T = any, M = void> = (payload: T, meta: MetaWithAsyncHandlers<M>, actions?) => void;

export type PushRoute = (route: string, item?) => ReturnType<RouteComponentProps['history']['push']>;
