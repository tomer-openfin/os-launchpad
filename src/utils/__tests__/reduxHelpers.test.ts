import { denormalizeData, normalizeData } from '../reduxHelpers';

const data = [
  {
    id: '1',
    name: 'test1',
  },
  {
    id: '2',
    name: 'test2',
  },
  {
    id: '3',
    name: 'test3',
  },
];

describe('reduxHelpers', () => {
  describe('normalizeData', () => {
    it('should reduce an array to an object with byId and ids', () => {
      const result = {
        byId: {
          [data[0].id]: data[0],
          [data[1].id]: data[1],
          [data[2].id]: data[2],
        },
        ids: ['1', '2', '3'],
      };

      expect(normalizeData(data, 'id')).toEqual(result);
    });
  });

  describe('denormalizeData', () => {
    it('should return an array of data from ids and byId', () => {
      const { ids, byId } = normalizeData(data);

      expect(denormalizeData(ids, byId)).toEqual(data);
    });
  });
});
