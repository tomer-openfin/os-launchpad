import { Channel, Identity } from '../../types/commons';
import { createAction, createAsyncActionCreators } from '../utils';
import { ContextMembersById, UpdateMembersByIdPayload } from './types';

const ADD_CONTEXT_TO_CHANNEL = 'ADD_CONTEXT_TO_CHANNEL';
const ADD_MEMBER_TO_CHANNEL = 'ADD_MEMBER_TO_CHANNEL';
const REMOVE_MEMBER_FROM_CHANNEL = 'REMOVE_MEMBER_FROM_CHANNEL';
const SET_ACTIVE_CHANNEL_ID = 'SET_ACTIVE_CHANNEL_ID';
const UPDATE_MEMBERS_BY_ID = 'UPDATE_MEMBERS_BY_ID';

const ANIMATE_CHANNELS_REQUEST = 'ANIMATE_CHANNELS_REQUEST';
const ANIMATE_CHANNELS_SUCCESS = 'ANIMATE_CHANNELS_SUCCESS';
const ANIMATE_CHANNELS_FAILURE = 'ANIMATE_CHANNELS_FAILURE';

const GET_CHANNELS_REQUEST = 'GET_CHANNELS_REQUEST';
const GET_CHANNELS_SUCCESS = 'GET_CHANNELS_SUCCESS';
const GET_CHANNELS_FAILURE = 'GET_CHANNELS_FAILURE';

const ADD_WINDOW_TO_CHANNEL_REQUEST = 'ADD_WINDOW_TO_CHANNEL_REQUEST';
const ADD_WINDOW_TO_CHANNEL_SUCCESS = 'ADD_WINDOW_TO_CHANNEL_SUCCESS';
const ADD_WINDOW_TO_CHANNEL_FAILURE = 'ADD_WINDOW_TO_CHANNEL_FAILURE';

const REMOVE_WINDOW_FROM_CHANNEL_REQUEST = 'REMOVE_WINDOW_FROM_CHANNEL_REQUEST';
const REMOVE_WINDOW_FROM_CHANNEL_SUCCESS = 'REMOVE_WINDOW_FROM_CHANNEL_SUCCESS';
const REMOVE_WINDOW_FROM_CHANNEL_FAILURE = 'REMOVE_WINDOW_FROM_CHANNEL_FAILURE';

export const addContextToChannel = createAction(ADD_CONTEXT_TO_CHANNEL)<{ channelId: string; context: unknown }>();
export const addMemberToChannel = createAction(ADD_MEMBER_TO_CHANNEL)<{ appName: string; channelId: string; identity: Identity }>();
export const removeMemberFromChannel = createAction(REMOVE_MEMBER_FROM_CHANNEL)<{ identity: Identity }>();

export const setActiveChannelId = createAction(SET_ACTIVE_CHANNEL_ID)<string | null | void, { immediate?: boolean }>();

export const updateMembersById = createAction(UPDATE_MEMBERS_BY_ID)<UpdateMembersByIdPayload>();

export const animateChannels = createAsyncActionCreators(ANIMATE_CHANNELS_REQUEST, ANIMATE_CHANNELS_SUCCESS, ANIMATE_CHANNELS_FAILURE)<
  { animateInstant: boolean } | void,
  void,
  Error
>();

export const getChannels = createAsyncActionCreators(GET_CHANNELS_REQUEST, GET_CHANNELS_SUCCESS, GET_CHANNELS_FAILURE)<
  void,
  { channels: Channel[]; membersById: ContextMembersById },
  Error
>();

export const removeWindowFromChannel = createAsyncActionCreators(ADD_WINDOW_TO_CHANNEL_REQUEST, ADD_WINDOW_TO_CHANNEL_SUCCESS, ADD_WINDOW_TO_CHANNEL_FAILURE)<
  { id: string; identity: Identity },
  void,
  Error
>();

export const addWindowToChannel = createAsyncActionCreators(
  REMOVE_WINDOW_FROM_CHANNEL_REQUEST,
  REMOVE_WINDOW_FROM_CHANNEL_SUCCESS,
  REMOVE_WINDOW_FROM_CHANNEL_FAILURE,
)<UpdateMembersByIdPayload, void, Error>();
