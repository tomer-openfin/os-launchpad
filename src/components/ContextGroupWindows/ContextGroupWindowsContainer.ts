import { connect } from 'react-redux';

import { addWindowToChannel, getChannelMembersByActiveId, getChannelsActiveId, removeWindowFromChannel } from '../../redux/channels';
import { State } from '../../redux/types';
import { Identity } from '../../types/commons';

import withRenderPrevention, { PreventRenderProps } from '../../hocs/withRenderPrevention';
import ContextGroupWindows, { Props } from './ContextGroupWindows';

interface MapState {
  activeId: ReturnType<typeof getChannelsActiveId>;
  contextWindows: ReturnType<typeof getChannelMembersByActiveId>;
}

interface MapDispatch {
  addWindowToChannel: typeof addWindowToChannel.request;
  removeWindowFromChannel: typeof removeWindowFromChannel.request;
}

interface OwnProps {
  className?: string;
}

const mapState = (state: State) => ({
  activeId: getChannelsActiveId(state),
  contextWindows: getChannelMembersByActiveId(state),
});

const mapDispatch = { removeWindowFromChannel: removeWindowFromChannel.request, addWindowToChannel: addWindowToChannel.request };

const mergeProps = (stateProps: MapState, dispatchProps: MapDispatch, ownProps: OwnProps) => {
  return {
    ...ownProps,
    contextWindows: stateProps.contextWindows,
    handleDrop: (uuid: string, name: string, id: string) =>
      dispatchProps.addWindowToChannel({ identity: { uuid, name }, nextId: stateProps.activeId || '', currentId: id }),
    handleRemove: (identity: Identity) => dispatchProps.removeWindowFromChannel({ id: stateProps.activeId || '', identity }),
    preventRender: !stateProps.activeId,
  };
};

export default connect<MapState, MapDispatch, OwnProps, PreventRenderProps & Props, State>(
  mapState,
  mapDispatch,
  mergeProps,
)(withRenderPrevention(ContextGroupWindows));
