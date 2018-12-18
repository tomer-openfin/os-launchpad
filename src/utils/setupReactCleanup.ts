import { unmountComponentAtNode } from 'react-dom';

/**
 * Create event handler to unload react, close window and remove event listener
 * @private
 *
 * @param {Object} - Openfin window instance
 * @param {Object => void} - Callback to remove attached event listener
 *
 * @returns {() => void}
 */
const createUnloadReactHandler = (win: fin.OpenFinWindow, cb: (win: fin.OpenFinWindow) => void) => () => {
  const main = document.getElementById('main');
  if (main) {
    unmountComponentAtNode(main);
  }
  win.close(true);
  cb(win);
};

/**
 * Setup safe way to unload react from an Openfin window
 * @public
 *
 * @param {Object} - Openfin window instance
 */
export default (finWindow: fin.OpenFinWindow) => {
  const handler = createUnloadReactHandler(finWindow, win => {
    win.removeEventListener('close-requested', handler);
  });

  finWindow.addEventListener('close-requested', handler);
};
