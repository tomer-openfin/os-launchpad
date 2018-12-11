import { Window } from '@giantmachines/redux-openfin';
import { delay } from 'redux-saga';
import { all, call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';

import windowsConfig, { createConfig, initOnStartWindows, MAIN_WINDOW } from '../../config/windows';
import getAppUuid from '../../utils/getAppUuid';
import { getLauncherFinWindow } from '../../utils/getLauncherFinWindow';
import { deregister } from '../../utils/openfinLayouts';
import { animateWindow, getSystemMonitorInfo } from '../../utils/openfinPromises';
import takeFirst from '../../utils/takeFirst';
import { calcLauncherPosition } from '../../utils/windowPositionHelpers';
import { getAppDirectoryList } from '../apps';
import { getLayoutsRequest } from '../layouts';
import { getAutoHide, getLauncherPosition, getSettingsRequest } from '../me';
import { getTotalLauncherCtas } from '../selectors';
import { getMonitorInfo, setMonitorInfo, setupSystemHandlers } from '../system';
import { launchWindow } from '../windows';
import {
  APPLICATION_STARTED,
  COLLAPSE_APP,
  EXPAND_APP,
  LAUNCH_APP_LAUNCHER,
  launchAppLauncher,
  OPENFIN_READY,
  REBOUND_LAUNCHER,
  reboundLauncherError,
  reboundLauncherRequest,
  reboundLauncherSuccess,
  setIsEnterprise,
  setIsExpanded,
} from './actions';
import { getApplicationIsExpanded } from './selectors';
import { OpenfinReadyAction, ReboundLauncherRequestAction } from './types';
import { animateLauncherCollapseExpand } from './utils';

const APP_UUID = getAppUuid();
const ANIMATION_DURATION = 150;

const { ENTERPRISE = false } = process.env;

/**w
 * Applcation Start
 */
function* applicationStart() {
  // tslint:disable-next-line:no-console
  console.log('application started');

  yield put(getAppDirectoryList());
}

/**
 * Watcher on when openfin is ready for a window by name
 */
function* openfinSetup(action: OpenfinReadyAction) {
  // tslint:disable-next-line:no-console
  console.log('Openfin ready', action);

  if (action.payload!.finName === APP_UUID) {
    const isLoggedIn = false;
    const isEnterprise = ENTERPRISE === 'true';
    yield put(setIsEnterprise(isEnterprise));

    // Initial system monitor info
    // and setup system event handlers
    try {
      const systemMonitorInfo = yield call(getSystemMonitorInfo);
      yield put(setMonitorInfo(systemMonitorInfo));
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log('Failed to get/set monitor information:', e);
    }

    yield call(setupSystemHandlers, fin, window.store || window.opener.store);

    const launcherFinWindow = yield call(getLauncherFinWindow);
    // Hide launcher
    if (launcherFinWindow) {
      launcherFinWindow.hide();
    }

    // Launch all windows on init, windows are hidden by default unless they have autoShow: true
    yield all(Object.keys(initOnStartWindows).map(window => put(launchWindow(initOnStartWindows[window]))));

    if (isEnterprise && !isLoggedIn) {
      // Show Login
      yield put(launchWindow(windowsConfig.login));
    } else {
      yield all([put(getLayoutsRequest()), put(getSettingsRequest())]);

      // Show Launchbar
      yield put(launchAppLauncher());
    }
  }
}

function* watchLaunchAppLauncher() {
  // const ids = yield select(getLayoutsIds);
  // if (ids[0]) {
  //   const layout = yield select(getLayoutById, ids[0]);
  //   yield put(restoreLayout(layout));
  // }

  yield all([take([REBOUND_LAUNCHER.ERROR, REBOUND_LAUNCHER.SUCCESS]), put(reboundLauncherRequest(false))]);

  // When all done show main app bar
  const { fin } = window;
  if (fin) {
    // TODO: Remove once app launchers width is set to screen size width || height
    //       Delay helps with the dom shuffling
    yield delay(100);
    yield put(Window.showWindow({ id: APP_UUID }));

    // Deregister all child windows
    (async function deregisterAllWindows() {
      const names = Object.keys(windowsConfig).map(window => windowsConfig[window].name);
      for (let i = 0; i < names.length; i++) {
        // UUID (i.e MAIN_WINDOW) shared across child windows
        await deregister(createConfig(MAIN_WINDOW, names[i]))
          // tslint:disable-next-line:no-console
          .then(() => console.log(`Deregistering ${names[i]} from Layouts service.`))
          // tslint:disable-next-line:no-console
          .catch(err => console.log(`${names[i]} has already been deregistred from Layouts service. ${err}`));
      }
    })();
  }
}

function* watchCollapseApp() {
  const autoHide = yield select(getAutoHide);
  const isExpanded = yield select(getApplicationIsExpanded);
  if (!autoHide && !isExpanded) {
    return;
  }

  const nextIsExpanded = false;
  yield call(animateLauncherCollapseExpand, nextIsExpanded, 333);

  yield put(setIsExpanded(nextIsExpanded));
}

function* watchExpandApp() {
  const autoHide = yield select(getAutoHide);
  const isExpanded = yield select(getApplicationIsExpanded);
  if (!autoHide && isExpanded) {
    return;
  }

  const nextIsExpanded = true;
  yield call(animateLauncherCollapseExpand, nextIsExpanded, 500);

  yield put(setIsExpanded(nextIsExpanded));
}

function* watchReboundLauncherRequest(action: ReboundLauncherRequestAction) {
  const { payload } = action;
  const launcherFinWindow = yield call(getLauncherFinWindow);
  if (!launcherFinWindow || !payload) {
    yield put(reboundLauncherError());
    return;
  }

  const [totalCtas, monitorInfo, launcherPosition, autoHide, isExpanded] = yield all([
    select(getTotalLauncherCtas),
    select(getMonitorInfo),
    select(getLauncherPosition),
    select(getAutoHide),
    select(getApplicationIsExpanded),
  ]);
  if (!monitorInfo) {
    return;
  }
  const { width, height, left, top } = calcLauncherPosition(totalCtas, monitorInfo, launcherPosition, autoHide, isExpanded);

  const { shouldAnimate } = payload;
  yield call(
    animateWindow,
    launcherFinWindow,
    {
      position: {
        duration: shouldAnimate ? ANIMATION_DURATION : 0,
        left,
        relative: false,
        top,
      },
      size: {
        duration: shouldAnimate ? ANIMATION_DURATION : 0,
        height,
        relative: false,
        width,
      },
    },
    {
      interrupt: shouldAnimate ? false : true,
      tween: 'ease-in-out',
    },
  );

  yield put(reboundLauncherSuccess());
}

export function* applicationSaga() {
  yield takeEvery(APPLICATION_STARTED, applicationStart);
  yield takeEvery(LAUNCH_APP_LAUNCHER, watchLaunchAppLauncher);
  yield takeEvery(OPENFIN_READY, openfinSetup);
  yield takeFirst(COLLAPSE_APP, watchCollapseApp);
  yield takeFirst(EXPAND_APP, watchExpandApp);
  yield takeLatest(REBOUND_LAUNCHER.REQUEST, watchReboundLauncherRequest);
}
