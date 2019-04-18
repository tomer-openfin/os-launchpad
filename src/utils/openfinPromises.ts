import { Manifest } from '../redux/application/types';
import { Bounds, MonitorInfo, OpenFinApplication, OpenFinApplicationInfo, OpenFinWindow, PointTopLeft, WindowInfo } from '../types/commons';
import promisifyOpenfin from './promisifyOpenfin';

// TODO - move these functions to redux-openfin

const getSystemPromise = <T = undefined>(method: string) => (...args) => {
  const { fin } = window;

  if (!fin) {
    return Promise.reject('window.fin is undefined');
  }

  return promisifyOpenfin<T>(fin.desktop.System, method, ...args);
};

const getCurrentApplicationPromise = <T = undefined>(method: string) => (...args) => {
  const { fin } = window;

  if (!fin) {
    return Promise.reject('window.fin is undefined');
  }

  return promisifyOpenfin<T>(fin.desktop.Application.getCurrent(), method, ...args);
};

const getOpenFinApplicationPromise = <T = undefined>(uuid: string, method: string) => (...args) => {
  const { fin } = window;

  if (!fin) {
    return Promise.reject('window.fin is undefined');
  }

  return promisifyOpenfin<T>(fin.desktop.Application.wrap(uuid), method, ...args);
};

export const addSystemEventListener = getSystemPromise('addEventListener');
export const getSystemMachineId = getSystemPromise<string>('getMachineId');
export const getSystemMonitorInfo = getSystemPromise<MonitorInfo>('getMonitorInfo');
export const getSystemMousePosition = getSystemPromise<PointTopLeft>('getMousePosition');
export const getSystemAllWindows = getSystemPromise<WindowInfo[]>('getAllWindows');

// tslint:disable-next-line:no-any
export const getOpenFinApplicationInfo = (uuid: string) => getOpenFinApplicationPromise<any>(uuid, 'getInfo');
// tslint:disable-next-line:no-any
export const getOpenFinApplicationManifest = (uuid: string) => getOpenFinApplicationPromise<any>(uuid, 'getManifest');
export const getOpenFinApplicationChildWindows = (uuid: string) => getOpenFinApplicationPromise<OpenFinWindow[]>(uuid, 'getChildWindows');

export const getCurrentOpenfinApplicationInfo = getCurrentApplicationPromise<OpenFinApplicationInfo>('getInfo');
export const getCurrentOpenfinApplicationManifest = getCurrentApplicationPromise<Manifest>('getManifest');

export const animateWindow = (finWindow, animation, options) => {
  return promisifyOpenfin(finWindow, 'animate', animation, options);
};

export const bringWindowToFrontPromise = (finWindow, ...args) => {
  return promisifyOpenfin(finWindow, 'bringToFront', ...args);
};

export const hideWindowPromise = (finWindow, ...args) => {
  return promisifyOpenfin(finWindow, 'hide', ...args);
};

export const setWindowBoundsPromise = (finWindow, { left, top, width, height }: Bounds) => {
  return promisifyOpenfin(finWindow, 'setBounds', left, top, width, height);
};

export const updateWindowOptions = (finWindow, options) => {
  return promisifyOpenfin(finWindow, 'updateOptions', options);
};

export const getWindowIsShowingOrGrouped = async finWindow => {
  const [isShowing, group] = await Promise.all([promisifyOpenfin<boolean>(finWindow, 'isShowing'), promisifyOpenfin<[]>(finWindow, 'getGroup')]);
  return isShowing || !!group.length;
};

export const getWindowGroup = (finWindow: OpenFinWindow) => {
  return promisifyOpenfin<[]>(finWindow, 'getGroup');
};

/**
 * Get window state for windows that are showing
 */
export const getVisibleWindowStateAndBounds = async (finWindow: OpenFinWindow): Promise<{ finWindow: OpenFinWindow; bounds?: Bounds; state?: string }> => {
  const isShowing = await promisifyOpenfin(finWindow, 'isShowing');

  if (!isShowing) {
    return { finWindow };
  }

  const state = await promisifyOpenfin(finWindow, 'getState');
  const bounds = await promisifyOpenfin(finWindow, 'getBounds');

  return {
    bounds,
    finWindow,
    state,
  };
};

/**
 * Get window bounds
 */
export const getWindowBounds = async (finWindow: OpenFinWindow): Promise<Bounds | undefined> => promisifyOpenfin(finWindow, 'getBounds');

export const createAndRunFromManifest = (manifestUrl: string, id: string): Promise<string> => {
  const { fin } = window;

  if (!fin) {
    return Promise.reject('window.fin is undefined');
  }

  return new Promise((resolve, reject) => {
    fin.desktop.Application.createFromManifest(
      manifestUrl,
      app => {
        app.run(
          // Run app SUCCESS callback
          () => {
            resolve(app.uuid);
          },
          // Run app ERROR callback
          e => {
            reject(e);
          },
        );
        // TODO: Maybe add delay case if app takes too long to run
      },
      reject,
    );
  });
};
export const createAndRunFromPath = (manifestUrl: string): Promise<string> => {
  const { fin } = window;

  if (!fin) {
    return Promise.reject('window.fin is undefined');
  }

  return new Promise((resolve, reject) => {
    fin.desktop.System.launchExternalProcess(
      { path: manifestUrl },
      ({ uuid }: { uuid: string }) => resolve(uuid),
      (error: string) => {
        /* tslint:disable-next-line:no-console */
        console.log('error is', error);
        alert(`Error launching native app. App not found at specified location: ${manifestUrl}.`);
        reject(error);
      },
    );
  });
};

export const closeApplication = (app: OpenFinApplication) => {
  return promisifyOpenfin(app, 'close');
};

export const wrapApplication = (uuid: string) => {
  const { fin } = window;

  if (!fin) {
    return Promise.reject('window.fin is undefined');
  }

  return Promise.resolve(fin.desktop.Application.wrap(uuid));
};

export const wrapWindow = ({ uuid, name }: { uuid: string; name: string }) => {
  const { fin } = window;

  if (!fin) {
    return Promise.reject('window.fin is undefined');
  }

  return Promise.resolve(fin.desktop.Window.wrap(uuid, name));
};
