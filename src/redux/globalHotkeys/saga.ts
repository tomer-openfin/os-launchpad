import { Application } from '@giantmachines/redux-openfin';
import { put, select, takeEvery } from 'redux-saga/effects';

import windowsConfig from '../../config/windows';
import { UserLayout } from '../../types/commons';
import { restoreLayoutRequest, SAVE_LAYOUT } from '../layouts/actions';
import { getLayoutsIds } from '../layouts/selectors';
import { launchWindow } from '../windows/actions';
import { GLOBAL_HOTKEY_PRESSED } from './actions';
import { DevGlobalHotkeys, GlobalHotkeys } from './enums';

function* watchGlobalHotkeyPressed(action) {
  const hotkey = action.payload;

  switch (hotkey) {
    case GlobalHotkeys.SaveLayout: {
      // tslint:disable-next-line:no-console
      console.log(`${GlobalHotkeys.SaveLayout} pressed`);

      yield put({ type: SAVE_LAYOUT });
      break;
    }

    case GlobalHotkeys.RestoreLayout: {
      // tslint:disable-next-line:no-console
      console.log(`${GlobalHotkeys.RestoreLayout} pressed`);

      // todo: align with watchRestoreLayout saga once it's updated to handle
      // multiple user layouts
      const layoutIds = yield select(getLayoutsIds);
      const firstLayoutId: UserLayout['id'] = layoutIds[0];

      yield put(restoreLayoutRequest(firstLayoutId));
      break;
    }

    case GlobalHotkeys.ShowAppDirectory: {
      // tslint:disable-next-line:no-console
      console.log(`${GlobalHotkeys.ShowAppDirectory} pressed`);

      yield put(launchWindow(windowsConfig.appDirectory));
      break;
    }

    case DevGlobalHotkeys.ReloadApp: {
      yield put(Application.restart());
      break;
    }
    default:
      // tslint:disable-next-line:no-console
      console.log('Not a valid registered hotkey.');
  }
}

export function* globalHotkeysSaga() {
  yield takeEvery(GLOBAL_HOTKEY_PRESSED, watchGlobalHotkeyPressed);
}
