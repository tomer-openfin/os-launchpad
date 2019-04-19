import { Action, Store } from 'redux';

import { access } from 'fs';
import { MonitorDetails, OpenFinWindow, WindowDetail, WindowInfo } from '../../types/fin';
import { UnPromisfy } from '../../types/utils';
import getOwnUuid from '../../utils/getOwnUuid';
import { addSystemEventListener, getSystemAllWindows, getWindowGroup, removeSystemEventListener, wrapWindow } from '../../utils/openfinPromises';
import { State } from '../types';
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

  const [groupedWidows, ungroupedWindows] = await separateGroupedWindows(combinedWindows);

  console.log('sort result', groupedWidows, ungroupedWindows);

  // move ungrouped windows as per usual.
  // write move grouped windows logic
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

const separateGroupedWindows = async (combinedWindows: CombinedWindow[]) => {
  const ungrouped: CombinedWindow[] = [];
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
    ungrouped.push(win);
  }
  return [ungrouped, Object.values(grouped)];
};
