import { middleware as reduxOpenFin } from '@giantmachines/redux-openfin';
import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './redux/rootReducer';
import rootSaga from './redux/rootSaga';
import { State } from './redux/types';

const { NODE_ENV = 'development', STORYBOOK_ENV = 'false', HOST = '0.0.0.0' } = process.env;
const isProduction = NODE_ENV === 'production';

export default (state?: State) => {
  // Middleware
  const openFinMiddleware = reduxOpenFin(window.fin);
  const sagaMiddleware = createSagaMiddleware();

  // Don't include redux-openfin when running in Storybook.
  const middlewareArgs = STORYBOOK_ENV === 'true' ? [sagaMiddleware] : [openFinMiddleware, sagaMiddleware];

  // Include the extra Redux dev tools when running in development, but not in Storybook.
  const middleware =
    NODE_ENV === 'development' && STORYBOOK_ENV === 'false'
      ? composeWithDevTools({ hostname: HOST, port: 8000 })(applyMiddleware(...middlewareArgs))
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

  let task = sagaMiddleware.run(rootSaga);

  if (!isProduction && module.hot) {
    module.hot.accept('./redux/rootSaga', () => {
      // tslint:disable:no-console
      console.warn('HMR detected for rootSaga.');

      console.warn('Terminating blocked sagas by dispatching END.');
      store.dispatch(END);

      console.warn('Canceling rootSaga task.');
      task.cancel();

      task.done.then(() => {
        console.warn('Running updated rootSaga.');
        task = sagaMiddleware.run(require('./redux/rootSaga').default);
      });
      // tslint:enable:no-console
    });
  }

  return store;
};
