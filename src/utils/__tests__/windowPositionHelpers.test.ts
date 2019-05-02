import { DirectionalPosition, LauncherSize } from '../../types/commons';
import { MonitorInfo } from '../../types/fin';
import { launcherSizeConfigs } from '../launcherSizeConfigs';
import { calcLauncherCoordinates, calcLauncherDimensions, calcLauncherPosition, isBottomOrRight, isLeftOrRight, isTopOrBottom } from '../windowPositionHelpers';

const { Bottom: BOTTOM, Left: LEFT, Right: RIGHT, Top: TOP } = DirectionalPosition;

const dimensions = { height: 100, width: 200 };

const monitorInfo: MonitorInfo = {
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
        left: -100,
        right: 1384,
        top: -100,
      },
      scaledRect: {
        bottom: 1097,
        left: -100,
        right: 1384,
        top: -100,
      },
    },
    availableRect: {
      bottom: 1097,
      left: -100,
      right: 1384,
      top: -100,
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
        left: -100,
        right: 1384,
        top: -100,
      },
      scaledRect: {
        bottom: 1137,
        left: -100,
        right: 1384,
        top: -100,
      },
    },
    monitorRect: {
      bottom: 1137,
      left: -100,
      right: 1384,
      top: -100,
    },
    name: 'name',
  },
  reason: 'display',
  taskBar: {
    dipRect: {
      bottom: 1137,
      left: -100,
      right: 1384,
      top: 1097,
    },
    edge: BOTTOM,
    rect: {
      bottom: 1137,
      left: -100,
      right: 1384,
      top: 1097,
    },
    scaledRect: {
      bottom: 1137,
      left: -100,
      right: 1384,
      top: 1097,
    },
  },
  virtualScreen: {
    bottom: 1137,
    dipRect: {
      bottom: 1137,
      left: -100,
      right: 1384,
      top: -100,
    },
    left: 0,
    right: 1384,
    scaledRect: {
      bottom: 1137,
      left: -100,
      right: 1384,
      top: -100,
    },
    top: 0,
  },
};

const systemDrawerSize = 140;

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

  describe('calcLauncherDimensions', () => {
    it('should return actual launcher dimensions for app count that does not exceed monitor size', () => {
      const appCount = 8;
      const launcherSizeConfig = launcherSizeConfigs[LauncherSize.Large];
      const tests = [
        { launcherPosition: TOP, result: { height: 80, width: 832 } },
        { launcherPosition: BOTTOM, result: { height: 80, width: 832 } },
        { launcherPosition: LEFT, result: { height: 832, width: 80 } },
        { launcherPosition: RIGHT, result: { height: 832, width: 80 } },
      ];

      tests.forEach(({ launcherPosition, result }) =>
        expect(calcLauncherDimensions(appCount, monitorInfo.primaryMonitor, launcherPosition, launcherSizeConfig, systemDrawerSize)).toEqual(result),
      );
    });

    it('should return maximum launcher dimensions for app count that does exceed monitor size', () => {
      const appCount = 1000;
      const launcherSizeConfig = launcherSizeConfigs[LauncherSize.Large];
      const tests = [
        { launcherPosition: TOP, result: { height: 80, width: 1392 } },
        { launcherPosition: BOTTOM, result: { height: 80, width: 1392 } },
        { launcherPosition: LEFT, result: { height: 1112, width: 80 } },
        { launcherPosition: RIGHT, result: { height: 1112, width: 80 } },
      ];

      tests.forEach(({ launcherPosition, result }) =>
        expect(calcLauncherDimensions(appCount, monitorInfo.primaryMonitor, launcherPosition, launcherSizeConfig, systemDrawerSize)).toEqual(result),
      );
    });
  });

  describe('calcLauncherCoordinates', () => {
    const tests = [
      { launcherPosition: TOP, result: { left: 542, top: -100 } },
      { launcherPosition: BOTTOM, result: { left: 542, top: 997 } },
      { launcherPosition: LEFT, result: { left: -100, top: 449 } },
      { launcherPosition: RIGHT, result: { left: 1184, top: 449 } },
    ];

    tests.forEach(({ launcherPosition, result }) => expect(calcLauncherCoordinates(dimensions, monitorInfo.primaryMonitor, launcherPosition)).toEqual(result));
  });

  describe('calcLauncherPosition', () => {
    it('should return actual launcher dimensions/position for app count that does not exceed monitor size', () => {
      const appCount = 8;
      const launcherSizeConfig = launcherSizeConfigs[LauncherSize.Large];
      const tests = [
        { launcherPosition: TOP, result: { height: 80, left: 226, top: -100, width: 832 } },
        { launcherPosition: BOTTOM, result: { height: 80, left: 226, top: 1017, width: 832 } },
        { launcherPosition: LEFT, result: { height: 832, left: -100, top: 83, width: 80 } },
        { launcherPosition: RIGHT, result: { height: 832, left: 1304, top: 83, width: 80 } },
      ];

      tests.forEach(({ launcherPosition, result }) =>
        expect(calcLauncherPosition(appCount, monitorInfo.primaryMonitor, launcherPosition, launcherSizeConfig, systemDrawerSize)).toEqual(result),
      );
    });
  });

  it('should return maximum launcher dimensions/position for app count that does exceed monitor size', () => {
    const appCount = 1000;
    const launcherSizeConfig = launcherSizeConfigs[LauncherSize.Large];
    const tests = [
      { launcherPosition: TOP, result: { height: 80, left: -54, top: -100, width: 1392 } },
      { launcherPosition: BOTTOM, result: { height: 80, left: -54, top: 1017, width: 1392 } },
      { launcherPosition: LEFT, result: { height: 1112, left: -100, top: -57, width: 80 } },
      { launcherPosition: RIGHT, result: { height: 1112, left: 1304, top: -57, width: 80 } },
    ];

    tests.forEach(({ launcherPosition, result }) =>
      expect(calcLauncherPosition(appCount, monitorInfo.primaryMonitor, launcherPosition, launcherSizeConfig, systemDrawerSize)).toEqual(result),
    );
  });
});
