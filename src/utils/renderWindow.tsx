import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

/**
 * Main DOM element to hold the React tree.
 * @private
 */
const main = document.getElementById('main');

/**
 * Render a Component.
 * @public
 *
 * @param {React.ComponentType<any>} Component - Component to render.
 */
export default (Component: React.ComponentType) => {
  if (main) {
    const store = window.opener
      ? window.opener.store
      : window.store;

    ReactDOM.render(
        <Provider store={store}>
          <Component />
        </Provider>,
      main,
    );
  }
};
