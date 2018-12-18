import { Store } from 'redux';
import { call } from 'redux-saga/effects';

import { addSystemEventListener } from '../../utils/openfinPromises';
import { setMonitorInfo } from './actions';

type Fin = typeof fin;

export function* setupSystemHandlers(fin: Fin, store: Store) {
  const monitorInfoHandler = nextMonitorInfo => {
    store.dispatch(setMonitorInfo(nextMonitorInfo));
  };
  const removeMonitorInfoHandler = () => {
    fin.desktop.System.removeEventListener('monitor-info-changed', monitorInfoHandler);
  };

  // Add event listeners
  yield call(addSystemEventListener, 'monitor-info-changed', monitorInfoHandler);
  // Add remove handlers for event listeners
  window.addEventListener('beforeunload', removeMonitorInfoHandler);
}
