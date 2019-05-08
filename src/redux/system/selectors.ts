import { createSelector } from 'reselect';

import { DirectionalCoordinates, Identity, MonitorDetails } from '../../types/commons';
import { getCoordinatesHeight, getCoordinatesWidth } from '../../utils/coordinateHelpers';
import { State } from '../types';
import { getUniqueWindowId } from '../windows/utils';

const getMonitorDetailsId = (monitorDetails: MonitorDetails) => monitorDetails.name || monitorDetails.deviceId;
export const getIsSystemWindowPresent = (windowDetailsById: State['system']['windowDetailsById'], identity: Identity) => {
  const windowDetails = windowDetailsById[getUniqueWindowId(identity)];
  if (!windowDetails) {
    return false;
  }
  return windowDetails.isGrouped || windowDetails.isShowing;
};

export const getSystem = (state: State) => state.system;
export const getSystemMachineId = (state: State) => getSystem(state).machineId;
export const getSystemWindowDetailsById = (state: State) => getSystem(state).windowDetailsById;
// Is present represents a window being on the desktop
export const getSystemWindowIsPresent = (state: State, identity: Identity) => {
  const windowDetailsById = getSystemWindowDetailsById(state);
  return getIsSystemWindowPresent(windowDetailsById, identity);
};
export const getMonitorInfo = (state: State) => getSystem(state).monitorInfo;
export const getNormalizedMonitorDetails = createSelector(
  [getMonitorInfo],
  monitorInfo => {
    const ids: Array<number | string> = [];
    const byId: { [id: number]: MonitorDetails; [id: string]: MonitorDetails } = {};

    if (monitorInfo) {
      const { primaryMonitor, nonPrimaryMonitors } = monitorInfo;
      const primaryMonitorId = getMonitorDetailsId(primaryMonitor);

      ids.push(primaryMonitorId);
      byId[primaryMonitorId] = primaryMonitor;

      nonPrimaryMonitors.forEach(nonPrimaryMonitor => {
        const id = getMonitorDetailsId(nonPrimaryMonitor);

        ids.push(id);
        byId[id] = nonPrimaryMonitor;
      });
    }

    return { ids, byId };
  },
);

export const getMonitorDetailsIds = createSelector(
  [getNormalizedMonitorDetails],
  normalizedMonitorDetails => normalizedMonitorDetails.ids,
);

export const getMonitorDetailsById = createSelector(
  [getNormalizedMonitorDetails],
  normalizedMonitorDetails => normalizedMonitorDetails.byId,
);

export const getMonitorDetails = createSelector(
  [getMonitorDetailsIds, getMonitorDetailsById],
  (monitorDetailsIds, monitorDetailsById) => monitorDetailsIds.map(id => monitorDetailsById[id]),
);

/**
 * Get rect which encompasses all monitors
 */
export const getEncompassingMonitorRect = createSelector(
  [getMonitorInfo],
  monitorInfo => {
    if (!monitorInfo) {
      return null;
    }

    const coordinates = { ...monitorInfo.primaryMonitor.monitorRect };
    monitorInfo.nonPrimaryMonitors.forEach(monitor => {
      const { bottom, left, right, top } = monitor.monitorRect;

      if (bottom > coordinates.bottom) {
        coordinates.bottom = bottom;
      }
      if (left < coordinates.left) {
        coordinates.left = left;
      }
      if (right > coordinates.right) {
        coordinates.right = right;
      }
      if (top < coordinates.top) {
        coordinates.top = top;
      }
    });

    return coordinates;
  },
);

const adjustRectToOrigin = (coordinates: DirectionalCoordinates, top: number, left: number): DirectionalCoordinates => {
  return {
    bottom: coordinates.bottom - top,
    left: coordinates.left - left,
    right: coordinates.right - left,
    top: coordinates.top - top,
  };
};

const shrinkRectByGutter = (gutterSize: number, coordinates: DirectionalCoordinates): DirectionalCoordinates => {
  const { bottom, left, right, top } = coordinates;
  const gutterAdjustment = gutterSize / 2;

  return {
    bottom: bottom - gutterAdjustment,
    left: left + gutterAdjustment,
    right: right - gutterAdjustment,
    top: top + gutterAdjustment,
  };
};

const getMonitorScreenRect = (coordinates: DirectionalCoordinates, multiplier: number, xDelta: number, yDelta: number): DirectionalCoordinates => ({
  bottom: coordinates.bottom * multiplier + yDelta,
  left: coordinates.left * multiplier + xDelta,
  right: coordinates.right * multiplier + xDelta,
  top: coordinates.top * multiplier + yDelta,
});

/**
 * Get monitor screens rect for a given height and width
 */
export const getMonitorScreens = createSelector(
  [
    getMonitorInfo,
    getEncompassingMonitorRect,
    (_, props: { gutterSize: number }) => props.gutterSize,
    (_, props: { height: number }) => props.height,
    (_, props: { width: number }) => props.width,
  ],
  (monitorInfo, monitorsEntirePlane, gutterSize, height, width) => {
    if (!monitorInfo || !monitorsEntirePlane) {
      return [];
    }

    // Get height and width of the rect which encompasses all monitors
    const planeHeight = getCoordinatesHeight(monitorsEntirePlane);
    const planeWidth = getCoordinatesWidth(monitorsEntirePlane);

    // Multiplier will be used on all directional coordinates to shrink monitors to fit into a given height and width
    const planeHeightMultiplier = height / planeHeight;
    const planeWidthMultiplier = width / planeWidth;
    const multiplier = Math.min(planeHeightMultiplier, planeWidthMultiplier);

    // One side will shrink more than the other which will offset the centering of the plane
    // Calculate deltas to center the plane within the given height and width
    const xDelta = (width - planeWidth * multiplier) / 2;
    const yDelta = (height - planeHeight * multiplier) / 2;

    // Monitor plane is not necessary at origin
    // top and left will be used to adjust all monitors as if plane was at origin
    const { left, top } = monitorsEntirePlane;

    const { primaryMonitor, nonPrimaryMonitors } = monitorInfo;
    const primaryMonitorScreen = {
      id: primaryMonitor.name || primaryMonitor.deviceId,
      rect: shrinkRectByGutter(gutterSize, getMonitorScreenRect(adjustRectToOrigin(primaryMonitor.monitorRect, top, left), multiplier, xDelta, yDelta)),
    };

    const monitorScreens = [primaryMonitorScreen];
    nonPrimaryMonitors.forEach(nonPrimaryMonitor => {
      const monitorScreen = {
        id: nonPrimaryMonitor.name || nonPrimaryMonitor.deviceId,
        rect: shrinkRectByGutter(gutterSize, getMonitorScreenRect(adjustRectToOrigin(nonPrimaryMonitor.monitorRect, top, left), multiplier, xDelta, yDelta)),
      };

      monitorScreens.push(monitorScreen);
    });

    return monitorScreens;
  },
);
