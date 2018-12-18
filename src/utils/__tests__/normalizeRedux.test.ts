import normalizeRedux from '../normalizeRedux';

describe('normalizeRedux', () => {
  it('should reduce an array to an object with byId and ids', () => {
    const data = [{
      id: 1,
      name: 'test1',
    }, {
      id: 2,
      name: 'test2',
    }, {
      id: 3,
      name: 'test3',
    }];
    const result = {
      byId: {
        [data[0].id]: data[0],
        [data[1].id]: data[1],
        [data[2].id]: data[2],
      },
      ids: [1, 2, 3],
    };

    expect(normalizeRedux(data, 'id')).toEqual(result);
  });
});
