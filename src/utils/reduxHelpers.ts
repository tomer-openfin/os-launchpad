export interface NormalizedById<T> {
  [id: string]: T;
  [id: number]: T;
}

export type NormalizedIds = Array<string | number>;

interface NormalizedData<Data> {
  byId: NormalizedById<Data>;
  ids: NormalizedIds;
}

function generateUuid() {
  return Math.random()
    .toString(36)
    .slice(2);
}

/**
 * Reduces an array of data by key to the NormalizedData shape.
 *
 * @param data - Data to be normalized
 * @param key - key to normalize off of
 *
 * @returns {NormalizedData<T>}
 */
export function normalizeData<T>(data: T[], key: string = 'id') {
  return data.reduce(
    (acc: NormalizedData<T>, entry) => {
      // If data has no key generateUuid as fallback key
      const id = entry[key] || generateUuid();

      if (id !== undefined) {
        acc.byId[id] = entry;
        acc.ids.push(id);
      }

      return acc;
    },
    { byId: {}, ids: [] },
  );
}

export function denormalizeData<T>(ids: NormalizedIds, byId: NormalizedById<T>): T[] {
  return ids.map(id => byId[id]);
}
