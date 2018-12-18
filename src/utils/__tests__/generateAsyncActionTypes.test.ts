import generateAsyncActionTypes from '../generateAsyncActionTypes';

describe('generateAsyncActionTypes', () => {
  it('should return an object with ERROR, REQUEST, and SUCCESS', () => {
    const baseType = 'GET_DATA';
    const result = {
      ERROR: `${baseType}_ERROR`,
      REQUEST: `${baseType}_REQUEST`,
      SUCCESS: `${baseType}_SUCCESS`,
    };

    expect(generateAsyncActionTypes(baseType)).toEqual(result);
  });
});
