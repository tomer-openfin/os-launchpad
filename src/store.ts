import { middleware as reduxOpenFin } from '@giantmachines/redux-openfin';
import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './redux/rootReducer';
import rootSaga from './redux/rootSaga';

import createActionLoggerMiddleware from './utils/createActionLoggerMiddleware';

const { LOGGER, NODE_ENV } = process.env;

// Middleware
const openFinMiddleware = reduxOpenFin(window.fin);
const sagaMiddleware = createSagaMiddleware();
const middlewareArgs = [openFinMiddleware, sagaMiddleware];
if (LOGGER) {
  const actionLoggerMiddleware = createActionLoggerMiddleware();
  middlewareArgs.push(actionLoggerMiddleware);
}

const middleware = applyMiddleware(...middlewareArgs);

// Middleware enhancers
const enhancers: StoreEnhancer[] = [];

if (NODE_ENV !== 'production') {
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
