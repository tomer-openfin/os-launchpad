// tslint:disable:no-bitwise

export const hashString = (...args: string[]) => {
  const stringToHash = args.join('');
  let hash = 0;
  if (stringToHash.length === 0) return hash;
  for (let i = 0; i < stringToHash.length; i++) {
    const chr = stringToHash.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
