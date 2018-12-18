import { call, fork, take } from 'redux-saga/effects';

export default (pattern, saga, ...args) =>
  fork(function*() {
    while (true) {
      const action = yield take(pattern);
      // takeFirst may be included in redux-saga@1.0.0
      // may be called takeLeading based on beta.1
      // https://github.com/redux-saga/redux-saga/releases/tag/v1.0.0-beta.1
      switch (args.length) {
        case 0: {
          yield call(saga, action);
          break;
        }
        case 1: {
          yield call(saga, action, args[0]);
          break;
        }
        case 2: {
          yield call(saga, action, args[0], args[1]);
          break;
        }
        case 3: {
          yield call(saga, action, args[0], args[1], args[2]);
          break;
        }
        case 4: {
          yield call(saga, action, args[0], args[1], args[2], args[3]);
          break;
        }
        case 5: {
          yield call(saga, action, args[0], args[1], args[2], args[3], args[4]);
          break;
        }
        default: {
          yield call(saga, action, args[0], args[1], args[2], args[3], args[4], ...args.slice(5));
        }
      }
    }
  });
