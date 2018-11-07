/**
 * No operator singleton
 * @public
 */
const noop = () => {
  return;
};

export const noopCreator = () => noop;

export default noop;
