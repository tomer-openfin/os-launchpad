interface NormalizedData<Data> {
  byId: {
    [id: string]: Data,
  };
  ids: string[];
}

function generateUuid() {
  return Math.random().toString(36).slice(2);
}

/**
 * Reduces an array of data by key to the NormalizedData shape.
 *
 * @param data - Data to be normalized
 * @param key - key to normalize off of
 *
 * @returns {NormalizedData<T>}
 */
export default function normalizeRedux<T = object>(data: T[], key: string) {
  return data.reduce((acc: NormalizedData<T>, entry) => {
    // If data has no key generateUuid as fallback key
    const id = entry[key] || generateUuid();

    if (id !== undefined) {
      acc.byId[id] = entry;
      acc.ids.push(id);
    }

    return acc;
  }, { byId: {}, ids: [] });
}
