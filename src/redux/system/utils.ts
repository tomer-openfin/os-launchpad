import { Action, Store } from 'redux';

import { Bounds } from '../../types/commons';
import { MonitorDetails, SystemWindowInfo, WindowDetail } from '../../types/fin';
import { getDestinationBoundsInCoordinates, getGroupBounds, isBoundsInCoordinates } from '../../utils/coordinateHelpers';
import {
  addSystemListener,
  getAllSystemWindows,
  getWindowBounds,
  getWindowGroup,
  moveWindowTo,
  removeSystemListener,
  resizeWindowTo,
} from '../../utils/finUtils';
import getOwnUuid from '../../utils/getOwnUuid';
import { getUniqueWindowId } from '../windows/utils';
import {
  setMonitorInfo,
  systemEventApplicationClosed,
  systemEventApplicationCrashed,
  systemEventApplicationStarted,
  systemEventApplicationTrayIconClicked,
  systemEventWindowBoundsChanged,
  systemEventWindowClosed,
  systemEventWindowCreated,
  systemEventWindowGroupChanged,
  systemEventWindowHidden,
  systemEventWindowShown,
} from './actions';

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
  const applicationTrayIconClickedHandler = createSystemEventDispatcher(store, systemEventApplicationTrayIconClicked);
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
    { eventType: 'application-tray-icon-clicked', actionCreator: applicationTrayIconClickedHandler },
    { eventType: 'monitor-info-changed', actionCreator: monitorInfoHandler },
    { eventType: 'window-bounds-changed', actionCreator: windowBoundsChangedHandler },
    { eventType: 'window-closed', actionCreator: windowClosedHandler },
    { eventType: 'window-created', actionCreator: windowCreatedHandler },
    { eventType: 'window-hidden', actionCreator: windowHiddenHandler },
    { eventType: 'window-group-changed', actionCreator: windowGroupChangedHandler },
    { eventType: 'window-shown', actionCreator: windowShownHandler },
  ];

  eventHandlers.forEach(({ eventType, actionCreator }) => {
    addSystemListener(eventType, actionCreator);
  });

  const beforeunloadHandler = () => {
    eventHandlers.forEach(({ eventType, actionCreator }) => {
      removeSystemListener(eventType, actionCreator);
    });
  };
  window.addEventListener('beforeunload', beforeunloadHandler);
};

export const filterWindowFromGather = (uuid: string) => {
  const NOTIFICATIONS_UUID = 'notifications-service';
  const LAYOUTS_UUID = 'layouts-service';
  const FDC3_UUID = 'fdc3-service"';
  return uuid === NOTIFICATIONS_UUID || uuid === LAYOUTS_UUID || uuid === FDC3_UUID;
};

export const gatherWindows = async (monitorDetails: MonitorDetails[], launcherMonitorDetails: MonitorDetails) => {
  if (!monitorDetails || !launcherMonitorDetails) {
    throw new Error('monitorDetails and launcherMonitorDetails are required to recover windows');
  }

  const allWindows: SystemWindowInfo[] = await getAllSystemWindows();
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

const combineMainChildWindows = (allWindows: SystemWindowInfo[]): CombinedWindow[] => {
  return allWindows.reduce(
    (acc: CombinedWindow[], el) => {
      const { mainWindow, childWindows, uuid } = el;

      if (filterWindowFromGather(uuid)) {
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

    const groupArr = await getWindowGroup({ uuid: win.uuid, name: win.name })();

    if (groupArr.length) {
      grouped = { ...grouped, [currentGroupId]: [win] };

      const memoReduceBase: { [idName: string]: number } = {};
      const memo = groupArr.reduce((acc: typeof memoReduceBase, el) => ({ ...acc, [getUniqueWindowId(el.identity)]: currentGroupId }), memoReduceBase);

      groupedWindowIds = { ...groupedWindowIds, ...memo };
      currentGroupId++;
      continue;
    }
    ungrouped = [...ungrouped, win];
  }

  return { ungrouped, grouped: Object.values(grouped) };
};

const moveWindow = async (targetWindow: CombinedWindow, monitorDetails: MonitorDetails[], launcherMonitorDetails: MonitorDetails) => {
  const identity = { uuid: targetWindow.uuid, name: targetWindow.name };
  const bounds = {
    height: targetWindow.height,
    left: targetWindow.left,
    top: targetWindow.top,
    width: targetWindow.width,
  };

  const isFullyInMonitor = monitorDetails.find(monitorDetail => isBoundsInCoordinates(bounds, monitorDetail.monitorRect));
  // If window is still within one of the monitors bounds
  // No need to do anything, bail
  if (isFullyInMonitor) {
    return;
  }

  const { availableRect } = launcherMonitorDetails;
  // resize window if necessary
  if (bounds.width > availableRect.right || bounds.height > availableRect.bottom) {
    await resizeWindowTo(identity)(Math.min(bounds.width, availableRect.right), Math.min(bounds.height, availableRect.bottom), 'top-left');
  }

  const newBounds = await getWindowBounds(identity)();

  // If monitor does not fall within one of the monitor bounds, recover to where the launcher is
  const { left, top } = getDestinationBoundsInCoordinates(newBounds, availableRect);

  moveWindowTo(identity)(left, top);
};

const moveGroup = async (targetGroup: CombinedWindow[], monitorDetails: MonitorDetails[], launcherMonitorDetails: MonitorDetails) => {
  const groupBounds = getGroupBounds(targetGroup);

  const isFullyInMonitor = monitorDetails.find(monitorDetail => isBoundsInCoordinates(groupBounds, monitorDetail.monitorRect));

  // If rectangle encompassing entire group is still within one of the monitors bounds
  // No need to do anything, bail
  if (isFullyInMonitor) {
    return;
  }

  // // Recover to where the launcher is
  const leftmost = getLeftmostWindow(targetGroup);

  const { availableRect } = launcherMonitorDetails;
  const { left: newLeft, top: newTop } = getDestinationBoundsInCoordinates(groupBounds, availableRect);
  const destinationTop = getLeftmostWindowDestinationTop({ leftmost, groupBounds, newTop });

  moveWindowTo({ uuid: leftmost.uuid, name: leftmost.name })(newLeft, destinationTop);
};

const getLeftmostWindow = (windowGroup: CombinedWindow[]): CombinedWindow =>
  windowGroup.reduce((acc: CombinedWindow, el: CombinedWindow) => (el.left < acc.left ? el : acc), windowGroup[0]);

const getLeftmostWindowDestinationTop = ({ leftmost, groupBounds, newTop }: { leftmost: CombinedWindow; groupBounds: Bounds; newTop: number }): number =>
  newTop + (leftmost.top - groupBounds.top);
