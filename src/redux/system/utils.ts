import { Action, Store } from 'redux';

import getOwnUuid from '../../utils/getOwnUuid';
import { addSystemEventListener, removeSystemEventListener } from '../../utils/openfinPromises';
import {
  setMonitorInfo,
  systemEventApplicationClosed,
  systemEventApplicationCrashed,
  systemEventApplicationStarted,
  systemEventWindowBoundsChanged,
  systemEventWindowClosed,
  systemEventWindowCreated,
  systemEventWindowGroupChanged,
  systemEventWindowHidden,
  systemEventWindowShown,
} from './actions';

type Fin = typeof fin;

const createSystemEventDispatcher = (store: Store, actionCreator: (e) => Action) => e => {
  // No need to track events from own app
  if (typeof e === 'object' && e && e.uuid === getOwnUuid()) {
    return;
  }
  store.dispatch(actionCreator(e));
};

export const setupSystemHandlers = (fin?: Fin, store?: Store) => {
  if (!fin || !store) {
    return;
  }

  const applicationClosedHandler = createSystemEventDispatcher(store, systemEventApplicationClosed);
  const applicationCrashedHandler = createSystemEventDispatcher(store, systemEventApplicationCrashed);
  const applicationStartedHandler = createSystemEventDispatcher(store, systemEventApplicationStarted);
  const monitorInfoHandler = createSystemEventDispatcher(store, setMonitorInfo);
  const windowBoundsChangedHandler = createSystemEventDispatcher(store, systemEventWindowBoundsChanged);
  const windowClosedHandler = createSystemEventDispatcher(store, systemEventWindowClosed);
  const windowCreatedHandler = createSystemEventDispatcher(store, systemEventWindowCreated);
  const windowHiddenHandler = createSystemEventDispatcher(store, systemEventWindowHidden);
  const windowGroupChangedHandler = createSystemEventDispatcher(store, systemEventWindowGroupChanged);
  const windowShownHandler = createSystemEventDispatcher(store, systemEventWindowShown);

  const eventHandlers = [
    { eventType: 'application-closed', actionCreator: applicationClosedHandler },
    { eventType: 'application-crashed', actionCreator: applicationCrashedHandler },
    { eventType: 'application-started', actionCreator: applicationStartedHandler },
    { eventType: 'monitor-info-changed', actionCreator: monitorInfoHandler },
    { eventType: 'window-bounds-changed', actionCreator: windowBoundsChangedHandler },
    { eventType: 'window-closed', actionCreator: windowClosedHandler },
    { eventType: 'window-created', actionCreator: windowCreatedHandler },
    { eventType: 'window-hidden', actionCreator: windowHiddenHandler },
    { eventType: 'window-group-changed', actionCreator: windowGroupChangedHandler },
    { eventType: 'window-shown', actionCreator: windowShownHandler },
  ];

  eventHandlers.forEach(({ eventType, actionCreator }) => {
    addSystemEventListener(eventType, actionCreator);
  });

  const beforeunloadHandler = () => {
    eventHandlers.forEach(({ eventType, actionCreator }) => {
      removeSystemEventListener(eventType, actionCreator);
    });
  };
  window.addEventListener('beforeunload', beforeunloadHandler);
};
