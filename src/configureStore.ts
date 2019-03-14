import { middleware as reduxOpenFin } from '@giantmachines/redux-openfin';
import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';

import { isDevelopmentEnv, isProductionEnv, isStorybookEnv } from './utils/processHelpers';

import rootReducer from './redux/rootReducer';
import rootSaga from './redux/rootSaga';
import { State } from './redux/types';

const { HOST = '0.0.0.0', PORT = 8000 } = process.env;
const isProduction = isProductionEnv();
const isStorybook = isStorybookEnv();

export default (state?: State) => {
  // Middleware
  const openFinMiddleware = reduxOpenFin(window.fin);
  const sagaMiddleware = createSagaMiddleware();

  // Don't include redux-openfin when running in Storybook.
  const middlewareArgs = isStorybook ? [sagaMiddleware] : [openFinMiddleware, sagaMiddleware];

  // Include the extra Redux dev tools when running in development, but not in Storybook.
  const middleware =
    isDevelopmentEnv() && !isStorybook
      ? composeWithDevTools({ hostname: HOST, port: PORT })(applyMiddleware(...middlewareArgs))
      : applyMiddleware(...middlewareArgs);

  // Middleware enhancers
  const enhancers: StoreEnhancer[] = [];

  if (!isProduction) {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
      const enhancer = devToolsExtension();

      if (enhancer) {
        enhancers.push(enhancer);
      }
    }
  }

  const middlewareStack: StoreEnhancer = compose(
    middleware,
    ...enhancers,
  );

  const store = createStore(rootReducer, state, middlewareStack);

  if (!isProduction && module.hot) {
    module.hot.accept('./redux/rootReducer', () => {
      // tslint:disable:no-console
      console.warn('HMR detected for rootReducer.');

      console.warn('Replacing rootReducer.');
      store.replaceReducer(require('./redux/rootReducer').default);
      // tslint:enable:no-console
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
};
