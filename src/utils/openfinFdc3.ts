import { Channel, ChannelId, Identity } from '../types/commons';
import noop from './noop';
import { isStorybookEnv, isTestEnv } from './processHelpers';

const isNotFin = isTestEnv() || isStorybookEnv();

interface ContextListener {
  handler: (context) => void;
  /**
   * Unsubscribe the listener object.
   */
  unsubscribe: () => void;
}
interface ChannelChangedPayload {
  identity: Identity;
  channel: Channel;
  previousChannel?: Channel;
}
declare type ChannelChangedListener = (event: ChannelChangedPayload) => void;

const mockAddContextListener = (handler: (context) => void): ContextListener => ({ handler, unsubscribe: noop });
const mockAddEventListener = (event: 'channel-changed', listener: ChannelChangedListener, identity?: Identity) => {
  return;
};
// tslint:disable-next-line:no-any
const mockBroadcast = (context: any) => {
  return;
};
const mockGetAllChannels = (): Promise<Channel[]> => Promise.resolve([]);
const mockGetChannelMembers = (): Promise<Identity[]> => Promise.resolve([]);
const mockGetChannel = (identity?: Identity) =>
  Promise.resolve({
    color: 0xffffff,
    id: 'global',
    name: 'global',
    type: 'global',
  });
const MOCK_GLOBAL_CHANNEL_ID: ChannelId = 'global';
const mockJoinChannel = (id: string, identity?: Identity) => Promise.resolve();

/**
 * The reason for this file is because when openfin-fdc3 is imported
 * it does setup speficially for openfin applications with window.fin available.
 * This will break the testing suites and storybook, so as a result,
 * only import the openfin-fdc3 lib when in an openfin environment
 */
// tslint:disable:no-var-requires
export const addEventListener = isNotFin ? mockAddEventListener : require('openfin-fdc3').addEventListener;
export const addContextListener = isNotFin ? mockAddContextListener : require('openfin-fdc3').addContextListener;
export const broadcast = isNotFin ? mockBroadcast : require('openfin-fdc3').broadcast;
export const getAllChannels = isNotFin ? mockGetAllChannels : require('openfin-fdc3').getAllChannels;
export const getChannelMembers = isNotFin ? mockGetChannelMembers : require('openfin-fdc3').getChannelMembers;
export const getChannel = isNotFin ? mockGetChannel : require('openfin-fdc3').getChannel;
export const GLOBAL_CHANNEL_ID: ChannelId = isNotFin ? MOCK_GLOBAL_CHANNEL_ID : require('openfin-fdc3').GLOBAL_CHANNEL_ID;
export const joinChannel = isNotFin ? mockJoinChannel : require('openfin-fdc3').joinChannel;
// tslint:enable:no-var-requires
