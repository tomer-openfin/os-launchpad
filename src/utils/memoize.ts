type SortFn<T> = (items: T[], sortkey: keyof T & string) => T[];

export const memoizeSort = <T>(sortFn: SortFn<T>): SortFn<T> => {
  let cache: { [key: string]: T[] } = {};
  let prevItems;

  return (items, sortKey) => {
    if (items !== prevItems) {
      prevItems = items;
      cache = {};
    }

    const cachedValue = cache[sortKey];

    if (cachedValue) return cachedValue;

    const sortedItems = sortFn(items, sortKey);

    cache[sortKey] = sortedItems;

    return sortedItems;
  };
};

export const memoizeSingleArg = fn => {
  const cache = {};

  return arg => {
    const cachedValue = cache[arg];

    if (cachedValue) return cachedValue;

    const result = fn(arg);

    cache[arg] = result;

    return result;
  };
};

export const memoizeOneFirstArg = fn => {
  let prevArg;
  let value;

  return (...args) => {
    const first = args[0];

    if (first !== prevArg) {
      prevArg = first;
      value = fn(...args);
    }

    return value;
  };
};

export const memoizeOneInvalidateOnOtherArgs = fn => {
  let prevRest;
  let memoized = memoizeOneFirstArg(fn);

  return (...args) => {
    const rest = args.slice(1);

    if (rest !== prevRest) {
      memoized = memoizeOneFirstArg(fn);
      prevRest = rest;
    }

    return memoized(...args);
  };
};
