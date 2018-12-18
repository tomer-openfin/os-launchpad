import noop from '../noop';

describe('noop', () => {
  it('should do absolutely nothing', () => {
    expect(noop()).toEqual(undefined);
  });
});
