import { addEventListener, getChannel } from 'openfin-fdc3';
import { all, put } from 'redux-saga/effects';

import { CHANNELS_CONTEXT_PARAM } from '../../components/Router/consts';
import { polymorphicWindows } from '../../config/windows';
import { Channel, Identity, OpenFinWindow } from '../../types/commons';
import getOwnUuid from '../../utils/getOwnUuid';
import { getWindowIsShowingOrGrouped, wrapApplication, wrapWindow } from '../../utils/openfinPromises';
import promisifyOpenfin from '../../utils/promisifyOpenfin';
import { Manifest } from '../application/types';
import { launchWindow } from '../windows';
import { addMemberToChannel, removeMemberFromChannel } from './actions';
import { ContextMember, ContextMembersById } from './types';

export const bindChannelMemberListeners = async (identity: Identity) => {
  const { name, uuid } = identity;
  const finWindow = await wrapWindow({ uuid, name: name || '' });

  const shownHandler = async () => {
    const finApp = fin.desktop.Application.wrap(identity.uuid);
    const [manifest, channel] = await Promise.all([promisifyOpenfin<Manifest>(finApp, 'getManifest'), getChannel(identity)]);
    window.store.dispatch(addMemberToChannel({ appName: manifest.startup_app.name || '', channelId: channel.id, identity }));
  };
  const hiddenHandler = async () => {
    const group = await promisifyOpenfin<OpenFinWindow[]>(finWindow, 'getGroup');
    if (group.length) {
      return;
    }
    window.store.dispatch(removeMemberFromChannel({ identity }));
  };
  const closedHandler = () => {
    window.store.dispatch(removeMemberFromChannel({ identity }));
    finWindow.removeEventListener('shown', shownHandler);
    finWindow.removeEventListener('hidden', hiddenHandler);
    finWindow.removeEventListener('closed', closedHandler);
  };

  finWindow.addEventListener('shown', shownHandler);
  finWindow.addEventListener('hidden', hiddenHandler);
  finWindow.addEventListener('closed', closedHandler);
};

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

export const getAppNamesAndIsShowingWindows = (members: Identity[]) => {
  return Promise.all(
    members.map(async member => {
      const finApp = fin.desktop.Application.wrap(member.uuid);
      const finWindow = fin.desktop.Window.wrap(member.uuid, member.name || '');

      const [manifest, isShowing] = await Promise.all([promisifyOpenfin<Manifest>(finApp, 'getManifest'), getWindowIsShowingOrGrouped(finWindow)]);
      return { appName: manifest.startup_app.name as string, isShowing };
    }),
  );
};

export const generateAndBindMembersById = async (channels: Channel[], channelMembers: Identity[][]): Promise<ContextMembersById> => {
  const appNamesAndIsShowingArray: Array<Array<{ appName: string; isShowing: boolean }>> = await Promise.all(
    channelMembers.map(_ => getAppNamesAndIsShowingWindows(_)),
  );

  const reduceBase: ContextMembersById = {};
  return channelMembers.reduce((acc, next, index) => {
    const channel = channels[index];

    return {
      ...acc,
      [channel.id]: next.reduce(
        (contextMembers, identity, idx) => {
          const { appName, isShowing } = appNamesAndIsShowingArray[index][idx];

          bindChannelMemberListeners(identity);

          return isShowing ? [...contextMembers, { appName, identity }] : contextMembers;
        },
        [] as ContextMember[],
      ),
    };
  }, reduceBase);
};

export const subscribeToChannelChanged = () => {
  return addEventListener('channel-changed', async event => {
    const { identity, channel, previousChannel } = event;
    if (identity.uuid === getOwnUuid()) {
      return;
    }

    // new window
    if (!previousChannel) {
      const finApp = await wrapApplication(identity.uuid);
      const finWindow = await wrapWindow({ uuid: identity.uuid, name: identity.name || '' });
      const [manifest, isShowing] = await Promise.all([promisifyOpenfin<Manifest>(finApp, 'getManifest'), promisifyOpenfin<boolean>(finWindow, 'isShowing')]);
      if (isShowing) {
        window.store.dispatch(addMemberToChannel({ appName: manifest.startup_app.name || '', channelId: channel.id, identity }));
      }
      bindChannelMemberListeners(identity);
    }
  });
};
