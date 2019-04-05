import { createAsyncActionCreators } from '../utils';

interface RequestPayload {
  foo: string;
}

interface SuccessPayload {
  bar: string;
}

type FailurePayload = Error;

interface Meta {
  onFailure?: () => void;
  onSuccess?: () => void;
}

const TEST_REQUEST = 'TEST_REQUEST';
const TEST_SUCCESS = 'TEST_SUCCESS';
const TEST_ERROR = 'TEST_ERROR';
const requestPayload = { foo: 'bar' };
const successPayload = { bar: 'baz' };
const failurePayload = new Error('foobarbaz');

describe('redux/utils', () => {
  describe('createAsyncActionCreators', () => {
    it('should return an object with request, success, and failure', () => {
      const actionCreators = createAsyncActionCreators(TEST_REQUEST, TEST_SUCCESS, TEST_ERROR)();

      expect(actionCreators.request).toBeDefined();
      expect(actionCreators.success).toBeDefined();
      expect(actionCreators.failure).toBeDefined();
    });

    it('should return action creators with the correct action type suffix', () => {
      const actionCreators = createAsyncActionCreators(TEST_REQUEST, TEST_SUCCESS, TEST_ERROR)();

      expect(actionCreators.request().type).toBe(TEST_REQUEST);
      expect(actionCreators.success().type).toBe(TEST_SUCCESS);
      expect(actionCreators.failure().type).toBe(TEST_ERROR);
    });

    it('should identity map the request payload', () => {
      const actionCreators = createAsyncActionCreators(TEST_REQUEST, TEST_SUCCESS, TEST_ERROR)<RequestPayload>();

      expect(actionCreators.request(requestPayload).payload).toEqual(requestPayload);
      expect(actionCreators.success().payload).toEqual(undefined);
      expect(actionCreators.failure().payload).toEqual(undefined);
    });

    it('should identity map the success payload', () => {
      const actionCreators = createAsyncActionCreators(TEST_REQUEST, TEST_SUCCESS, TEST_ERROR)<void, SuccessPayload>();

      expect(actionCreators.request().payload).toEqual(undefined);
      expect(actionCreators.success(successPayload).payload).toEqual(successPayload);
      expect(actionCreators.failure().payload).toEqual(undefined);
    });

    it('should identity map the failure payload', () => {
      const actionCreators = createAsyncActionCreators(TEST_REQUEST, TEST_SUCCESS, TEST_ERROR)<void, void, FailurePayload>();

      expect(actionCreators.request().payload).toEqual(undefined);
      expect(actionCreators.success().payload).toEqual(undefined);
      expect(actionCreators.failure(failurePayload).payload).toEqual(failurePayload);
    });

    it('should identity map the meta', () => {
      const actionCreators = createAsyncActionCreators(TEST_REQUEST, TEST_SUCCESS, TEST_ERROR)<void, void, void, Meta>();
      // tslint:disable:no-empty
      const metaCbs = {
        onFailure: () => {},
        onSuccess: () => {},
      };
      // tslint:enable:no-empty

      const requestActionWithoutMeta = actionCreators.request();
      const successActionWithoutMeta = actionCreators.success();
      const failureActionWithoutMeta = actionCreators.failure();

      expect(requestActionWithoutMeta.meta).toEqual(undefined);
      expect(successActionWithoutMeta.meta).toEqual(undefined);
      expect(failureActionWithoutMeta.meta).toEqual(undefined);

      const requestAction = actionCreators.request(undefined, metaCbs);
      const successAction = actionCreators.success(undefined, metaCbs);
      const failureAction = actionCreators.failure(undefined, metaCbs);

      expect(requestAction.meta).toEqual(metaCbs);
      expect(successAction.meta).toEqual(metaCbs);
      expect(failureAction.meta).toEqual(metaCbs);
    });

    it('should return action creators toString() which returns the type', () => {
      const actionCreators = createAsyncActionCreators(TEST_REQUEST, TEST_SUCCESS, TEST_ERROR)();

      expect(actionCreators.request.toString()).toEqual(TEST_REQUEST);
      expect(actionCreators.success.toString()).toEqual(TEST_SUCCESS);
      expect(actionCreators.failure.toString()).toEqual(TEST_ERROR);
    });
  });
});
