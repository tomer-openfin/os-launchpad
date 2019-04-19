import { Action, Store } from 'redux';

import { Bounds } from '../../types/commons';
import { MonitorDetails, OpenFinWindow, WindowDetail, WindowInfo } from '../../types/fin';
import { getDestinationBoundsInCoordinates, getGroupBounds, isBoundsInCoordinates, RESIZE_OFFSET_X, RESIZE_OFFSET_Y } from '../../utils/coordinateHelpers';
import getOwnUuid from '../../utils/getOwnUuid';
import {
  addSystemEventListener,
  getSystemAllWindows,
  getWindowBounds,
  getWindowGroup,
  removeSystemEventListener,
  wrapWindow,
} from '../../utils/openfinPromises';
import { getUniqueWindowId } from '../windows/utils';
import {
  setMonitorInfo,
  systemEventApplicationClosed,
  systemEventApplicationCrashed,
  systemEventApplicationStarted,
  systemEventWindowBoundsChanged,
  systemEventWindowClosed,
  systemEventWindowCreated,
  systemEventWindowGroupChanged,
  systemEventWindowHidden,
  systemEventWindowShown,
} from './actions';
import { getMonitorDetails } from './selectors';
import { SystemWindowBounds, SystemWindowDetails } from './types';

type Fin = typeof fin;

const createSystemEventDispatcher = (store: Store, actionCreator: (e) => Action) => e => {
  // No need to track events from own app
  if (typeof e === 'object' && e && e.uuid === getOwnUuid()) {
    return;
  }
  store.dispatch(actionCreator(e));
};

export const setupSystemHandlers = (fin?: Fin, store?: Store) => {
  if (!fin || !store) {
    return;
  }

  const applicationClosedHandler = createSystemEventDispatcher(store, systemEventApplicationClosed);
  const applicationCrashedHandler = createSystemEventDispatcher(store, systemEventApplicationCrashed);
  const applicationStartedHandler = createSystemEventDispatcher(store, systemEventApplicationStarted);
  const monitorInfoHandler = createSystemEventDispatcher(store, setMonitorInfo);
  const windowBoundsChangedHandler = createSystemEventDispatcher(store, systemEventWindowBoundsChanged);
  const windowClosedHandler = createSystemEventDispatcher(store, systemEventWindowClosed);
  const windowCreatedHandler = createSystemEventDispatcher(store, systemEventWindowCreated);
  const windowHiddenHandler = createSystemEventDispatcher(store, systemEventWindowHidden);
  const windowGroupChangedHandler = createSystemEventDispatcher(store, systemEventWindowGroupChanged);
  const windowShownHandler = createSystemEventDispatcher(store, systemEventWindowShown);

  const eventHandlers = [
    { eventType: 'application-closed', actionCreator: applicationClosedHandler },
    { eventType: 'application-crashed', actionCreator: applicationCrashedHandler },
    { eventType: 'application-started', actionCreator: applicationStartedHandler },
    { eventType: 'monitor-info-changed', actionCreator: monitorInfoHandler },
    { eventType: 'window-bounds-changed', actionCreator: windowBoundsChangedHandler },
    { eventType: 'window-closed', actionCreator: windowClosedHandler },
    { eventType: 'window-created', actionCreator: windowCreatedHandler },
    { eventType: 'window-hidden', actionCreator: windowHiddenHandler },
    { eventType: 'window-group-changed', actionCreator: windowGroupChangedHandler },
    { eventType: 'window-shown', actionCreator: windowShownHandler },
  ];

  eventHandlers.forEach(({ eventType, actionCreator }) => {
    addSystemEventListener(eventType, actionCreator);
  });

  const beforeunloadHandler = () => {
    eventHandlers.forEach(({ eventType, actionCreator }) => {
      removeSystemEventListener(eventType, actionCreator);
    });
  };
  window.addEventListener('beforeunload', beforeunloadHandler);
};

export const filterWindowFromGather = (uuid: string) => {
  const NOTIFICATIONS_UUID = 'notifications-service';
  const LAYOUTS_UUID = 'layouts-service';
  return uuid === NOTIFICATIONS_UUID || uuid === LAYOUTS_UUID;
};

export const gatherWindows = async (monitorDetails: MonitorDetails[], launcherMonitorDetails: MonitorDetails) => {
  // TODO - move monitor details login here.

  const allWindows: WindowInfo[] = await getSystemAllWindows();
  const combinedWindows = combineMainChildWindows(allWindows);

  const { ungrouped, grouped } = await separateGroupedWindows(combinedWindows);

  if (ungrouped.length) {
    ungrouped.forEach((win: CombinedWindow) => {
      moveWindow(win, monitorDetails, launcherMonitorDetails);
    });
  }

  if (grouped.length) {
    grouped.forEach((group: CombinedWindow[]) => {
      moveGroup(group, monitorDetails, launcherMonitorDetails);
    });
  }
};

type CombinedWindow = WindowDetail & { uuid: string; idName: string };

const combineMainChildWindows = (allwindows: WindowInfo[]): CombinedWindow[] => {
  return allwindows.reduce(
    (acc: CombinedWindow[], el: WindowInfo) => {
      const { mainWindow, childWindows, uuid } = el;

      // filter out service windows and internal windows
      const NOTIFICATIONS_UUID = 'notifications-service';
      const LAYOUTS_UUID = 'layouts-service';
      const FDC3_UUID = 'fdc3-service"';
      if (uuid === NOTIFICATIONS_UUID || uuid === LAYOUTS_UUID || uuid === FDC3_UUID) {
        return acc;
      }

      return [
        ...acc,
        { ...mainWindow, uuid, idName: getUniqueWindowId({ name: mainWindow.name, uuid }) },
        ...childWindows.map((child: WindowDetail) => ({ ...child, uuid, idName: getUniqueWindowId({ name: child.name, uuid }) })),
      ];
    },
    [] as CombinedWindow[],
  );
};

const separateGroupedWindows = async (combinedWindows: CombinedWindow[]): Promise<{ grouped: CombinedWindow[][]; ungrouped: CombinedWindow[] }> => {
  let ungrouped: CombinedWindow[] = [];
  let grouped = {};
  let groupedWindowIds = {};
  let currentGroupId = 1;

  for (const win of combinedWindows) {
    if (groupedWindowIds[win.idName]) {
      grouped[groupedWindowIds[win.idName]] = [...grouped[groupedWindowIds[win.idName]], win];
      continue;
    }

    const wrappedWindow: OpenFinWindow = await wrapWindow({ uuid: win.uuid, name: win.name });
    const groupArr: OpenFinWindow[] = await getWindowGroup(wrappedWindow);

    if (groupArr.length) {
      grouped = { ...grouped, [currentGroupId]: [win] };

      const memo = groupArr.reduce((acc, el) => ({ ...acc, [getUniqueWindowId({ name: el.name, uuid: el.uuid })]: currentGroupId }), {});
      groupedWindowIds = { ...groupedWindowIds, ...memo };
      currentGroupId++;
      continue;
    }
    ungrouped = [...ungrouped, win];
  }
  return { ungrouped, grouped: Object.values(grouped) };
};

const moveWindow = async (targetWindow: CombinedWindow, monitorDetails: MonitorDetails[], launcherMonitorDetails: MonitorDetails) => {
  const { availableRect } = launcherMonitorDetails;

  const bounds = {
    height: targetWindow.height,
    left: targetWindow.left,
    top: targetWindow.top,
    width: targetWindow.width,
  };

  const foundMonitorDetails = monitorDetails.find(monitorDetail => isBoundsInCoordinates(bounds, monitorDetail.monitorRect));
  // If window is still within one of the monitors bounds
  // No need to do anything, bail
  if (foundMonitorDetails) {
    return;
  }

  const wrappedWindow: OpenFinWindow = await wrapWindow({ uuid: targetWindow.uuid, name: targetWindow.name });
  // resize window if necessary
  if (bounds.width > availableRect.right || bounds.height > availableRect.bottom) {
    await wrappedWindow.resizeTo(
      Math.min(bounds.width, availableRect.right - RESIZE_OFFSET_X),
      Math.min(bounds.height, availableRect.bottom - RESIZE_OFFSET_Y),
      'top-left',
    );
  }

  const newBounds = await getWindowBounds(wrappedWindow);

  // If monitor does not fall within one of the monitor bounds
  // Recover to where the launcher is
  const { left, top } = getDestinationBoundsInCoordinates(newBounds, availableRect);

  wrappedWindow.moveTo(left, top);
};

const moveGroup = async (targetGroup: CombinedWindow[], monitorDetails: MonitorDetails[], launcherMonitorDetails: MonitorDetails) => {
  const { availableRect } = launcherMonitorDetails;

  const groupBounds = getGroupBounds(targetGroup);

  const foundMonitorDetails = monitorDetails.find(monitorDetail => isBoundsInCoordinates(groupBounds, monitorDetail.monitorRect));

  // If window is still within one of the monitors bounds
  // No need to do anything, bail
  if (foundMonitorDetails) {
    return;
  }

  // // Recover to where the launcher is
  const leftmost = getLeftmostWindow(targetGroup);

  const { left: newLeft, top: newTop } = getDestinationBoundsInCoordinates(groupBounds, availableRect);
  const wrappedLeftmost: OpenFinWindow = await wrapWindow({ uuid: leftmost.uuid, name: leftmost.name });

  const destinationTop = getLeftmostWindowDestinationTop({ leftmost, groupBounds, newTop });

  wrappedLeftmost.moveTo(newLeft, destinationTop);
};

const getLeftmostWindow = (windowGroup: CombinedWindow[]) => {
  return windowGroup.reduce((acc: CombinedWindow, el: CombinedWindow) => (el.left < acc.left ? el : acc), windowGroup[0]);
};

const getLeftmostWindowDestinationTop = ({ leftmost, groupBounds, newTop }: { leftmost: CombinedWindow; groupBounds: Bounds; newTop: number }) =>
  newTop + (leftmost.top - groupBounds.top);
