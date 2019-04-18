import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put, takeEvery } from 'redux-saga/effects';

import { testAsyncGeneratorsErrorCatch } from '../../testUtils';
import { toggleNotificationCenter } from '../actions';
import { notificationsSaga, watchToggleNotificationCenterRequest } from '../saga';
import { toggleFinNotificationCenter } from '../utils';

describe('notifications/saga', () => {
  describe('watchToggleNotificationCenterRequest', () => {
    const { request, success, failure } = toggleNotificationCenter;
    const action = request();
    const iterator = cloneableGenerator(watchToggleNotificationCenterRequest)(action);

    it('should toggleFinNotificationCenter', () => {
      expect(iterator.next().value).toEqual(call(toggleFinNotificationCenter));
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));

    it('should put success action', async () => {
      const successClone = iterator.clone();
      expect(successClone.next().value).toEqual(put(success()));
      expect(successClone.next().done).toBe(true);
    });
  });

  describe('notificationsSaga', () => {
    it('should contain the following sagas', () => {
      const iterator = cloneableGenerator(notificationsSaga)();

      expect(iterator.next(toggleNotificationCenter.request()).value).toEqual(
        takeEvery(toggleNotificationCenter.request, watchToggleNotificationCenterRequest),
      );
    });
  });
});
