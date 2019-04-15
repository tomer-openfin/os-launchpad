import { GLOBAL_CHANNEL_ID } from 'openfin-fdc3';
import { createSelector } from 'reselect';

import { ContextChannel } from '../../components/ContextGroupItem';
import { ContextWindowsGroup } from '../../components/ContextWindows/ContextWindows';
import { convertHexNumberToString } from '../../utils/convertHexNumberToString';
import { State } from '../types';

export const getChannelsState = (state: State) => state.channels;
export const getChannelsActiveId = (state: State) => getChannelsState(state).activeId;
export const getChannelsIds = (state: State) => getChannelsState(state).ids;
export const getChannelsById = (state: State) => getChannelsState(state).byId;
export const getChannelsContextsById = (state: State) => getChannelsState(state).contextsById;
export const getChannelsMembersById = (state: State) => getChannelsState(state).membersById;
export const getChannelsMembersChannels = (state: State) => getChannelsState(state).membersChannels;

export const getContextChannels = createSelector(
  [getChannelsIds, getChannelsById, getChannelsMembersById, getChannelsContextsById],
  (ids, byId, membersById, contextsById) => {
    return ids.reduce(
      (acc, id) => {
        if (id === GLOBAL_CHANNEL_ID) {
          return acc;
        }
        const channel = byId[id];
        const members = membersById[id] || [];
        const count = members.length;
        const contexts = contextsById[id] || [];
        const context = contexts[contexts.length - 1];
        const contextName = typeof context === 'object' && context ? (context as { name?: string }).name : '';

        return [...acc, { color: `#${convertHexNumberToString(channel.color)}`, contextName, count, id: channel.id, name: channel.name }];
      },
      [] as ContextChannel[],
    );
  },
);

export const getChannelMembersByActiveId = createSelector(
  [getChannelsActiveId, getChannelsMembersById],
  (activeId, channelMembers) => (activeId && channelMembers[activeId] ? channelMembers[activeId] : []),
);

export const getContextWindowsByGroup = createSelector(
  [getChannelsActiveId, getChannelsById, getChannelsMembersById],
  (activeId, byId, membersById) => {
    return Object.keys(membersById).reduce(
      (acc, next) => {
        if (next === activeId) {
          return acc;
        }
        const channel = byId[next];
        const members = membersById[next] || [];
        return [
          ...acc,
          {
            channel: {
              color: channel.color ? `#${convertHexNumberToString(channel.color)}` : 'transparent',
              id: channel.id,
              isGlobal: GLOBAL_CHANNEL_ID === channel.id,
              name: channel.name,
            },
            contextWindows: members,
          },
        ];
      },
      [] as ContextWindowsGroup[],
    );
  },
);

export const getContextWindowsCount = createSelector(
  [getContextWindowsByGroup],
  contextWindowsByGroup => contextWindowsByGroup.reduce((acc, next) => acc + next.contextWindows.length, 0),
);
