import { DirectionalPosition } from '../../types/commons';
import {
  calcDimensionsByLauncherPosition,
  calcLauncherCoordinates,
  calcLauncherDimensions,
  calcLauncherPosition,
  isBottomOrRight,
  isLeftOrRight,
  isTopOrBottom,
} from '../windowPositionHelpers';

const { Bottom: BOTTOM, Left: LEFT, Right: RIGHT, Top: TOP } = DirectionalPosition;

const dimensions = { height: 100, width: 200 };
const bounds = {
  ...dimensions,
  left: 0,
  top: 0,
};

const monitorInfo = {
  deviceScaleFactor: 0,
  dpi: {
    x: 0,
    y: 0,
  },
  nonPrimaryMonitors: [],
  primaryMonitor: {
    available: {
      dipRect: {
        bottom: 1097,
        left: 0,
        right: 1384,
        top: 0,
      },
      scaledRect: {
        bottom: 1097,
        left: 0,
        right: 1384,
        top: 0,
      },
    },
    availableRect: {
      bottom: 1097,
      left: 0,
      right: 1384,
      top: 0,
    },
    deviceId: 'test-device',
    deviceScaleFactor: 1,
    displayDeviceActive: true,
    dpi: {
      x: 0,
      y: 0,
    },
    monitor: {
      dipRect: {
        bottom: 1137,
        left: 0,
        right: 1384,
        top: 0,
      },
      scaledRect: {
        bottom: 1137,
        left: 0,
        right: 1384,
        top: 0,
      },
    },
    monitorRect: {
      bottom: 1137,
      left: 0,
      right: 1384,
      top: 0,
    },
    name: 0,
  },
  reason: 'display',
  taskBar: {
    dipRect: {
      bottom: 1137,
      left: 0,
      right: 1384,
      top: 1097,
    },
    edge: BOTTOM,
    rect: {
      bottom: 1137,
      left: 0,
      right: 1384,
      top: 1097,
    },
    scaledRect: {
      bottom: 1137,
      left: 0,
      right: 1384,
      top: 1097,
    },
  },
  virtualScreen: {
    bottom: 1137,
    dipRect: {
      bottom: 1137,
      left: 0,
      right: 1384,
      top: 0,
    },
    left: 0,
    right: 1384,
    scaledRect: {
      bottom: 1137,
      left: 0,
      right: 1384,
      top: 0,
    },
    top: 0,
  },
};

const SYSTEM_ICONS = [
  {
    action: { type: 'FAKE_TEST_TYPE' },
    hasExtendedWindow: false,
    icon: 'testIcon',
    isShownByDefault: true,
    title: 'testIcon',
  },
  {
    action: { type: 'FAKE_MOCK_TYPE' },
    hasExtendedWindow: true,
    icon: 'mockIcon',
    isShownByDefault: false,
    title: 'mockIcon',
  },
];

describe('windowPositionHelpers', () => {
  describe('isTopOrBottom', () => {
    it('should return true for a position on top or bottom, otherwise false', () => {
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
    it('should return true for a position on left or right, otherwise false', () => {
      const tests = [
        { position: BOTTOM, result: false },
        { position: TOP, result: false },
        { position: LEFT, result: true },
        { position: RIGHT, result: true },
      ];

      tests.forEach(({ position, result }) => expect(isLeftOrRight(position)).toBe(result));
    });
  });

  describe('isBottomOrRight', () => {
    it('should return true for a position on bottom or right, otherwise false', () => {
      const tests = [
        { position: BOTTOM, result: true },
        { position: TOP, result: false },
        { position: LEFT, result: false },
        { position: RIGHT, result: true },
      ];

      tests.forEach(({ position, result }) => expect(isBottomOrRight(position)).toBe(result));
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

  describe('calcLauncherDimensions', () => {
    it('should return actual launcher dimensions for app count that does not exceed monitor size', () => {
      const appCount = 8;
      const tests = [
        { autoHide: false, isExpanded: false, launcherPosition: TOP, result: { height: 80, width: 738 } },
        { autoHide: false, isExpanded: true, launcherPosition: TOP, result: { height: 80, width: 738 } },
        { autoHide: true, isExpanded: false, launcherPosition: TOP, result: { height: 5, width: 738 } },
        { autoHide: true, isExpanded: true, launcherPosition: TOP, result: { height: 80, width: 738 } },
        { autoHide: false, isExpanded: false, launcherPosition: BOTTOM, result: { height: 80, width: 738 } },
        { autoHide: false, isExpanded: true, launcherPosition: BOTTOM, result: { height: 80, width: 738 } },
        { autoHide: true, isExpanded: false, launcherPosition: BOTTOM, result: { height: 5, width: 738 } },
        { autoHide: true, isExpanded: true, launcherPosition: BOTTOM, result: { height: 80, width: 738 } },
        { autoHide: false, isExpanded: false, launcherPosition: LEFT, result: { height: 738, width: 80 } },
        { autoHide: false, isExpanded: true, launcherPosition: LEFT, result: { height: 738, width: 80 } },
        { autoHide: true, isExpanded: false, launcherPosition: LEFT, result: { height: 738, width: 5 } },
        { autoHide: true, isExpanded: true, launcherPosition: LEFT, result: { height: 738, width: 80 } },
        { autoHide: false, isExpanded: false, launcherPosition: RIGHT, result: { height: 738, width: 80 } },
        { autoHide: false, isExpanded: true, launcherPosition: RIGHT, result: { height: 738, width: 80 } },
        { autoHide: true, isExpanded: false, launcherPosition: RIGHT, result: { height: 738, width: 5 } },
        { autoHide: true, isExpanded: true, launcherPosition: RIGHT, result: { height: 738, width: 80 } },
      ];

      tests.forEach(({ autoHide, isExpanded, launcherPosition, result }) =>
        expect(calcLauncherDimensions(appCount, SYSTEM_ICONS, monitorInfo, launcherPosition, autoHide, isExpanded)).toEqual(result),
      );
    });

    it('should return maximum launcher dimensions for app count that does exceed monitor size', () => {
      const appCount = 1000;
      const tests = [
        { autoHide: false, isExpanded: false, launcherPosition: TOP, result: { height: 80, width: 1298 } },
        { autoHide: false, isExpanded: true, launcherPosition: TOP, result: { height: 80, width: 1298 } },
        { autoHide: true, isExpanded: false, launcherPosition: TOP, result: { height: 5, width: 1298 } },
        { autoHide: true, isExpanded: true, launcherPosition: TOP, result: { height: 80, width: 1298 } },
        { autoHide: false, isExpanded: false, launcherPosition: BOTTOM, result: { height: 80, width: 1298 } },
        { autoHide: false, isExpanded: true, launcherPosition: BOTTOM, result: { height: 80, width: 1298 } },
        { autoHide: true, isExpanded: false, launcherPosition: BOTTOM, result: { height: 5, width: 1298 } },
        { autoHide: true, isExpanded: true, launcherPosition: BOTTOM, result: { height: 80, width: 1298 } },
        { autoHide: false, isExpanded: false, launcherPosition: LEFT, result: { height: 1018, width: 80 } },
        { autoHide: false, isExpanded: true, launcherPosition: LEFT, result: { height: 1018, width: 80 } },
        { autoHide: true, isExpanded: false, launcherPosition: LEFT, result: { height: 1018, width: 5 } },
        { autoHide: true, isExpanded: true, launcherPosition: LEFT, result: { height: 1018, width: 80 } },
        { autoHide: false, isExpanded: false, launcherPosition: RIGHT, result: { height: 1018, width: 80 } },
        { autoHide: false, isExpanded: true, launcherPosition: RIGHT, result: { height: 1018, width: 80 } },
        { autoHide: true, isExpanded: false, launcherPosition: RIGHT, result: { height: 1018, width: 5 } },
        { autoHide: true, isExpanded: true, launcherPosition: RIGHT, result: { height: 1018, width: 80 } },
      ];

      tests.forEach(({ autoHide, isExpanded, launcherPosition, result }) =>
        expect(calcLauncherDimensions(appCount, SYSTEM_ICONS, monitorInfo, launcherPosition, autoHide, isExpanded)).toEqual(result),
      );
    });
  });

  describe('calcLauncherCoordinates', () => {
    const tests = [
      { launcherPosition: TOP, result: { left: 592, top: 0 } },
      { launcherPosition: BOTTOM, result: { left: 592, top: 997 } },
      { launcherPosition: LEFT, result: { left: 0, top: 499 } },
      { launcherPosition: RIGHT, result: { left: 1184, top: 499 } },
    ];

    tests.forEach(({ launcherPosition, result }) => expect(calcLauncherCoordinates(dimensions, monitorInfo, launcherPosition)).toEqual(result));
  });

  describe('calcLauncherPosition', () => {
    it('should return actual launcher dimensions/position for app count that does not exceed monitor size', () => {
      const appCount = 8;
      const tests = [
        { autoHide: false, isExpanded: false, launcherPosition: TOP, result: { height: 80, left: 323, top: 0, width: 738 } },
        { autoHide: false, isExpanded: true, launcherPosition: TOP, result: { height: 80, left: 323, top: 0, width: 738 } },
        { autoHide: true, isExpanded: false, launcherPosition: TOP, result: { height: 5, left: 323, top: 0, width: 738 } },
        { autoHide: true, isExpanded: true, launcherPosition: TOP, result: { height: 80, left: 323, top: 0, width: 738 } },
        { autoHide: false, isExpanded: false, launcherPosition: BOTTOM, result: { height: 80, left: 323, top: 1017, width: 738 } },
        { autoHide: false, isExpanded: true, launcherPosition: BOTTOM, result: { height: 80, left: 323, top: 1017, width: 738 } },
        { autoHide: true, isExpanded: false, launcherPosition: BOTTOM, result: { height: 5, left: 323, top: 1092, width: 738 } },
        { autoHide: true, isExpanded: true, launcherPosition: BOTTOM, result: { height: 80, left: 323, top: 1017, width: 738 } },
        { autoHide: false, isExpanded: false, launcherPosition: LEFT, result: { height: 738, left: 0, top: 180, width: 80 } },
        { autoHide: false, isExpanded: true, launcherPosition: LEFT, result: { height: 738, left: 0, top: 180, width: 80 } },
        { autoHide: true, isExpanded: false, launcherPosition: LEFT, result: { height: 738, left: 0, top: 180, width: 5 } },
        { autoHide: true, isExpanded: true, launcherPosition: LEFT, result: { height: 738, left: 0, top: 180, width: 80 } },
        { autoHide: false, isExpanded: false, launcherPosition: RIGHT, result: { height: 738, left: 1304, top: 180, width: 80 } },
        { autoHide: false, isExpanded: true, launcherPosition: RIGHT, result: { height: 738, left: 1304, top: 180, width: 80 } },
        { autoHide: true, isExpanded: false, launcherPosition: RIGHT, result: { height: 738, left: 1379, top: 180, width: 5 } },
        { autoHide: true, isExpanded: true, launcherPosition: RIGHT, result: { height: 738, left: 1304, top: 180, width: 80 } },
      ];

      tests.forEach(({ autoHide, isExpanded, launcherPosition, result }) =>
        expect(calcLauncherPosition(appCount, SYSTEM_ICONS, monitorInfo, launcherPosition, autoHide, isExpanded)).toEqual(result),
      );
    });
  });

  it('should return maximum launcher dimensions/position for app count that does exceed monitor size', () => {
    const appCount = 1000;
    const tests = [
      { autoHide: false, isExpanded: false, launcherPosition: TOP, result: { height: 80, left: 43, top: 0, width: 1298 } },
      { autoHide: false, isExpanded: true, launcherPosition: TOP, result: { height: 80, left: 43, top: 0, width: 1298 } },
      { autoHide: true, isExpanded: false, launcherPosition: TOP, result: { height: 5, left: 43, top: 0, width: 1298 } },
      { autoHide: true, isExpanded: true, launcherPosition: TOP, result: { height: 80, left: 43, top: 0, width: 1298 } },
      { autoHide: false, isExpanded: false, launcherPosition: BOTTOM, result: { height: 80, left: 43, top: 1017, width: 1298 } },
      { autoHide: false, isExpanded: true, launcherPosition: BOTTOM, result: { height: 80, left: 43, top: 1017, width: 1298 } },
      { autoHide: true, isExpanded: false, launcherPosition: BOTTOM, result: { height: 5, left: 43, top: 1092, width: 1298 } },
      { autoHide: true, isExpanded: true, launcherPosition: BOTTOM, result: { height: 80, left: 43, top: 1017, width: 1298 } },
      { autoHide: false, isExpanded: false, launcherPosition: LEFT, result: { height: 1018, left: 0, top: 40, width: 80 } },
      { autoHide: false, isExpanded: true, launcherPosition: LEFT, result: { height: 1018, left: 0, top: 40, width: 80 } },
      { autoHide: true, isExpanded: false, launcherPosition: LEFT, result: { height: 1018, left: 0, top: 40, width: 5 } },
      { autoHide: true, isExpanded: true, launcherPosition: LEFT, result: { height: 1018, left: 0, top: 40, width: 80 } },
      { autoHide: false, isExpanded: false, launcherPosition: RIGHT, result: { height: 1018, left: 1304, top: 40, width: 80 } },
      { autoHide: false, isExpanded: true, launcherPosition: RIGHT, result: { height: 1018, left: 1304, top: 40, width: 80 } },
      { autoHide: true, isExpanded: false, launcherPosition: RIGHT, result: { height: 1018, left: 1379, top: 40, width: 5 } },
      { autoHide: true, isExpanded: true, launcherPosition: RIGHT, result: { height: 1018, left: 1304, top: 40, width: 80 } },
    ];

    tests.forEach(({ autoHide, isExpanded, launcherPosition, result }) =>
      expect(calcLauncherPosition(appCount, SYSTEM_ICONS, monitorInfo, launcherPosition, autoHide, isExpanded)).toEqual(result),
    );
  });
});
