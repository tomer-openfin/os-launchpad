/**
 * Wraps Openfin method with resolve as callback and errorCallback
 * @public
 *
 * @param {Object} - Openfin instance or class
 * @param {string} - method name
 * @param {*[]} - array of arguments
 *
 * @returns {Promise<*>}
 */
export default <P = undefined>(instance: {}, method: string, ...args): Promise<P> =>
  new Promise((resolve, reject) => instance[method](...args, resolve, reject));
