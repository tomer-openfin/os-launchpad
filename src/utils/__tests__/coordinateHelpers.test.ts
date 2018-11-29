import { LauncherPosition } from '../../types/commons';
import { getNewPosDelta, isPosInBounds, isPosInCoordinates } from '../coordinateHelpers';

const bounds = {
  height: 100,
  left: 0,
  top: 0,
  width: 200,
};

const coordinates = {
  bottom: 100,
  left: 10,
  right: 200,
  top: 10,
};

const VISIBILITY_DELTA = 5;

describe('coordinateHelpers', () => {
  describe('getNewPosDelta', () => {
    it('should return a position delta', () => {
      const tests = [
        {
          expand: false,
          launcherPosition: LauncherPosition.Bottom,
          result: { left: 0, top: bounds.height - VISIBILITY_DELTA },
        },
        {
          expand: true,
          launcherPosition: LauncherPosition.Bottom,
          result: { left: 0, top: VISIBILITY_DELTA - bounds.height },
        },
        {
          expand: false,
          launcherPosition: LauncherPosition.Left,
          result: { left: VISIBILITY_DELTA - bounds.width, top: 0 },
        },
        {
          expand: true,
          launcherPosition: LauncherPosition.Left,
          result: { left: bounds.width - VISIBILITY_DELTA, top: 0 },
        },
        {
          expand: false,
          launcherPosition: LauncherPosition.Right,
          result: { left: bounds.width - VISIBILITY_DELTA, top: 0 },
        },
        {
          expand: true,
          launcherPosition: LauncherPosition.Right,
          result: { left: VISIBILITY_DELTA - bounds.width, top: 0 },
        },
        {
          expand: false,
          launcherPosition: LauncherPosition.Top,
          result: { left: 0, top: VISIBILITY_DELTA - bounds.height },
        },
        {
          expand: true,
          launcherPosition: LauncherPosition.Top,
          result: { left: 0, top: bounds.height - VISIBILITY_DELTA },
        },
      ];

      tests.forEach(({ launcherPosition, expand, result }) => expect(getNewPosDelta(bounds, launcherPosition, expand, VISIBILITY_DELTA)).toEqual(result));
    });
  });

  describe('isPosInBounds', () => {
    it('should return false for positions that are out of bounds', () => {
      const pos = { left: 201, top: 101 };

      expect(isPosInBounds(pos, bounds)).toBeFalsy();
    });

    it('should return true for positions that are in bounds', () => {
      const pos = { left: 100, top: 50 };

      expect(isPosInBounds(pos, bounds)).toBeTruthy();
    });

    it('should return true for positions that are exactly on bounds border line', () => {
      const tests = [
        {
          left: 0,
          top: 0,
        },
        {
          left: 100,
          top: 100,
        },
        {
          left: 200,
          top: 50,
        },
        {
          left: 200,
          top: 100,
        },
      ];

      tests.forEach(test => expect(isPosInBounds(test, bounds)).toBeTruthy());
    });
  });

  describe('isPosInCoordinates', () => {
    it('should return false for positions that are out of coordinates', () => {
      const pos = { left: 201, top: 101 };

      expect(isPosInCoordinates(pos, coordinates)).toBeFalsy();
    });

    it('should return true for positions that are in coordinates', () => {
      const pos = { left: 100, top: 50 };

      expect(isPosInCoordinates(pos, coordinates)).toBeTruthy();
    });

    it('should return true for positions that are exactly on bounds border line', () => {
      const tests = [
        {
          left: 10,
          top: 10,
        },
        {
          left: 100,
          top: 100,
        },
        {
          left: 200,
          top: 50,
        },
        {
          left: 200,
          top: 100,
        },
      ];

      tests.forEach(test => expect(isPosInCoordinates(test, coordinates)).toBeTruthy());
    });
  });
});
