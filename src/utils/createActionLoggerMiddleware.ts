import { Action } from 'redux';

interface Options {
  exclude?: string[];
  include?: string[];
}

const logAction = (action: Action) => {
  // tslint:disable-next-line:no-console
  console.log('Action logger:', action);
};

/**
 * Redux middleware to log out all actions to console.
 *
 * @param {Options} - If include is passed, exclude is ignored
 *
 * @returns {Middleware}
 */
// tslint:disable-next-line:no-any
export default (options: Options = {}) => (store: any) => (next: Function) => (action: Action) => {
  // If include is provived and has at least 1 entry
  // Log out action if found, else move on
  if (options.include && options.include.length) {
    if (options.include.indexOf(action.type) !== -1) {
      logAction(action);
    }
    return next(action);
  }

  // If action type is found in exclude, do nothing and move on
  if (options.exclude && options.exclude.indexOf(action.type) !== -1) {
    return next(action);
  }

  logAction(action);
  return next(action);
};
