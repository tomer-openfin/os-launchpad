import { Channel, Identity } from '../../types/commons';
import { ActionsUnion } from '../types';
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

// Payloads
export interface UpdateMembersByIdPayload {
  currentId: string;
  nextId: string;
  identity: Identity;
}

// Reducer
export type Context = unknown;

export interface ChannelsById {
  [id: string]: Channel;
}

export interface ContextsById {
  [id: string]: Context[];
}

export interface ContextMembersById {
  [id: string]: Identity[];
}

export interface ChannelsState {
  activeId: string | null;
  byId: ChannelsById;
  contextsById: ContextsById;
  ids: string[];
  membersById: ContextMembersById;
  membersChannels: {
    [id: string]: Channel['id'];
  };
}

// Actions
export type ChannelsActions =
  | ReturnType<typeof addContextToChannel>
  | ReturnType<typeof addMemberToChannel>
  | ReturnType<typeof removeMemberFromChannel>
  | ReturnType<typeof setActiveChannelId>
  | ReturnType<typeof updateMembersById>
  | ActionsUnion<typeof getChannels>
  | ActionsUnion<typeof addWindowToChannel>
  | ActionsUnion<typeof removeWindowFromChannel>;
