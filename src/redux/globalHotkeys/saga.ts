import { Application } from '@giantmachines/redux-openfin';
import { put, select, takeEvery } from 'redux-saga/effects';

import windowsConfig from '../../config/windows';
import { EventType, sendAnalytics } from '../../utils/analytics';
import getOwnUuid from '../../utils/getOwnUuid';
import { isDevelopmentEnv } from '../../utils/processHelpers';
import { restoreLayout } from '../layouts/actions';
import { getAllLayouts } from '../layouts/selectors';
import { getSystemTrayEnabled, setSystemTrayEnabled } from '../me/index';
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

        const layouts: ReturnType<typeof getAllLayouts> = yield select(getAllLayouts);
        const firstLayout = layouts[0];

        sendAnalytics({ type: EventType.HotKey, label: 'RestoreLayout', context: { hotkey, name: firstLayout ? firstLayout.name : undefined } });
        if (firstLayout) {
          yield put(restoreLayout.request(firstLayout.id));
        }

        break;
      }

      case GlobalHotkeys.ShowAppDirectory: {
        // tslint:disable-next-line:no-console
        console.log(`${GlobalHotkeys.ShowAppDirectory} pressed`);

        sendAnalytics({ type: EventType.HotKey, label: 'ShowAppDirectory', context: { hotkey } });
        yield put(launchWindow(windowsConfig.appDirectory));
        break;
      }

      case GlobalHotkeys.ToggleSystemTrayEnabled: {
        // tslint:disable-next-line:no-console
        console.log(`${GlobalHotkeys.ToggleSystemTrayEnabled} pressed`);

        const systemTrayEnabled: ReturnType<typeof getSystemTrayEnabled> = yield select(getSystemTrayEnabled);
        sendAnalytics({ type: EventType.HotKey, label: 'ToggleSystemTrayEnabled', context: { hotkey, currentValue: systemTrayEnabled } });
        yield put(setSystemTrayEnabled({ systemTrayEnabled: !systemTrayEnabled }));
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
