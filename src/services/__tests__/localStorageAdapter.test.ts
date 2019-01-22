import { ResponseStatus } from '../../types/enums';
import { deleteLocalStorageItem, getLocalStorage, setItemInLocalStorage, setLocalStorage } from '../localStorageAdapter';

const RETURN_MOCK_KEY = 'RETURN_MOCK';
const RETURN_MOCK_PAYLOAD = { key: 'value' };
const mockLocalStorageStore = {
  [RETURN_MOCK_KEY]: RETURN_MOCK_PAYLOAD,
};
const getMock = jest.fn((key: string) => mockLocalStorageStore[key]);
localStorage.getItem = getMock;

describe('localStorageAdapater', () => {
  describe('getLocalStorage', () => {
    it('should return a Promise<defaultReturn> if localStorage key is not found', () => {
      const defaultReturn = { test: 'test' };
      const getReturn = getLocalStorage('test', defaultReturn);

      expect(getReturn).toEqual(Promise.resolve(defaultReturn));
    });

    it('should return a Promise which resolves to a parsed payload if key is found', () => {
      const defaultReturn = { test: 'test' };
      const getReturn = getLocalStorage(RETURN_MOCK_KEY, defaultReturn);

      expect(getReturn).toEqual(Promise.resolve(RETURN_MOCK_PAYLOAD));
    });
  });

  describe('setLocalStorage', () => {
    it('should return a Promise<undefined>', () => {
      const payload = { test: 'test' };
      const setReturn = setLocalStorage('test', payload);

      expect(setReturn).toEqual(Promise.resolve());
    });
  });

  describe('setItemInLocalStorage', () => {
    it('should return a Promise<APIResponse> if a new item is set successfully', () => {
      const id = 'layouts';
      const payload = { name: 'test', layout: {}, id };
      const setItemReturn = setItemInLocalStorage(RETURN_MOCK_KEY, payload, undefined, id);
      const responsePayload = { status: ResponseStatus.SUCCESS };

      expect(setItemReturn).toEqual(Promise.resolve(responsePayload));
    });
  });

  describe('deleteLocalStorageItem', () => {
    it('should return a Promise<APIResponse> if an item within an existing key is deleted successfully', () => {
      const id = 'layouts';
      const deleteItemReturn = deleteLocalStorageItem(RETURN_MOCK_KEY, undefined, id);
      const responsePayload = { status: ResponseStatus.SUCCESS };

      expect(deleteItemReturn).toEqual(Promise.resolve(responsePayload));
    });
  });
});
