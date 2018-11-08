import promisifyOpenfin from './promisifyOpenfin';

export const getSystemMonitorInfo = () => {
  const { fin } = window;

  if (!fin) {
    return Promise.resolve({});
  }

  return promisifyOpenfin(fin.desktop.System, 'getMonitorInfo');
};

export const animateWindow = (finWindow, animation, options) => {
  return promisifyOpenfin(finWindow, 'animate', animation, options);
};
