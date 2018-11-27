import { LauncherPosition } from '../../types/commons';
import { calcDimensionsByLauncherPosition, calcLauncherCoordinates, calcLauncherPosition, isLeftOrRight, isTopOrBottom } from '../windowPositionHelpers';

const { Bottom: BOTTOM, Left: LEFT, Right: RIGHT, Top: TOP } = LauncherPosition;

type MONITOR_INFO_TOPIC = 'system';
type MONITOR_INFO_TYPE = 'monitor-info-changed';
const TOPIC: MONITOR_INFO_TOPIC = 'system';
const TYPE: MONITOR_INFO_TYPE = 'monitor-info-changed';

const dimensions = { height: 100, width: 200 };
const bounds = {
  ...dimensions,
  left: 0,
  top: 0,
};

const monitorInfo = {
  nonPrimaryMonitors: [],
  primaryMonitor: {
    availableRect: {
      bottom: 1097,
      left: 0,
      right: 1384,
      top: 0,
    },
    deviceId: 'test-device',
    displayDeviceActive: true,
    monitorRect: {
      bottom: 1137,
      left: 0,
      right: 1384,
      top: 0,
    },
    name: 'test-monitor',
  },
  reason: 'display',
  taskbar: {
    edge: BOTTOM,
    rect: {
      bottom: 1137,
      left: 0,
      right: 1384,
      top: 1097,
    },
  },
  topic: TOPIC,
  type: TYPE,
  virtualScreen: {
    bottom: 1137,
    left: 0,
    right: 1384,
    top: 0,
  },
};

describe('windowPositionHelpers', () => {
  describe('isTopOrBottom', () => {
    it('should return true for a positon on top or bottom else false', () => {
      const tests = [
        { position: BOTTOM, result: true },
        { position: TOP, result: true },
        { position: LEFT, result: false },
        { position: RIGHT, result: false },
      ];

      tests.forEach(({ position, result }) => expect(isTopOrBottom(position)).toBe(result));
    });
  });

  describe('isLeftOrRight', () => {
    it('should return true for a positon on left or right else false', () => {
      const tests = [
        { position: BOTTOM, result: false },
        { position: TOP, result: false },
        { position: LEFT, result: true },
        { position: RIGHT, result: true },
      ];

      tests.forEach(({ position, result }) => expect(isLeftOrRight(position)).toBe(result));
    });
  });

  describe('calcDimensionsByLauncherPosition', () => {
    it('should return dimensions based on current bounds and launcherPosition based on width as the dominate dimension', () => {
      const { height, width } = bounds;
      const topOrBottomDimensions = { height, width };
      const leftOrRightDimensions = { height: width, width: height };

      expect(calcDimensionsByLauncherPosition(bounds, TOP)).toEqual(topOrBottomDimensions);
      expect(calcDimensionsByLauncherPosition(bounds, BOTTOM)).toEqual(topOrBottomDimensions);
      expect(calcDimensionsByLauncherPosition(bounds, LEFT)).toEqual(leftOrRightDimensions);
      expect(calcDimensionsByLauncherPosition(bounds, RIGHT)).toEqual(leftOrRightDimensions);
    });

    it('should return dimensions based on current bounds and launcherPosition based on height as the dominate dimension', () => {
      const { height, width } = bounds;
      const topOrBottomDimensions = { height: width, width: height };
      const leftOrRightDimensions = { height, width };

      expect(calcDimensionsByLauncherPosition(bounds, TOP, true)).toEqual(topOrBottomDimensions);
      expect(calcDimensionsByLauncherPosition(bounds, BOTTOM, true)).toEqual(topOrBottomDimensions);
      expect(calcDimensionsByLauncherPosition(bounds, LEFT, true)).toEqual(leftOrRightDimensions);
      expect(calcDimensionsByLauncherPosition(bounds, RIGHT, true)).toEqual(leftOrRightDimensions);
    });
  });

  describe('calcLauncherCoordinates', () => {
    const tests = [
      { autoHide: false, launcherPosition: TOP, result: { left: 592, top: 0 } },
      { autoHide: true, launcherPosition: TOP, result: { left: 592, top: -95 } },
      { autoHide: false, launcherPosition: BOTTOM, result: { left: 592, top: 997 } },
      { autoHide: true, launcherPosition: BOTTOM, result: { left: 592, top: 1092 } },
      { autoHide: false, launcherPosition: LEFT, result: { left: 0, top: 498.5 } },
      { autoHide: true, launcherPosition: LEFT, result: { left: -195, top: 498.5 } },
      { autoHide: false, launcherPosition: RIGHT, result: { left: 1184, top: 498.5 } },
      { autoHide: true, launcherPosition: RIGHT, result: { left: 1379, top: 498.5 } },
    ];

    tests.forEach(({ autoHide, launcherPosition, result }) =>
      expect(calcLauncherCoordinates(dimensions, monitorInfo, launcherPosition, autoHide)).toEqual(result),
    );
  });

  describe('calcLauncherPosition', () => {
    const invertedBoundsDimensions = { height: bounds.width, width: bounds.height };
    const tests = [
      { autoHide: false, launcherPosition: TOP, result: { ...bounds, left: 592, top: 0 } },
      { autoHide: true, launcherPosition: TOP, result: { ...bounds, left: 592, top: -95 } },
      { autoHide: false, launcherPosition: BOTTOM, result: { ...bounds, left: 592, top: 997 } },
      { autoHide: true, launcherPosition: BOTTOM, result: { ...bounds, left: 592, top: 1092 } },
      { autoHide: false, launcherPosition: LEFT, result: { ...invertedBoundsDimensions, left: 0, top: 448.5 } },
      { autoHide: true, launcherPosition: LEFT, result: { ...invertedBoundsDimensions, left: -95, top: 448.5 } },
      { autoHide: false, launcherPosition: RIGHT, result: { ...invertedBoundsDimensions, left: 1284, top: 448.5 } },
      { autoHide: true, launcherPosition: RIGHT, result: { ...invertedBoundsDimensions, left: 1379, top: 448.5 } },
    ];

    tests.forEach(({ autoHide, launcherPosition, result }) => expect(calcLauncherPosition(bounds, monitorInfo, launcherPosition, autoHide)).toEqual(result));
  });
});
