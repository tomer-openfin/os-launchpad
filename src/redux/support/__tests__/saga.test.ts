import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put, takeEvery } from 'redux-saga/effects';

import ApiService from '../../../services/ApiService';
import { testAsyncGeneratorsErrorCatch } from '../../testUtils';
import { sendBug, sendFeedback } from '../actions';
import { supportSaga, watchSendBugRequest, watchSendFeedbackRequest } from '../saga';

describe('support/saga', () => {
  describe('watchSendBugRequest', () => {
    const { request, success, failure } = sendBug;
    const apiMethod = ApiService.sendBug;
    const action = request('TEST_BUG');
    const iterator = cloneableGenerator(watchSendBugRequest)(action);

    it('should call sendBug', () => {
      expect(iterator.next().value).toEqual(call(apiMethod, { feedback: action.payload }));
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));

    it('should put success action', async () => {
      const successClone = iterator.clone();
      expect(successClone.next().value).toEqual(put(success(undefined)));
      expect(successClone.next().done).toBe(true);
    });
  });

  describe('watchSendFeedbackRequest', () => {
    const { request, success, failure } = sendFeedback;
    const apiMethod = ApiService.sendFeedback;
    const action = request('TEST_FEEDBACK');
    const iterator = cloneableGenerator(watchSendFeedbackRequest)(action);

    it('should sendFeedback', () => {
      expect(iterator.next().value).toEqual(call(apiMethod, { feedback: action.payload }));
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));

    it('should put success action', async () => {
      const successClone = iterator.clone();
      expect(successClone.next().value).toEqual(put(success(undefined)));
      expect(successClone.next().done).toBe(true);
    });
  });

  describe('supportSaga', () => {
    const iterator = cloneableGenerator(supportSaga)();

    expect(iterator.next(sendBug.request('TEST_BUG')).value).toEqual(takeEvery(sendBug.request, watchSendBugRequest));
    expect(iterator.next(sendFeedback.request('TEST_FEEDBACK')).value).toEqual(takeEvery(sendFeedback.request, watchSendFeedbackRequest));
  });
});
