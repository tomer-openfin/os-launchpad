import { MOCK_ARRAY, MOCK_ARRAY_KEY, MOCK_ID, MOCK_ITEM } from '../../setupTests';

import { ApiSuccessResponse } from '../../types/commons';
import { ApiResponseStatus } from '../../types/enums';
import { deleteInLocalStorage, getInLocalStorage, getLocalStorage, setInLocalStorage, setLocalStorage } from '../localStorageAdapter';

describe('localStorageAdapater', () => {
  describe('getLocalStorage', () => {
    it('should return a failure if resource not found', async () => {
      const result = await getLocalStorage('test');

      expect(result.status).toEqual(ApiResponseStatus.Failure);
    });

    it('should return a parsed payload if key is found', async () => {
      const result = await getLocalStorage(MOCK_ARRAY_KEY);

      expect(result.status).toEqual(ApiResponseStatus.Success);
      expect((result as ApiSuccessResponse<typeof MOCK_ITEM>).data).toEqual(JSON.parse(MOCK_ARRAY));
    });
  });

  describe('getInLocalStorage', () => {
    it('should return a failure if resource not found', async () => {
      const result = await getInLocalStorage('test', 'testId');

      expect(result.status).toEqual(ApiResponseStatus.Failure);
    });

    it('should return a parsed payload if key and id is found', async () => {
      const result = await getInLocalStorage(MOCK_ARRAY_KEY, MOCK_ID);

      expect(result.status).toEqual(ApiResponseStatus.Success);
      expect((result as ApiSuccessResponse<typeof MOCK_ITEM>).data).toEqual(MOCK_ITEM);
    });
  });

  describe('setLocalStorage', () => {
    it('should return a response object', async () => {
      const payload = 'test';
      const result = await setLocalStorage('test', payload);

      expect(result.status).toEqual(ApiResponseStatus.Success);
    });
  });

  describe('setInLocalStorage', () => {
    it('should return a Promise<{ data: payload }> if a new item is set successfully', async () => {
      const id = 'layouts';
      const payload = { name: 'test', layout: {}, id };
      const result = await setInLocalStorage(MOCK_ARRAY_KEY, payload, id);

      expect(result.status).toEqual(ApiResponseStatus.Success);
      expect((result as ApiSuccessResponse<typeof payload>).data).toEqual(payload);
    });
  });

  describe('deleteInLocalStorage', () => {
    it('should return a success if an item within an existing key is deleted successfully', async () => {
      const result = await deleteInLocalStorage(MOCK_ARRAY_KEY, MOCK_ID);

      expect(result.status).toEqual(ApiResponseStatus.Success);
    });
  });
});
