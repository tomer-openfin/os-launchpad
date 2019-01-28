import { MOCK_ARRAY, MOCK_ARRAY_KEY, MOCK_ITEM, MOCK_ITEM_KEY } from '../../setupTests';

import { deleteLocalStorageItem, ERROR_RESPONSE, getLocalStorage, setItemInLocalStorage, setLocalStorage, SUCCESS_RESPONSE } from '../localStorageAdapter';

describe('localStorageAdapater', () => {
  describe('getLocalStorage', () => {
    it('should return a defaultReturn if localStorage key is not found', () => {
      const getReturn = getLocalStorage('test');

      expect(getReturn).toEqual(Promise.resolve(ERROR_RESPONSE));
    });

    it('should return a parsed payload if key is found', () => {
      const getReturn = getLocalStorage(MOCK_ITEM_KEY);

      expect(getReturn).toEqual(Promise.resolve({ ...SUCCESS_RESPONSE, data: JSON.parse(MOCK_ITEM) }));
    });
  });

  describe('setLocalStorage', () => {
    it('should return a response object', () => {
      const payload = 'test';
      const setReturn = setLocalStorage('test', payload);

      expect(setReturn).toEqual(Promise.resolve(SUCCESS_RESPONSE));
    });
  });

  describe('setItemInLocalStorage', () => {
    it('should return a Promise<APIResponse> if a new item is set successfully', () => {
      const id = 'layouts';
      const payload = { name: 'test', layout: {}, id };
      const setItemReturn = setItemInLocalStorage(MOCK_ARRAY_KEY, payload, id);

      expect(setItemReturn).toEqual(Promise.resolve({ ...SUCCESS_RESPONSE, data: JSON.parse(MOCK_ARRAY) }));
    });
  });

  describe('deleteLocalStorageItem', () => {
    it('should return a Promise<APIResponse> if an item within an existing key is deleted successfully', () => {
      const id = 'layouts';
      const deleteItemReturn = deleteLocalStorageItem(MOCK_ARRAY_KEY, id);

      expect(deleteItemReturn).toEqual(Promise.resolve({ ...SUCCESS_RESPONSE, data: JSON.parse(MOCK_ARRAY) }));
    });
  });
});
