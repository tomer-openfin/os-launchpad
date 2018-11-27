import { Bounds } from '../types/commons';
import promisifyOpenfin from './promisifyOpenfin';

// TODO - move these functions to redux-openfin

const getSystemPromise = (method: string) => (...args) => {
  const { fin } = window;

  if (!fin) {
    return Promise.resolve();
  }

  return promisifyOpenfin(fin.desktop.System, method, ...args);
};

export const addSystemEventListener = getSystemPromise('addEventListener');
export const getSystemMonitorInfo = getSystemPromise('getMonitorInfo');
export const getSystemMousePosition = getSystemPromise('getMousePosition');

export const animateWindow = (finWindow, animation, options) => {
  return promisifyOpenfin(finWindow, 'animate', animation, options);
};

export const setWindowBoundsPromise = (finWindow, { left, top, width, height }: Bounds) => {
  return promisifyOpenfin(finWindow, 'setBounds', left, top, width, height);
};
