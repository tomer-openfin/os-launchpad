import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import noop from './utils/noop';

declare global {
  namespace NodeJS {
    interface Global {
      localStorage: {
        clear: () => void;
        getItem: (key: string) => void;
        removeItem: (key: string) => void;
        setItem: (key: string, payload: string) => void;
      };
    }
  }
}

export const MOCK_ITEM_KEY = 'MOCK_ITEM_KEY';
export const MOCK_ARRAY_KEY = 'MOCK_ARRAY_KEY';
export const MOCK_ITEM = JSON.stringify({ key: 'value' });
export const MOCK_ARRAY = JSON.stringify([{ key: 'value' }]);

const mockLocalStorageStore = {
  [MOCK_ITEM_KEY]: MOCK_ITEM,
  [MOCK_ARRAY_KEY]: MOCK_ARRAY,
};

const localStorageMock = {
  clear: noop,
  getItem: (key: string) => mockLocalStorageStore[key] || null,
  removeItem: noop,
  setItem: noop,
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

enzyme.configure({ adapter: new Adapter() });
