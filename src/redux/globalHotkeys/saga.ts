import { Application } from '@giantmachines/redux-openfin';
import { put, select, takeEvery } from 'redux-saga/effects';

import windowsConfig from '../../config/windows';
import getOwnUuid from '../../utils/getOwnUuid';
import { isDevelopmentEnv } from '../../utils/processHelpers';
import { restoreLayout } from '../layouts/actions';
import { getLayoutsIds } from '../layouts/selectors';
import { getAutoHide, setAutoHide } from '../me';
import { getErrorFromCatch } from '../utils';
import { launchWindow } from '../windows/actions';
import { globalHotkeyPressed } from './actions';
import { DevGlobalHotkeys, GlobalHotkeys } from './enums';

function* watchGlobalHotkeyPressed(action: ReturnType<typeof globalHotkeyPressed>) {
  try {
    const { hotkey } = action.payload;

    switch (hotkey) {
      case GlobalHotkeys.RestoreLayout: {
        // tslint:disable-next-line:no-console
        console.log(`${GlobalHotkeys.RestoreLayout} pressed`);

        // todo: align with watchRestoreLayout saga once it's updated to handle
        // multiple user layouts
        const layoutIds: ReturnType<typeof getLayoutsIds> = yield select(getLayoutsIds);
        const firstLayoutId = layoutIds[0];

        yield put(restoreLayout.request(firstLayoutId));
        break;
      }

      case GlobalHotkeys.ShowAppDirectory: {
        // tslint:disable-next-line:no-console
        console.log(`${GlobalHotkeys.ShowAppDirectory} pressed`);

        yield put(launchWindow(windowsConfig.appDirectory));
        break;
      }

      case GlobalHotkeys.ToggleAutoHide: {
        // tslint:disable-next-line:no-console
        console.log(`${GlobalHotkeys.ToggleAutoHide} pressed`);

        const autoHide: ReturnType<typeof getAutoHide> = yield select(getAutoHide);
        yield put(setAutoHide({ autoHide: !autoHide }));
        break;
      }

      case DevGlobalHotkeys.ReloadApp: {
        yield put(Application.restart());
        break;
      }

      case DevGlobalHotkeys.ShowDevTools: {
        const { fin } = window;
        if (fin && isDevelopmentEnv()) {
          const appUuid = getOwnUuid();
          fin.desktop.System.showDeveloperTools(appUuid, appUuid);
        }
        break;
      }

      default:
        // tslint:disable-next-line:no-console
        console.log('Not a valid registered hotkey.');
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchGlobalHotkeyPressed', error);
  }
}

export function* globalHotkeysSaga() {
  yield takeEvery(globalHotkeyPressed, watchGlobalHotkeyPressed);
}
