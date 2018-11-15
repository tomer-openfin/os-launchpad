import promisifyOpenfin from './promisifyOpenfin';

// TODO - move these functions to redux-openfin

const getSystemPromise = (method: string) => () => {
  const { fin } = window;

  if (!fin) {
    return Promise.resolve();
  }

  return promisifyOpenfin(fin.desktop.System, method);
};

export const getSystemMonitorInfo = getSystemPromise('getMonitorInfo');
export const getSystemMousePosition = getSystemPromise('getMousePosition');

export const animateWindow = (finWindow, animation, options) => {
  return promisifyOpenfin(finWindow, 'animate', animation, options);
};
