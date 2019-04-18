import { cloneableGenerator } from '@redux-saga/testing-utils';
import { takeEvery } from 'redux-saga/effects';

import { addWindowToChannel, animateChannels, getChannels, removeWindowFromChannel } from '../actions';
import {
  channelsSaga,
  watchAddWindowToChannelFailure,
  watchAddWindowToChannelRequest,
  watchAnimateChannelsRequest,
  watchGetChannelsRequest,
  watchGetChannelsSuccess,
  watchRemoveWindowFromChannelFailure,
  watchRemoveWindowFromChannelRequest,
} from '../saga';

describe('channel/saga', () => {
  describe('channelSaga', () => {
    it('should contain the following sagas', () => {
      const iterator = cloneableGenerator(channelsSaga)();

      expect(iterator.next(addWindowToChannel.failure(new Error('error'))).value).toEqual(
        takeEvery(addWindowToChannel.failure, watchAddWindowToChannelFailure),
      );
      expect(iterator.next(addWindowToChannel.request({ currentId: '', nextId: '', identity: { uuid: '', name: '' } })).value).toEqual(
        takeEvery(addWindowToChannel.request, watchAddWindowToChannelRequest),
      );
      expect(iterator.next(getChannels.request()).value).toEqual(takeEvery(getChannels.request, watchGetChannelsRequest));
      expect(iterator.next(getChannels.success({ channels: [], membersById: {} })).value).toEqual(takeEvery(getChannels.success, watchGetChannelsSuccess));
      expect(iterator.next(removeWindowFromChannel.failure(new Error('error'))).value).toEqual(
        takeEvery(removeWindowFromChannel.failure, watchRemoveWindowFromChannelFailure),
      );
      expect(iterator.next(removeWindowFromChannel.request({ id: '', identity: { uuid: '', name: '' } })).value).toEqual(
        takeEvery(removeWindowFromChannel.request, watchRemoveWindowFromChannelRequest),
      );
      expect(iterator.next(animateChannels.request()).value).toEqual(takeEvery(animateChannels.request, watchAnimateChannelsRequest));
    });
  });
});
