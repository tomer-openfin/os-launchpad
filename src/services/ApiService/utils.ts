import { logout } from '../../redux/me';

import { ApiResponse, ApiResponseStatus, HTTPMethods } from '../../types/commons';
import { detectAuth } from '../../utils/cookieUtils';

export const transformNullCheck = <T>(defaultData: T) => (json: unknown) => {
  if (!json) {
    return { data: defaultData };
  }
  return { data: json as T };
};

export const transformObjectCheck = <T extends {}>(context: string, key?: string) => (json: unknown) => {
  if (typeof json === 'object' && json) {
    if (!key) {
      return { data: json as T };
    } else if (json.hasOwnProperty(key)) {
      return { data: json[key] as T };
    }
  }

  throw new Error(`${context} transform failed type check`);
};

const STATUS_ERROR_MESSAGE = {
  413: 'Payload too large.',
};

const createOptions = <Body>(requestMethod: HTTPMethods, body?: Body, optionOverrides?: RequestInit): RequestInit => ({
  body: JSON.stringify(body || undefined),
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
  method: requestMethod,
  mode: 'cors',
  ...optionOverrides,
});

export const api = <Data, Body = void, Meta = void>(
  endpoint: string,
  method: HTTPMethods,
  transform: (arg: unknown) => { data: Data; meta?: Meta },
  optionsOverrides?: RequestInit,
) => async (body: Body): Promise<ApiResponse<Data, Meta>> => {
  try {
    const response = await fetch(endpoint, createOptions<Body>(method, body, optionsOverrides));

    if (response.status >= 400) {
      if (response.status === 401 && detectAuth()) {
        window.store.dispatch(logout.request({ message: 'You were logged out due to a system error.', isError: true }));
      }

      const failureJson = await response.json().catch(e => {
        const errorMessage = STATUS_ERROR_MESSAGE[response.status];
        return errorMessage ? new Error(errorMessage) : e;
      });
      throw { status: response.status, error: failureJson };
    }

    const json = await response.json();
    const dataAndMeta = transform(json);

    return { status: ApiResponseStatus.Success, statusCode: response.status, ...dataAndMeta };
  } catch (e) {
    const args = { endpoint, method, transform, optionsOverrides };
    if (e instanceof Error) {
      return { status: ApiResponseStatus.Failure, message: e.message, meta: { args } };
    }

    if (e.error instanceof Error) {
      return { status: ApiResponseStatus.Failure, statusCode: e.status, message: e.error.message, meta: { args } };
    }

    if (e && e.error && typeof e.error === 'object') {
      return {
        message: e.error.message,
        meta: { args, ...e.error },
        status: ApiResponseStatus.Failure,
        statusCode: e.status,
      };
    }

    return { status: ApiResponseStatus.Failure, message: typeof e === 'string' ? e : 'Unknown error', meta: { args } };
  }
};
