import { Store, StoreEnhancer } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: (() => StoreEnhancer) | undefined;
    fin: typeof fin;
    store: Store;
  }
}
