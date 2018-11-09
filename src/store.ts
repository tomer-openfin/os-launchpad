import { middleware as reduxOpenFin } from '@giantmachines/redux-openfin';
import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './redux/rootReducer';
import rootSaga from './redux/rootSaga';

import createActionLoggerMiddleware from './utils/createActionLoggerMiddleware';

// Middleware
const openFinMiddleware = reduxOpenFin(window.fin);
const sagaMiddleware = createSagaMiddleware();
const actionLoggerMiddleware = createActionLoggerMiddleware();
const middleware = applyMiddleware(openFinMiddleware, sagaMiddleware, actionLoggerMiddleware);

// Middleware enhancers
const enhancers: StoreEnhancer[] = [];

if (process.env.NODE_ENV !== 'production') {
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

const store = createStore(rootReducer, middlewareStack);

sagaMiddleware.run(rootSaga);

export default store;
