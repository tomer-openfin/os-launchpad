import { Dispatch } from 'redux';

import { setFinAppStatusState } from '../redux/apps';
import { App, ApplicationBaseEvent, AppStatusOrigins, AppStatusStates, OpenFinApplication, OpenFinApplicationEventType } from '../types/commons';

export const ERROR_EVENTS: OpenFinApplicationEventType[] = ['not-responding'];
export const RECOVERY_EVENTS: OpenFinApplicationEventType[] = ['responding'];

interface EventHandler {
  event: OpenFinApplicationEventType;
  // tslint:disable-next-line:no-any
  handler: (event: ApplicationBaseEvent) => any;
}

interface AppEventHandlers {
  [uuid: string]: EventHandler[];
}

const appEventHandlers: AppEventHandlers = {};

/**
 * Remove event listeners from applications.
 */
export const unbindFinAppEventHanlders = (uuid: string) => {
  const { fin } = window;
  const eventHandlers = appEventHandlers[uuid];

  if (!eventHandlers || !fin) {
    return;
  }

  const app = fin.desktop.Application.wrap(uuid);
  eventHandlers.forEach(({ event, handler }) => {
    app.removeEventListener(event, handler);
  });
  appEventHandlers[uuid] = [];
};

/**
 * Add event listeners to applications to tracks states.
 */
export const bindFinAppEventHandlers = (dipsatch: Dispatch, uuid: string, id: App['id']) => {
  const { fin } = window;
  if (!fin) {
    return;
  }

  const app = fin.desktop.Application.wrap(uuid);
  let handlers: EventHandler[] = [];

  handlers = ERROR_EVENTS.reduce((acc, event) => {
    const handler = () => dipsatch(setFinAppStatusState({ id, statusState: AppStatusStates.Error, origin: AppStatusOrigins.Event }));
    acc.push({ event, handler });

    app.addEventListener(event, handler);

    return acc;
  }, handlers);

  handlers = RECOVERY_EVENTS.reduce((acc, event) => {
    const handler = () => dipsatch(setFinAppStatusState({ id, statusState: AppStatusStates.Running, origin: AppStatusOrigins.Event }));
    acc.push({ event, handler });

    app.addEventListener(event, handler);

    return acc;
  }, handlers);

  appEventHandlers[uuid] = handlers;
};
