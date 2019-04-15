import { connect } from 'react-redux';

import { CHANNELS_WINDOW } from '../../config/windows';
import { animateChannels, getChannelsActiveId, getContextChannels, setActiveChannelId } from '../../redux/channels';
import { State } from '../../redux/types';
import { hideWindow } from '../../redux/windows';
import { MetaWithAsyncHandlers } from '../../types/commons';

import ContextManager, { Props } from './ContextManager';

interface MapState {
  activeId: ReturnType<typeof getChannelsActiveId>;
  channels: ReturnType<typeof getContextChannels>;
}

interface MapDispatch {
  animateChannels: typeof animateChannels.request;
  hideWindow: typeof hideWindow;
  setActiveChannelId: typeof setActiveChannelId;
}

const mapState = (state: State) => ({
  activeId: getChannelsActiveId(state),
  channels: getContextChannels(state),
});

const mapDispatch = { hideWindow, setActiveChannelId, animateChannels: animateChannels.request };

const mergeProps = (
  stateProps: MapState,
  { hideWindow: hideWindowDispatch, setActiveChannelId: setActiveChannelIdDispatch, animateChannels: animateChannelsDispatch }: MapDispatch,
) => ({
  ...stateProps,
  handleClose: () => {
    hideWindowDispatch({ name: CHANNELS_WINDOW });
    setActiveChannelIdDispatch(null);
    animateChannelsDispatch({ animateInstant: true });
  },
  handleEdit: (id: string | null, meta?: MetaWithAsyncHandlers) => {
    setActiveChannelIdDispatch(id);
    if (!stateProps.activeId || !id) {
      animateChannelsDispatch(undefined, meta);
    }
  },
});

export default connect<MapState, MapDispatch, null, Props, State>(
  mapState,
  mapDispatch,
  mergeProps,
)(ContextManager);
