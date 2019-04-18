import { normalizeData } from '../../utils/reduxHelpers';
import { getUniqueWindowId } from '../windows/utils';
import {
  addContextToChannel,
  addMemberToChannel,
  addWindowToChannel,
  getChannels,
  removeMemberFromChannel,
  removeWindowFromChannel,
  setActiveChannelId,
  updateMembersById,
} from './actions';
import { ChannelsActions, ChannelsState } from './types';

const defaultState: ChannelsState = {
  activeId: null,
  byId: {},
  contextsById: {},
  ids: [],
  membersById: {},
  membersChannels: {},
};

export default (state: ChannelsState = defaultState, action: ChannelsActions): ChannelsState => {
  switch (action.type) {
    case addContextToChannel.toString(): {
      const { contextsById } = state;
      const { channelId, context } = action.payload;

      const contexts = contextsById[channelId] || [];

      return {
        ...state,
        contextsById: {
          ...contextsById,
          [channelId]: [...contexts, context],
        },
      };
    }
    case addMemberToChannel.toString(): {
      const { channelId, identity } = action.payload;
      const { membersChannels, membersById } = state;
      const memberId = getUniqueWindowId(identity);
      const currentChannelId = membersChannels[memberId];

      if (currentChannelId === channelId) {
        return state;
      }

      // new member window
      if (!currentChannelId) {
        return {
          ...state,
          membersById: {
            ...membersById,
            [channelId]: [...membersById[channelId], identity],
          },
          membersChannels: {
            ...membersChannels,
            [memberId]: channelId,
          },
        };
      }

      const members = membersById[currentChannelId] || [];
      const index = members.findIndex(member => getUniqueWindowId(member) === memberId);

      // never right now - this may mean new channel created
      if (index === -1) {
        return state;
      }

      return {
        ...state,
        membersById: {
          ...state.membersById,
          [channelId]: [...membersById[channelId], identity],
          [currentChannelId]: [...members.slice(0, index), ...members.slice(index + 1)],
        },
        membersChannels: {
          ...membersChannels,
          [memberId]: channelId,
        },
      };
    }
    case removeMemberFromChannel.toString(): {
      const { identity } = action.payload;
      const { membersById, membersChannels } = state;
      const memberId = getUniqueWindowId(identity);
      const channelId = membersChannels[memberId];

      // Not all windows are necessarily tracked
      if (!channelId) {
        return state;
      }

      const nextMembersChannels = { ...membersChannels };
      delete nextMembersChannels[memberId];

      const members = membersById[channelId];
      const index = members.findIndex(member => getUniqueWindowId(member) === memberId);

      return {
        ...state,
        membersById: {
          ...membersById,
          [channelId]: [...members.slice(0, index), ...members.slice(index + 1)],
        },
        membersChannels: nextMembersChannels,
      };
    }
    case updateMembersById.toString():
    case addWindowToChannel.request.toString(): {
      const { membersById, membersChannels } = state;
      const { currentId, nextId, identity } = action.payload;
      const { uuid, name } = identity;
      const memberId = getUniqueWindowId(identity);

      const currentChannel = membersById[currentId];
      if (!currentChannel) {
        return state;
      }
      const currentIndex = currentChannel.findIndex(currentMember => currentMember.uuid === uuid && currentMember.name === name);
      if (currentIndex === -1) {
        return state;
      }
      const member = currentChannel[currentIndex];

      return {
        ...state,
        membersById: {
          ...membersById,
          [currentId]: [...currentChannel.slice(0, currentIndex), ...currentChannel.slice(currentIndex + 1)],
          [nextId]: [...membersById[nextId], member],
        },
        membersChannels: {
          ...membersChannels,
          [memberId]: nextId,
        },
      };
    }
    case removeWindowFromChannel.request.toString(): {
      const { membersById, membersChannels } = state;
      const { id, identity } = action.payload;
      const { uuid, name } = identity;
      const memberId = getUniqueWindowId(identity);

      const globalChannel = membersById.global || [];

      const currentChannel = membersById[id];
      if (!currentChannel) {
        return state;
      }
      const currentIndex = currentChannel.findIndex(currentMember => currentMember.uuid === uuid && currentMember.name === name);
      if (currentIndex === -1) {
        return state;
      }
      const member = currentChannel[currentIndex];

      return {
        ...state,
        membersById: {
          ...state.membersById,
          global: [...globalChannel, member],
          [id]: [...currentChannel.slice(0, currentIndex), ...currentChannel.slice(currentIndex + 1)],
        },
        membersChannels: {
          ...membersChannels,
          [memberId]: 'global',
        },
      };
    }
    case getChannels.success.toString(): {
      const { channels, membersById } = action.payload;
      const defaultMembersChannels: ChannelsState['membersChannels'] = {};
      const membersChannels = Object.keys(membersById).reduce((acc, channelId) => {
        const members = membersById[channelId];

        members.forEach(member => {
          const memberId = getUniqueWindowId(member);
          acc[memberId] = channelId;
        });

        return acc;
      }, defaultMembersChannels);

      return {
        ...state,
        membersById,
        membersChannels,
        ...normalizeData(channels),
      };
    }
    case setActiveChannelId.toString(): {
      return {
        ...state,
        activeId: action.payload || null,
      };
    }
    default: {
      return state;
    }
  }
};
