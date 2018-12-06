import { middleware as reduxOpenFin } from '@giantmachines/redux-openfin';
import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './redux/rootReducer';
import rootSaga from './redux/rootSaga';

const {
  NODE_ENV,
  STORYBOOK_ENV,
} = process.env;

// Middleware
const openFinMiddleware = reduxOpenFin(window.fin);
const sagaMiddleware = createSagaMiddleware();

// Don't include redux-openfin when running in Storybook.
const middlewareArgs = STORYBOOK_ENV === 'true'
  ? [sagaMiddleware]
  : [openFinMiddleware, sagaMiddleware];

// Include the extra Redux dev tools when running in development, but not in Storybook.
const middleware = NODE_ENV === 'development' && STORYBOOK_ENV === 'false'
  ? composeWithDevTools({ hostname: 'localhost', port: 8000 })(applyMiddleware(...middlewareArgs))
  : applyMiddleware(...middlewareArgs);

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
