import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
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

const localStorageMock = {
  clear: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
};
global.localStorage = localStorageMock;

enzyme.configure({ adapter: new Adapter() });
