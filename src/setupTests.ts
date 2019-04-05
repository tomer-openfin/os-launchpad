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

export const MOCK_ID = 'MOCK_ID';
export const MOCK_ARRAY_KEY = 'MOCK_ARRAY_KEY';
export const MOCK_ITEM = { id: MOCK_ID };
export const MOCK_ARRAY = JSON.stringify([MOCK_ITEM]);

const mockLocalStorageStore = {
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

jest.mock('./services/ApiService');
