import { Window } from '@giantmachines/redux-openfin';
import { getAllChannels, getChannelMembers, GLOBAL_CHANNEL_ID, joinChannel } from 'openfin-fdc3';
import { all, call, delay, put, select, spawn, takeEvery } from 'redux-saga/effects';

import { getContextManagerHeight } from '../../components/ContextManager';
import { EXPANED_HEIGHT, MAIN_WIDTH, SIDE_WIDTH } from '../../components/ContextManager/ContextManager';
import { CHANNELS_WINDOW } from '../../config/windows';
import { UnPromisfy } from '../../types/utils';
import { getFinWindowByName } from '../../utils/getLauncherFinWindow';
import getOwnUuid from '../../utils/getOwnUuid';
import { animateWindow } from '../../utils/openfinPromises';
import { getErrorFromCatch } from '../utils';
import { addWindowToChannel, animateChannels, getChannels, removeWindowFromChannel, updateMembersById } from './actions';
import { getChannelsActiveId, getContextChannels } from './selectors';
import { createChannelContextWindows, generateAndBindMembersById, subscribeToChannelChanged } from './utils';

function* watchGetChannelsRequest() {
  try {
    const channels: UnPromisfy<ReturnType<typeof getAllChannels>> = yield call(getAllChannels);
    yield spawn(createChannelContextWindows, channels);
    const channelMembers: Array<UnPromisfy<ReturnType<typeof getChannelMembers>>> = yield all(channels.map(channel => call(getChannelMembers, channel.id)));
    const filteredChannelMembers = channelMembers.map(identities => identities.filter(identity => identity.uuid !== getOwnUuid()));

    const membersById: UnPromisfy<ReturnType<typeof generateAndBindMembersById>> = yield call(generateAndBindMembersById, channels, filteredChannelMembers);
    yield put(getChannels.success({ channels, membersById }));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getChannels.failure(error));
  }
}

function* watchGetChannelsSuccess() {
  try {
    subscribeToChannelChanged();

    yield put(animateChannels.request());
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchGetChannelsSuccess', error);
  }
}

function* watchAddWindowToChannelRequest(action: ReturnType<typeof addWindowToChannel.request>) {
  try {
    const { identity, nextId } = action.payload;

    yield call(joinChannel, nextId, identity);

    yield put(addWindowToChannel.success());
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(addWindowToChannel.failure(error, { ...action.meta, payload: action.payload }));
  }
}

function* watchAddWindowToChannelFailure(action: ReturnType<typeof addWindowToChannel.failure>) {
  try {
    const { meta } = action;
    if (!meta || !meta.payload) {
      return;
    }

    const { payload } = meta;
    yield put(updateMembersById({ identity: payload.identity, currentId: payload.nextId, nextId: payload.currentId }));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchAddWindowToChannelFailure', error);
  }
}

function* watchRemoveWindowFromChannelRequest(action: ReturnType<typeof removeWindowFromChannel.request>) {
  try {
    const { identity } = action.payload;

    yield call(joinChannel, GLOBAL_CHANNEL_ID, identity);

    yield put(removeWindowFromChannel.success());
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(removeWindowFromChannel.failure(error, { ...action.meta, payload: action.payload }));
  }
}

function* watchRemoveWindowFromChannelFailure(action: ReturnType<typeof removeWindowFromChannel.failure>) {
  try {
    const { meta } = action;
    if (!meta || !meta.payload) {
      return;
    }

    const { payload } = meta;
    yield put(updateMembersById({ identity: payload.identity, currentId: GLOBAL_CHANNEL_ID, nextId: payload.id }));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchAddWindowToChannelFailure', error);
  }
}

function* watchAnimateChannelsRequest(action: ReturnType<typeof animateChannels.request>) {
  try {
    const channelWindow: UnPromisfy<ReturnType<typeof getFinWindowByName>> = yield call(getFinWindowByName, CHANNELS_WINDOW);
    if (!channelWindow) {
      throw new Error('Could not find channel window');
    }

    const channels = yield select(getContextChannels);
    const height = getContextManagerHeight(channels.length);

    const { payload } = action;
    if (payload && payload.animateInstant) {
      yield put(Window.resizeWindow({ id: CHANNELS_WINDOW, width: MAIN_WIDTH, height }));
      return;
    }

    const activeId = yield select(getChannelsActiveId);
    const heightTransition = {
      size: {
        duration: 300,
        height: activeId ? EXPANED_HEIGHT : height,
        relative: false,
      },
    };
    const widthTransition = {
      size: {
        duration: 300,
        relative: false,
        width: activeId ? MAIN_WIDTH + SIDE_WIDTH : MAIN_WIDTH,
      },
    };

    const animationFlow = [
      call(animateWindow, channelWindow, heightTransition, { interrupt: false }),
      delay(300),
      call(animateWindow, channelWindow, widthTransition, { interrupt: false }),
    ];

    for (const step of activeId ? animationFlow : animationFlow.reverse()) {
      yield step;
    }

    yield put(animateChannels.success(undefined, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(animateChannels.failure(error, action.meta));
  }
}

export function* channelsSaga() {
  yield takeEvery(addWindowToChannel.failure, watchAddWindowToChannelFailure);
  yield takeEvery(addWindowToChannel.request, watchAddWindowToChannelRequest);
  yield takeEvery(getChannels.request, watchGetChannelsRequest);
  yield takeEvery(getChannels.success, watchGetChannelsSuccess);
  yield takeEvery(removeWindowFromChannel.failure, watchRemoveWindowFromChannelFailure);
  yield takeEvery(removeWindowFromChannel.request, watchRemoveWindowFromChannelRequest);
  yield takeEvery(animateChannels.request, watchAnimateChannelsRequest);
}
