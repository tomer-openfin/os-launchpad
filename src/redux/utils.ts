import { AnyAction } from 'redux';
import { takeEvery } from 'redux-saga/effects';
import { createCustomAction } from 'typesafe-actions';

import { MetaWithAsyncHandlers } from '../types/commons';

interface ErrorMeta<P> {
  payload?: P;
}

export const createAction = <T extends string>(t: T) => <Payload = void, Meta = void>() => {
  return createCustomAction(t, type => {
    const actionCreator = (payload: Payload, meta?: Meta extends void ? MetaWithAsyncHandlers<Payload> : Meta) => ({
      meta,
      payload,
      type,
    });
    actionCreator.toString = () => type;
    return actionCreator;
  });
};

/**
 * Types should follow the pattern _REQUEST, _SUCCESS, _FAILURE
 *
 * @param {string} requestType - a base type ending in _REQUEST
 * @param {string} successType - a base type ending in _SUCCESS
 * @param {string} failureType - a base type ending in _FAILURE
 */
export const createAsyncActionCreators = <RequestType extends string, SuccessType extends string, FailureType extends string>(
  requestType: RequestType,
  successType: SuccessType,
  failureType: FailureType,
) => {
  return <RequestPayload = void, SuccessPayload = void, FailurePayload extends Error | void = void, Meta = {}>() => {
    const failureActionCreator = createCustomAction(failureType, type => {
      const actionCreator = (payload: FailurePayload, meta?: MetaWithAsyncHandlers<SuccessPayload> & ErrorMeta<RequestPayload> & Meta) => ({
        meta,
        payload,
        type,
      });
      actionCreator.toString = () => type;
      return actionCreator;
    });

    const requestActionCreator = createCustomAction(requestType, type => {
      const actionCreator = (payload: RequestPayload, meta?: MetaWithAsyncHandlers<SuccessPayload> & Meta) => ({
        meta,
        payload,
        type,
      });
      actionCreator.toString = () => type;
      return actionCreator;
    });

    const successActionCreator = createCustomAction(successType, type => {
      const actionCreator = (payload: SuccessPayload, meta?: MetaWithAsyncHandlers<SuccessPayload> & Meta) => ({
        meta,
        payload,
        type,
      });
      actionCreator.toString = () => type;
      return actionCreator;
    });

    return {
      failure: failureActionCreator,
      request: requestActionCreator,
      success: successActionCreator,
    };
  };
};

export const getErrorFromCatch = (e): Error => (e instanceof Error ? e : new Error(e));

export function* watchAsyncFailure(action: AnyAction) {
  const { payload, meta } = action;
  if (!meta || typeof meta.onFailure !== 'function') {
    return;
  }

  // tslint:disable-next-line:no-console
  console.warn('watchAsyncFailure', action);

  meta.onFailure(payload, meta.payload);
}

export function* watchAsyncSuccess(action: AnyAction) {
  const { payload, meta } = action;
  if (!meta || typeof meta.onSuccess !== 'function') {
    return;
  }

  meta.onSuccess(payload);
}

export function* asyncActionsSaga() {
  yield takeEvery(action => /_SUCCESS$/.test(action.type), watchAsyncSuccess);
  yield takeEvery(action => /_FAILURE$/.test(action.type), watchAsyncFailure);
}
