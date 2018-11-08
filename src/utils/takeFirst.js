import { call, fork, take } from 'redux-saga/effects';

export default (pattern, saga, ...args) =>
  fork(function*() {
    while (true) {
      const action = yield take(pattern);
      // TypeScript compile error on call with unknown number of args
      // This is why its a JS file
      // takeFirst may be included in redux-saga@1.0.0
      yield call(saga, ...args.concat(action));
    }
  });
