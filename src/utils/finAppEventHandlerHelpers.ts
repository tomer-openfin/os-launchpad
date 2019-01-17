import { Dispatch } from 'redux';

import { setFinAppStatusState } from '../redux/apps/index';
import { App, ApplicationBaseEvent, AppStatusOrigins, AppStatusStates, OpenFinApplication, OpenFinApplicationEventType } from '../types/commons';

export const CLOSED_EVENTS: OpenFinApplicationEventType[] = ['closed', 'crashed'];
export const ERROR_EVENTS: OpenFinApplicationEventType[] = ['not-responding'];
export const RECOVERY_EVENTS: OpenFinApplicationEventType[] = ['responding'];

interface EventHandler {
  event: OpenFinApplicationEventType;
  // tslint:disable-next-line:no-any
  handler: (event: ApplicationBaseEvent) => any;
}

/**
 * Remove event listeners from applications.
 */
export const unbindFinAppEventHanlders = (app: OpenFinApplication, eventHandlers: EventHandler[]) => {
  eventHandlers.forEach(({ event, handler }) => {
    app.removeEventListener(event, handler);
  });
};

/**
 * Add event listeners to applications to tracks states.
 */
export const bindFinAppEventHandlers = (dipsatch: Dispatch, app: OpenFinApplication, id: App['id']): EventHandler[] => {
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

  handlers = CLOSED_EVENTS.reduce((acc, event) => {
    const handler = () => {
      dipsatch(setFinAppStatusState({ id, statusState: AppStatusStates.Closed, origin: AppStatusOrigins.Event }));
      unbindFinAppEventHanlders(app, handlers);
    };
    acc.push({ event, handler });

    app.addEventListener(event, handler);

    return acc;
  }, handlers);

  return handlers;
};
