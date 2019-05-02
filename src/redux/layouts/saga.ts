import { all, call, put, race, select, take, takeEvery } from 'redux-saga/effects';

import { LAYOUTS_WINDOW } from '../../config/windows';
import ApiService from '../../services/ApiService';
import { ApiResponseStatus, AppStatusOrigins, AppStatusStates, Transition, UserLayout } from '../../types/commons';
import { UnPromisfy } from '../../types/utils';
import { EventType, sendAnalytics } from '../../utils/analytics';
import { animateWindow } from '../../utils/finUtils';
import getOwnUuid from '../../utils/getOwnUuid';
import { generateLayout, restoreLayout as restoreFinLayout } from '../../utils/openfinLayouts';
import { calcBoundsRelativeToLauncher } from '../../utils/windowPositionHelpers';
import { getApps, getAppsStatusById, openFinApp, setFinAppStatusState } from '../apps';
import { getLauncherPosition, getLauncherSizeConfig } from '../me';
import { getSystemDrawerSize } from '../selectors';
import { getErrorFromCatch } from '../utils';
import { getWindowBounds } from '../windows';

import { createLayout, deleteLayout, dismissUndoUpdateLayout, getLayouts, restoreLayout, saveLayout, undoUpdateLayout, updateLayout } from './actions';
import { getAllLayouts, getLayoutById, getLayoutByName } from './selectors';
import { calcDesiredLayoutsWindowHeight } from './utils';

function* watchLayoutsChangesToAnimateWindow() {
  try {
    const uuid = getOwnUuid();
    const bounds: ReturnType<typeof getWindowBounds> = yield select(getWindowBounds, LAYOUTS_WINDOW);
    const launcherBounds: ReturnType<typeof getWindowBounds> = yield select(getWindowBounds, uuid);
    const launcherPosition: ReturnType<typeof getLauncherPosition> = yield select(getLauncherPosition);
    const launcherSizeConfig: ReturnType<typeof getLauncherSizeConfig> = yield select(getLauncherSizeConfig);
    const systemDrawerSize: ReturnType<typeof getSystemDrawerSize> = yield select(getSystemDrawerSize);
    const layouts: ReturnType<typeof getAllLayouts> = yield select(getAllLayouts);

    if (!bounds || !layouts || !launcherBounds) {
      return;
    }

    const animationBounds = calcBoundsRelativeToLauncher(
      LAYOUTS_WINDOW,
      { ...bounds, height: calcDesiredLayoutsWindowHeight(layouts.length) },
      launcherBounds,
      launcherPosition,
      launcherSizeConfig,
      systemDrawerSize,
    );

    const transitions: Transition = {
      position: {
        duration: 80,
        left: animationBounds.left,
        relative: false,
        top: animationBounds.top,
      },
      size: {
        duration: 80,
        height: animationBounds.height,
        relative: false,
        width: animationBounds.width,
      },
    };

    yield call(animateWindow({ uuid, name: LAYOUTS_WINDOW }), transitions, { interrupt: false });
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchLayoutsChangesToAnimateWindow', error);
  }
}

function* watchGetLayoutsRequest(action: ReturnType<typeof getLayouts.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.getUserLayouts>> = yield call(ApiService.getUserLayouts);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(getLayouts.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getLayouts.failure(error, action.meta));
  }
}

function* watchCreateLayoutRequest(action: ReturnType<typeof createLayout.request>) {
  try {
    const name = action.payload || 'layout';
    const layout: UnPromisfy<ReturnType<typeof generateLayout>> = yield call(generateLayout);

    const userLayout = { name, layout };
    const response: UnPromisfy<ReturnType<typeof ApiService.createUserLayout>> = yield call(ApiService.createUserLayout, userLayout);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(createLayout.success({ layout: response.data, updated: false }, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(createLayout.failure(error, action.meta));
  }
}

function* watchDeleteLayoutRequest(action: ReturnType<typeof deleteLayout.request>) {
  try {
    sendAnalytics({ type: EventType.Click, label: 'Workspace::Delete', context: { name: action.payload } });
    const response: UnPromisfy<ReturnType<typeof ApiService.deleteUserLayout>> = yield call(ApiService.deleteUserLayout, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(deleteLayout.success(action.payload, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(deleteLayout.failure(error, action.meta));
  }
}

function* watchRestoreLayoutRequest(action: ReturnType<typeof restoreLayout.request>) {
  try {
    const layoutId = action.payload;
    const userLayout: ReturnType<typeof getLayoutById> = yield select(getLayoutById, layoutId);
    if (!userLayout || !userLayout.layout) {
      throw new Error('Error getting layout for restore');
    }

    const { layout, name } = userLayout;

    sendAnalytics({ type: EventType.Click, label: 'Workspace::Restore', context: { name } });

    const apps: ReturnType<typeof getApps> = yield select(getApps);
    const appsStatusById: ReturnType<typeof getAppsStatusById> = yield select(getAppsStatusById);

    yield all(
      layout.apps.map(layoutApp => {
        const { manifestUrl, uuid } = layoutApp;

        // ignore launcher saved in layout.apps
        if (uuid === getOwnUuid()) return;

        const matchingApp = apps.find(app => app.manifest_url === manifestUrl);

        if (!matchingApp) {
          // tslint:disable-next-line:no-console
          console.warn('Could not find manifestUrl in list of applications.', manifestUrl, uuid);
          return;
        }

        const { id } = matchingApp;
        const appStatus = appsStatusById[id];

        if (!appStatus || (appStatus && appStatus.state === AppStatusStates.Closed)) {
          return put(setFinAppStatusState({ id, statusState: AppStatusStates.Loading, origin: AppStatusOrigins.LayoutRestore }));
        }
        return;
      }),
    );
    const restoredLayout: UnPromisfy<ReturnType<typeof restoreFinLayout>> = yield call(restoreFinLayout, layout);

    yield put(restoreLayout.success(restoredLayout, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(restoreLayout.failure(error, action.meta));
  }
}

function* watchRestoreLayoutSuccess(action: ReturnType<typeof restoreLayout.success>) {
  try {
    const apps: ReturnType<typeof getApps> = yield select(getApps);
    const appsStatusById: ReturnType<typeof getAppsStatusById> = yield select(getAppsStatusById);
    yield all(
      action.payload.apps.map(layoutApp => {
        const { manifestUrl, uuid } = layoutApp;

        // ignore launcher saved in layout.apps
        if (uuid === getOwnUuid()) return;

        const matchingApp = apps.find(app => app.manifest_url === manifestUrl);

        if (!matchingApp) {
          // tslint:disable-next-line:no-console
          console.warn('Could not find manifestUrl in list of applications.', manifestUrl, uuid);
          return;
        }

        const { id } = matchingApp;
        const appStatus = appsStatusById[id];

        if (appStatus && appStatus.state === AppStatusStates.Loading && appStatus.origin === AppStatusOrigins.LayoutRestore) {
          return put(
            openFinApp.success({
              id,
              origin: AppStatusOrigins.LayoutRestore,
              // TODO: clean up any, maybe upgrade types
              // tslint:disable-next-line:no-any
              runtimeVersion: (layoutApp as any).runtime ? (layoutApp as any).runtime.version : '',
              uuid,
            }),
          );
        }

        return;
      }),
    );
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchRestoreLayoutSuccess', error);
  }
}

function* watchSaveLayoutRequest(action: ReturnType<typeof saveLayout.request>) {
  try {
    const name = action.payload;
    const layoutByName: ReturnType<typeof getLayoutByName> = yield select(getLayoutByName, name);

    if (layoutByName) {
      const id = layoutByName.id;
      const updatePayload = { id, isOverwrite: true, layout: layoutByName, name };

      sendAnalytics({ type: EventType.Click, label: 'Workspace::Save', context: { name, isUpdate: true } });
      yield put(updateLayout.request(updatePayload, action.meta));
      return;
    }

    sendAnalytics({ type: EventType.Click, label: 'Workspace::Save', context: { name, isUpdate: false } });
    yield put(createLayout.request(name, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(saveLayout.failure(error, action.meta));
  }
}

function* watchUpdateLayoutRequest(action: ReturnType<typeof updateLayout.request>) {
  try {
    const { id, isOverwrite, name, layout: previousUserLayout } = action.payload;
    const { layout } = previousUserLayout;

    let userLayout: UserLayout;
    userLayout = {
      id,
      layout,
      name,
    };

    if (isOverwrite) {
      const newUserLayout: UnPromisfy<ReturnType<typeof generateLayout>> = yield call(generateLayout);

      userLayout = {
        id,
        layout: newUserLayout,
        name,
      };
    }

    const response: UnPromisfy<ReturnType<typeof ApiService.updateUserLayout>> = yield call(ApiService.updateUserLayout, userLayout);
    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(updateLayout.success({ previousUserLayout, layout: response.data, updated: true }, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchUpdateLayoutRequest', error);
    yield put(updateLayout.failure(error, action.meta));
  }
}

function* watchUpdateLayoutSuccess(action: ReturnType<typeof updateLayout.success>) {
  try {
    yield call(watchLayoutsChangesToAnimateWindow);

    const { dismiss, undo } = yield race({
      dismiss: take(dismissUndoUpdateLayout.request),
      undo: take(undoUpdateLayout.request),
    });

    const { previousUserLayout } = action.payload;
    if (undo && previousUserLayout) {
      yield put(updateLayout.request({ id: previousUserLayout.id, isOverwrite: false, layout: previousUserLayout, name: previousUserLayout.name }, undo.meta));
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchUpdateLayoutSuccess', error);
  }
}

export function* layoutsSaga() {
  yield takeEvery(getLayouts.request, watchGetLayoutsRequest);
  yield takeEvery(createLayout.request, watchCreateLayoutRequest);
  yield takeEvery(deleteLayout.request, watchDeleteLayoutRequest);
  yield takeEvery(restoreLayout.request, watchRestoreLayoutRequest);
  yield takeEvery(restoreLayout.success, watchRestoreLayoutSuccess);
  yield takeEvery(saveLayout.request, watchSaveLayoutRequest);
  yield takeEvery(updateLayout.request, watchUpdateLayoutRequest);
  yield takeEvery(updateLayout.success, watchUpdateLayoutSuccess);
  yield takeEvery([createLayout.success.toString(), deleteLayout.success.toString(), getLayouts.success.toString()], watchLayoutsChangesToAnimateWindow);
}
