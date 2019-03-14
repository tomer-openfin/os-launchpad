import { SagaIteratorClone } from '@redux-saga/testing-utils';
import { put } from 'redux-saga/effects';

export const testAsyncGeneratorsErrorCatch = (gen: SagaIteratorClone, failure) => () => {
  const failureClone = gen.clone();
  expect(failureClone.throw!('error').value).toEqual(put(failure(new Error('error'))));
  expect(failureClone.next().done).toBe(true);
};
