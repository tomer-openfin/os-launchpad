import { Window } from '@giantmachines/redux-openfin';
import { all, Effect, put, select, take } from 'redux-saga/effects';

import { Identity } from '../../types/fin';
import { openfinReady } from '../application';
import { hideWindow, launchWindow } from './actions';
import { getWindowsById } from './selectors';
import { WindowConfigsMap } from './types';

export const getUniqueWindowId = (identity: Identity): string => `${identity.uuid}/${identity.name}`;

export function* initWindows(configs: WindowConfigsMap) {
  const windowsById = yield select(getWindowsById);
  yield all(
    Object.values(configs).reduce(
      (acc, config) => {
        if (windowsById[config.name]) {
          return acc;
        }

        acc.push(take(action => action.type === openfinReady.toString() && action.payload.finName === config.name));
        acc.push(put(launchWindow(config)));
        return acc;
      },
      [] as Effect[],
    ),
  );
}

export function* closeWindowsByConfig(configs: WindowConfigsMap) {
  yield all(Object.values(configs).map(config => put(Window.closeWindow({ id: config.name }))));
}

export function* hideWindowsByConfig(configs: WindowConfigsMap) {
  yield all(Object.values(configs).map(config => put(hideWindow({ name: config.name }))));
}
