import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put, takeEvery } from 'redux-saga/effects';

import AppData from '../../../samples/AppData';
import UserData from '../../../samples/UserData';
import ApiService from '../../../services/ApiService';
import { getAppDirectoryList } from '../../apps/index';
import { testAsyncGeneratorsErrorCatch } from '../../testUtils';
import { createAdminApp, createAdminUser, deleteAdminApp, deleteAdminUser, getAdminApps, getAdminUsers, updateAdminApp, updateAdminUser } from '../actions';
import {
  adminSaga,
  watchCreateAdminAppRequest,
  watchCreateAdminUserRequest,
  watchDeleteAdminAppRequest,
  watchDeleteAdminUserRequest,
  watchGetAdminAppsRequest,
  watchGetAdminUsersRequest,
  watchUpdateAdminAppRequest,
  watchUpdateAdminUserRequest,
} from '../saga';

describe('admin/saga', () => {
  describe('watchGetAdminAppsRequest', () => {
    const { request, success, failure } = getAdminApps;
    const apiMethod = ApiService.getAdminApps;
    const action = request();
    const iterator = cloneableGenerator(watchGetAdminAppsRequest)(action);

    it('should getAdminApps', () => {
      expect(iterator.next().value).toEqual(call(apiMethod));
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));

    it('should put failure action when empty array is returned from Api', () => {
      const failureClone = iterator.clone();
      expect(failureClone.next([]).value).toEqual(put(failure(new Error('Unknown Error'))));
      expect(failureClone.next().done).toBe(true);
    });

    it('should put success action', async () => {
      const response = await apiMethod();

      const successClone = iterator.clone();
      expect(successClone.next(response).value).toEqual(put(success(response)));
      expect(successClone.next().done).toBe(true);
    });
  });

  describe('watchCreateAdminAppRequest', () => {
    const { request, success, failure } = createAdminApp;
    const apiMethod = ApiService.createAdminApp;
    const action = request(AppData[0]);
    const iterator = cloneableGenerator(watchCreateAdminAppRequest)(action);

    it('should createAdminApp with payload', () => {
      expect(iterator.next().value).toEqual(call(apiMethod, action.payload));
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));

    it('should put failure action when no app is returned from Api', () => {
      const failureClone = iterator.clone();
      expect(failureClone.next({}).value).toEqual(put(failure(new Error('Unknown Error'))));
      expect(failureClone.next().done).toBe(true);
    });

    it('should put success action and put getAppDirectoryListRequest', async () => {
      const response = await apiMethod(action.payload);

      const successClone = iterator.clone();
      expect(successClone.next(response).value).toEqual(put(success(response.app)));
      expect(successClone.next().value).toEqual(put(getAppDirectoryList.request()));
      expect(successClone.next().done).toBe(true);
    });
  });

  describe('watchUpdateAdminAppRequest', () => {
    const { request, success, failure } = updateAdminApp;
    const apiMethod = ApiService.updateAdminApp;
    const action = request(AppData[0]);
    const iterator = cloneableGenerator(watchUpdateAdminAppRequest)(action);

    it('should updateAdminApp with payload', () => {
      expect(iterator.next().value).toEqual(call(apiMethod, action.payload));
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));

    it('should put failure action when no app is returned from Api', () => {
      const failureClone = iterator.clone();
      expect(failureClone.next({}).value).toEqual(put(failure(new Error('Unknown Error'))));
      expect(failureClone.next().done).toBe(true);
    });

    it('should put success action and put getAppDirectoryListRequest', async () => {
      const response = await apiMethod(action.payload);

      const successClone = iterator.clone();
      expect(successClone.next(response).value).toEqual(put(success(response.app)));
      expect(successClone.next().value).toEqual(put(getAppDirectoryList.request()));
      expect(successClone.next().done).toBe(true);
    });
  });

  describe('watchDeleteAdminAppRequest', () => {
    const { request, success, failure } = deleteAdminApp;
    const apiMethod = ApiService.deleteAdminApp;
    const action = request(AppData[0]);
    const iterator = cloneableGenerator(watchDeleteAdminAppRequest)(action);

    it('should deleteAdminApp with payload', () => {
      expect(iterator.next().value).toEqual(call(apiMethod, action.payload));
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));

    it('should put success action and put getAppDirectoryListRequest', async () => {
      const response = await apiMethod(action.payload);

      const successClone = iterator.clone();
      expect(successClone.next(response).value).toEqual(put(success(action.payload)));
      expect(successClone.next().value).toEqual(put(getAppDirectoryList.request()));
      expect(successClone.next().done).toBe(true);
    });
  });

  describe('watchGetAdminUsersRequest', () => {
    const { request, success, failure } = getAdminUsers;
    const apiMethod = ApiService.getAdminUsers;
    const action = request();
    const iterator = cloneableGenerator(watchGetAdminUsersRequest)(action);

    it('should getAdminUsers with payload', () => {
      expect(iterator.next().value).toEqual(call(apiMethod));
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));

    it('should put success action', async () => {
      const response = await apiMethod();

      const successClone = iterator.clone();
      expect(successClone.next(response).value).toEqual(put(success(response)));
      expect(successClone.next().done).toBe(true);
    });
  });

  describe('watchCreateAdminUserRequest', () => {
    const { request, success, failure } = createAdminUser;
    const apiMethod = ApiService.createAdminUser;
    const action = request(UserData[0]);
    const iterator = cloneableGenerator(watchCreateAdminUserRequest)(action);

    it('should createAdminUser with payload', () => {
      expect(iterator.next().value).toEqual(call(apiMethod, action.payload));
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));

    it('should put failure action when no user is returned from Api', () => {
      const failureClone = iterator.clone();
      expect(failureClone.next({}).value).toEqual(put(failure(new Error('Unknown Error'))));
      expect(failureClone.next().done).toBe(true);
    });

    it('should put success action', async () => {
      const response = await apiMethod(action.payload);

      const successClone = iterator.clone();
      expect(successClone.next(response).value).toEqual(put(success(response.user)));
      expect(successClone.next().done).toBe(true);
    });
  });

  describe('watchUpdateAdminUserRequest', () => {
    const { request, success, failure } = updateAdminUser;
    const apiMethod = ApiService.updateAdminUser;
    const action = request(UserData[0]);
    const iterator = cloneableGenerator(watchUpdateAdminUserRequest)(action);

    it('should updateAdminUser with payload', () => {
      expect(iterator.next().value).toEqual(call(apiMethod, action.payload));
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));

    it('should put failure action when no user is returned from Api', () => {
      const failureClone = iterator.clone();
      expect(failureClone.next({}).value).toEqual(put(failure(new Error('Unknown Error'))));
      expect(failureClone.next().done).toBe(true);
    });

    it('should put success action and put getAppDirectoryListRequest', async () => {
      const response = await apiMethod(action.payload);

      const successClone = iterator.clone();
      expect(successClone.next(response).value).toEqual(put(success(response.user)));
      expect(successClone.next().done).toBe(true);
    });
  });

  describe('watchDeleteAdminUserRequest', () => {
    const { request, success, failure } = deleteAdminUser;
    const apiMethod = ApiService.deleteAdminUser;
    const action = request(UserData[0]);
    const iterator = cloneableGenerator(watchDeleteAdminUserRequest)(action);

    it('should deleteAdminUser with payload', () => {
      expect(iterator.next().value).toEqual(call(apiMethod, action.payload));
    });

    it('should put failure action when error is thrown', testAsyncGeneratorsErrorCatch(iterator, failure));

    it('should put success action and put getAppDirectoryListRequest', async () => {
      const response = await apiMethod(action.payload);

      const successClone = iterator.clone();
      expect(successClone.next(response).value).toEqual(put(success(action.payload)));
      expect(successClone.next().done).toBe(true);
    });
  });

  describe('adminSaga', () => {
    const iterator = cloneableGenerator(adminSaga)();

    expect(iterator.next(createAdminApp.request(AppData[0])).value).toEqual(takeEvery(createAdminApp.request, watchCreateAdminAppRequest));
    expect(iterator.next(createAdminUser.request(UserData[0])).value).toEqual(takeEvery(createAdminUser.request, watchCreateAdminUserRequest));
    expect(iterator.next(deleteAdminApp.request(AppData[0])).value).toEqual(takeEvery(deleteAdminApp.request, watchDeleteAdminAppRequest));
    expect(iterator.next(deleteAdminUser.request(UserData[0])).value).toEqual(takeEvery(deleteAdminUser.request, watchDeleteAdminUserRequest));
    expect(iterator.next(getAdminApps.request()).value).toEqual(takeEvery(getAdminApps.request, watchGetAdminAppsRequest));
    expect(iterator.next(getAdminUsers.request()).value).toEqual(takeEvery(getAdminUsers.request, watchGetAdminUsersRequest));
    expect(iterator.next(updateAdminApp.request(AppData[0])).value).toEqual(takeEvery(updateAdminApp.request, watchUpdateAdminAppRequest));
    expect(iterator.next(updateAdminUser.request(UserData[0])).value).toEqual(takeEvery(updateAdminUser.request, watchUpdateAdminUserRequest));
  });
});
