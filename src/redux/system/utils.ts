import { Action, Store } from 'redux';
import { call } from 'redux-saga/effects';

import { addSystemEventListener } from '../../utils/openfinPromises';
import { setMonitorInfo, systemEventApplicationClosed, systemEventApplicationCrashed, systemEventApplicationStarted } from './actions';

type Fin = typeof fin;

const createSystemEventDispatcher = (store: Store, actionCreator: (e) => Action) => e => {
  store.dispatch(actionCreator(e));
};

export function* setupSystemHandlers(fin: Fin, store: Store) {
  const applicationClosedHandler = createSystemEventDispatcher(store, systemEventApplicationClosed);
  const applicationCrashedHandler = createSystemEventDispatcher(store, systemEventApplicationCrashed);
  const applicationStartedHandler = createSystemEventDispatcher(store, systemEventApplicationStarted);
  const monitorInfoHandler = createSystemEventDispatcher(store, setMonitorInfo);

  // Add event listeners
  yield call(addSystemEventListener, 'application-closed', applicationClosedHandler);
  yield call(addSystemEventListener, 'application-crashed', applicationCrashedHandler);
  yield call(addSystemEventListener, 'application-started', applicationStartedHandler);
  yield call(addSystemEventListener, 'monitor-info-changed', monitorInfoHandler);

  const beforeunloadHandler = () => {
    fin.desktop.System.removeEventListener('application-closed', applicationClosedHandler);
    fin.desktop.System.removeEventListener('application-crashed', applicationCrashedHandler);
    fin.desktop.System.removeEventListener('application-started', applicationStartedHandler);
    fin.desktop.System.removeEventListener('monitor-info-changed', monitorInfoHandler);
  };
  window.addEventListener('beforeunload', beforeunloadHandler);
}
