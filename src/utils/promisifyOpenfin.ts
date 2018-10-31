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
export default (instance: {}, method: string, ...args) =>
  new Promise(resolve => instance[method](...args, resolve, resolve));
