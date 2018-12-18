import { finAppClosed } from '../redux/apps/index';
import { Bounds, MonitorInfo, OpenFinApplication, PointTopLeft } from '../types/commons';
import promisifyOpenfin from './promisifyOpenfin';

// TODO - move these functions to redux-openfin

const getSystemPromise = <T = undefined>(method: string) => (...args) => {
  const { fin } = window;

  if (!fin) {
    return Promise.reject('window.fin is undefined');
  }

  return promisifyOpenfin<T>(fin.desktop.System, method, ...args);
};

export const addSystemEventListener = getSystemPromise('addEventListener');
export const getSystemMonitorInfo = getSystemPromise<MonitorInfo>('getMonitorInfo');
export const getSystemMousePosition = getSystemPromise<PointTopLeft>('getMousePosition');

export const animateWindow = (finWindow, animation, options) => {
  return promisifyOpenfin(finWindow, 'animate', animation, options);
};

export const hideWindow = (finWindow, ...args) => {
  return promisifyOpenfin(finWindow, 'hide', ...args);
};

export const setWindowBoundsPromise = (finWindow, { left, top, width, height }: Bounds) => {
  return promisifyOpenfin(finWindow, 'setBounds', left, top, width, height);
};

export const createAndRunFromManifest = (manifestUrl: string, id: string) => {
  const { fin } = window;

  if (!fin) {
    return Promise.reject('window.fin is undefined');
  }

  return new Promise((resolve, reject) => {
    fin.desktop.Application.createFromManifest(
      manifestUrl,
      app => {
        const closedEvents: fin.OpenFinApplicationEventType[] = ['closed', 'crashed'];
        // const startedEvents: fin.OpenFinApplicationEventType[] = ['started'];
        const finAppClosedHandler = () => {
          window.store.dispatch(finAppClosed({ id }));
          closedEvents.forEach(event => {
            app.removeEventListener(event, finAppClosedHandler);
          });
        };
        // const finAppStartedHandler = () => {
        //   resolve();
        //   startedEvents.forEach(event => {
        //     app.removeEventListener(event, finAppStartedHandler);
        //   });
        // };

        closedEvents.forEach(event => {
          app.addEventListener(event, finAppClosedHandler);
        });
        // startedEvents.forEach(event => {
        //   app.addEventListener(event, finAppStartedHandler);
        // });

        app.run(
          // Run app SUCCESS callback
          () => {
            // Remove just the started app listeners if app actually succeeds
            // startedEvents.forEach(event => {
            //   app.removeEventListener(event, finAppStartedHandler);
            // });
            resolve(app.uuid);
          },
          // Run app ERROR callback
          e => {
            // Remove all event listeners if running app fails
            closedEvents.forEach(event => {
              app.removeEventListener(event, finAppClosedHandler);
            });
            // startedEvents.forEach(event => {
            //   app.removeEventListener(event, finAppStartedHandler);
            // });
            reject(e);
          },
        );

        // TODO: Maybe add delay case if app takes too long to run
      },
      reject,
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
