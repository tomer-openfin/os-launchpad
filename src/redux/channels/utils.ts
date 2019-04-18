import { all, put } from 'redux-saga/effects';

import { CHANNELS_CONTEXT_PARAM } from '../../components/Router/consts';
import { polymorphicWindows } from '../../config/windows';
import { Channel, ChannelChangedPayload } from '../../types/commons';
import getOwnUuid from '../../utils/getOwnUuid';
import { addEventListener } from '../../utils/openfinFdc3';
import { launchWindow } from '../windows';
import { addMemberToChannel } from './actions';

export function* createChannelContextWindows(channels: Channel[]) {
  const defaultConfig = polymorphicWindows.channelsContext;

  yield all(
    channels.map(channel => {
      const { id } = channel;
      const config = {
        ...defaultConfig,
        id: `${defaultConfig.id}::${id}`,
        name: `${defaultConfig.name}::${id}`,
        url: defaultConfig.url.replace(CHANNELS_CONTEXT_PARAM, id),
      };
      return put(launchWindow(config));
    }),
  );
}

export const subscribeToChannelChanged = () => {
  return addEventListener('channel-changed', async (event: ChannelChangedPayload) => {
    const { identity, channel } = event;
    if (identity.uuid === getOwnUuid()) {
      return;
    }

    const payload = { channelId: channel.id, identity };

    window.store.dispatch(addMemberToChannel(payload));
  });
};
