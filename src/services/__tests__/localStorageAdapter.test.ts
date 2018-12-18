import { getLocalStorage, setLocalStorage } from '../localStorageAdapter';

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
});
