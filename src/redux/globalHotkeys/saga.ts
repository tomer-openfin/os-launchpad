import { call, put, select, takeEvery } from 'redux-saga/effects';

import windowsConfig from '../../config/windows';
import { EventType, sendAnalytics } from '../../utils/analytics';
import { restartApplication, showSystemDeveloperTools } from '../../utils/finUtils';
import getOwnUuid from '../../utils/getOwnUuid';
import { isDevelopmentEnv } from '../../utils/processHelpers';
import { toggleAppIsShowing } from '../application';
import { restoreLayout } from '../layouts/actions';
import { getAllLayouts } from '../layouts/selectors';
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

      case GlobalHotkeys.ToggleAppIsShowing: {
        // tslint:disable-next-line:no-console
        console.log(`${GlobalHotkeys.ToggleAppIsShowing} pressed`);

        sendAnalytics({ type: EventType.HotKey, label: 'ToggleAppIsShowing', context: { hotkey } });
        yield put(toggleAppIsShowing());
        break;
      }

      case DevGlobalHotkeys.ReloadApp: {
        yield call(restartApplication());
        break;
      }

      case DevGlobalHotkeys.ShowDevTools: {
        if (isDevelopmentEnv()) {
          const appUuid = getOwnUuid();
          showSystemDeveloperTools({ uuid: appUuid, name: appUuid });
        }
        break;
      }

      default:
        // tslint:disable-next-line:no-console
        console.warn('Not a valid registered hotkey.');
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
