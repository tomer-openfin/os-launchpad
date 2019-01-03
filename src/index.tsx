import { deregister } from 'openfin-layouts';

import Router from './components/Router';

import configureStore from './configureStore';
import { applicationStarted, openfinReady } from './redux/application/actions';
import renderWindow from './utils/renderWindow';
import setupReactCleanUp from './utils/setupReactCleanup';

const isProduction = process.env.NODE_ENV === 'production';

const isMainWindow = !window.opener;

// If this is the main window and there is no store
// we need to create the application's store
if (isMainWindow && !window.store) {
  window.store = configureStore();

  // Dispatch the initial app startup action.
  window.store.dispatch(applicationStarted());
}

if (!isProduction && module.hot) {
  module.hot.accept('./configureStore', () => {
    if (isMainWindow) {
      // tslint:disable-next-line:no-console
      console.warn('HMR deteched for store. Reattaching store to window.');
      window.store = require('./configureStore').default(window.store.getState());
    }
  });
}

// Render the window as soon as the DOM is ready.
document.addEventListener('DOMContentLoaded', async () => {
  const { fin } = window;

  if (fin) {
    const finWindow = fin.desktop.Window.getCurrent();
    setupReactCleanUp(finWindow);
  }

  renderWindow(Router);

  // Only fetch data in the main window.
  if (fin && isMainWindow && window.store) {
    fin.desktop.main(() => {
      // Dispatch the action for when openfin window is ready.
      // TODO: may want to add key for what window is ready.
      window.store.dispatch(openfinReady(window.name));

      if (window.name) {
        const config = {
          name: window.name,
          uuid: window.name,
        };

        deregister(config)
          // tslint:disable-next-line:no-console
          .then(() => console.log(`Deregistering ${window.name} from Layouts service.`))
          // tslint:disable-next-line:no-console
          .catch(err => console.log(`${window.name} has already been deregistred from Layouts service. Service returned the following error: ${err}`));
      }
    });
  }
});
