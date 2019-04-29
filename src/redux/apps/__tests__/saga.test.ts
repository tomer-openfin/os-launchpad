import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import AppData from '../../../samples/AppData';
import ApiService from '../../../services/ApiService';
import { ApiResponseStatus } from '../../../types/enums';
import * as finUtils from '../../../utils/finUtils';
import { reboundLauncher } from '../../application';
import { testAsyncGeneratorsErrorCatch } from '../../testUtils';
import { closeFinApp, getAppDirectoryList, openFinApp } from '../actions';
import {
  appsSaga,
  watchCloseFinAppRequest,
  watchGetAppDirectoryListRequest,
  watchGetAppDirectoryListSuccess,
  watchOpenFinAppFailure,
  watchOpenFinAppRequest,
  watchOpenFinAppSuccess,
} from '../saga';

const closeApplicationSpy = jest.spyOn(finUtils, 'closeApplication');

describe('apps/saga', () => {
  describe('watchCloseFinAppRequest', () => {
    const { request, failure } = closeFinApp;
    const action = request({ uuid: 'TEST_UUID' });
    const iterator = cloneableGenerator(watchCloseFinAppRequest)(action);

    it('should call closeApplication', () => {
      iterator.next();
      expect(closeApplicationSpy).toBeCalledWith(action.payload);
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));
  });

  describe('watchGetAppDirectoryListRequest', () => {
    const { request, success, failure } = getAppDirectoryList;
    const apiMethod = ApiService.getDirectoryAppList;
    const action = request();
    const iterator = cloneableGenerator(watchGetAppDirectoryListRequest)(action);

    it('should getDirectoryAppList', () => {
      expect(iterator.next().value).toEqual(call(apiMethod));
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));

    it('should put success action', async () => {
      const response = await apiMethod();

      const successClone = iterator.clone();
      if (response.status === ApiResponseStatus.Failure) {
        expect(successClone.next(response).value).toEqual(put(failure(new Error(response.message))));
      } else {
        expect(successClone.next(response).value).toEqual(put(success(response.data)));
      }
      expect(successClone.next().done).toBe(true);
    });
  });

  describe('watchGetAppDirectoryListSuccess', () => {
    const { success } = getAppDirectoryList;
    const action = success(AppData);
    const iterator = cloneableGenerator(watchGetAppDirectoryListSuccess)(action);

    it('should put reboundLauncherRequest', () => {
      const successClone = iterator.clone();
      expect(successClone.next().value).toEqual(put(reboundLauncher.request({ shouldAnimate: false, delay: 0 })));
      expect(successClone.next().done).toBe(true);
    });

    it('should catch when error is thrown', () => {
      const failureClone = iterator.clone();
      failureClone.next();
      expect(failureClone.throw!('error').value).toBeFalsy();
      expect(failureClone.next().done).toBe(true);
    });
  });

  describe('appsSaga', () => {
    it('should contain the following sagas', () => {
      const iterator = cloneableGenerator(appsSaga)();

      expect(iterator.next(closeFinApp.request({ uuid: 'TEST_APP' })).value).toEqual(takeEvery(closeFinApp.request, watchCloseFinAppRequest));
      expect(iterator.next(getAppDirectoryList.request()).value).toEqual(takeLatest(getAppDirectoryList.request, watchGetAppDirectoryListRequest));
      expect(iterator.next(getAppDirectoryList.success(AppData)).value).toEqual(takeEvery(getAppDirectoryList.success, watchGetAppDirectoryListSuccess));
      expect(iterator.next(openFinApp.request(AppData[0])).value).toEqual(takeEvery(openFinApp.request, watchOpenFinAppRequest));
      // tslint:disable-next-line:no-any
      expect(iterator.next(openFinApp.success({} as any)).value).toEqual(takeEvery(openFinApp.success, watchOpenFinAppSuccess));
      // tslint:disable-next-line:no-any
      expect(iterator.next(openFinApp.failure({} as any)).value).toEqual(takeEvery(openFinApp.failure, watchOpenFinAppFailure));
    });
  });
});
