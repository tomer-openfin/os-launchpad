import { all, call, Effect, put, select, take } from 'redux-saga/effects';

import { Identity } from '../../types/fin';
import { closeWindow } from '../../utils/finUtils';
import getOwnUuid from '../../utils/getOwnUuid';
import { openfinReady } from '../application';
import { hideWindow, launchWindow } from './actions';
import { getWindowsById } from './selectors';
import { WindowConfigsMap } from './types';

export const getUniqueWindowId = (identity: Identity): string => `${identity.uuid}/${identity.name}`;

export function* initWindows(configs: WindowConfigsMap) {
  const uuid = getOwnUuid();
  const windowsById = yield select(getWindowsById);
  const effects = Object.values(configs).reduce(
    (acc, config) => {
      const id = getUniqueWindowId({ uuid, name: config.name });
      if (windowsById[id]) {
        return acc;
      }

      acc.push(take(action => action.type === openfinReady.toString() && action.payload.finName === config.name));
      acc.push(put(launchWindow(config)));
      return acc;
    },
    [] as Effect[],
  );
  yield all(effects);
}

export function* closeWindowsByConfig(configs: WindowConfigsMap) {
  yield all(Object.values(configs).map(config => call(closeWindow({ uuid: getOwnUuid(), name: config.name }))));
}

export function* hideWindowsByConfig(configs: WindowConfigsMap) {
  yield all(Object.values(configs).map(config => put(hideWindow.request({ name: config.name }))));
}
