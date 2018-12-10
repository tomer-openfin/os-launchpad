import { deregister } from 'openfin-layouts';

import Router from './components/Router';

import { applicationStarted, openfinReady } from './redux/application/actions';
import { globalHotkeyPressed } from './redux/globalHotkeys/actions';
import { GlobalHotkeys } from './redux/globalHotkeys/enums';
import store from './store';
import renderWindow from './utils/renderWindow';
import setupReactCleanUp from './utils/setupReactCleanup';

// If there is no global store, and there's _not_ a window.opener
// this is the main window
const isMainWindowInitialized = !window.store && !window.opener;

// If this is the main window, we need to create the application's store.
if (isMainWindowInitialized) {
  window.store = store;

  // Dispatch the initial app startup action.
  store.dispatch(applicationStarted());
}

// Render the window as soon as the DOM is ready.
document.addEventListener('DOMContentLoaded', async () => {
  const { fin } = window;

  if (fin) {
    const finWindow = fin.desktop.Window.getCurrent();
    setupReactCleanUp(finWindow);

    // Register global hotkeys
    for (const hotkey in GlobalHotkeys) {
      if (GlobalHotkeys.hasOwnProperty(hotkey)) {
        const hotkeyToRegister = GlobalHotkeys[hotkey];

        const cb = () => {
          store.dispatch(globalHotkeyPressed(hotkeyToRegister));
        };

        fin.GlobalHotkey.register(hotkeyToRegister, cb);
      }
    }
  }

  renderWindow(Router);

  // Only fetch data in the main window.
  if (fin && isMainWindowInitialized) {
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
