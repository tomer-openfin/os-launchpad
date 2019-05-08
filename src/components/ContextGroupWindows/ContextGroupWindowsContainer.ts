import { connect } from 'react-redux';

import withRenderPrevention, { PreventRenderProps } from '../../hocs/withRenderPrevention';
import { addWindowToChannel, getChannelsActiveId, removeWindowFromChannel } from '../../redux/channels';
import { getFilteredChannelMembersByActiveId } from '../../redux/selectors';
import { clearSnapshot, getSnapshotIdentity } from '../../redux/snapshot';
import { State } from '../../redux/types';
import { Identity } from '../../types/commons';

import ContextGroupWindows, { Props } from './ContextGroupWindows';

interface MapState {
  activeId: string | null;
  contextWindows: Identity[];
  snapshotIdentity: Identity | null;
}

interface MapDispatch {
  addWindowToChannel: typeof addWindowToChannel.request;
  clearSnapshot: typeof clearSnapshot;
  removeWindowFromChannel: typeof removeWindowFromChannel.request;
}

interface OwnProps {
  className?: string;
}

const mapState = (state: State) => ({
  activeId: getChannelsActiveId(state),
  contextWindows: getFilteredChannelMembersByActiveId(state),
  snapshotIdentity: getSnapshotIdentity(state),
});

const mapDispatch = { addWindowToChannel: addWindowToChannel.request, clearSnapshot, removeWindowFromChannel: removeWindowFromChannel.request };

const mergeProps = (stateProps: MapState, dispatchProps: MapDispatch, ownProps: OwnProps) => {
  const { snapshotIdentity } = stateProps;

  return {
    ...ownProps,
    contextWindows: stateProps.contextWindows,
    handleDrop: (uuid: string, name: string, id: string) => {
      if (snapshotIdentity && snapshotIdentity.uuid === uuid && snapshotIdentity.name === name) {
        dispatchProps.clearSnapshot();
      }
      dispatchProps.addWindowToChannel({ identity: { uuid, name }, nextId: stateProps.activeId || '', currentId: id });
    },

    handleRemove: (identity: Identity) => dispatchProps.removeWindowFromChannel({ id: stateProps.activeId || '', identity }),
    preventRender: !stateProps.activeId,
  };
};

export default connect<MapState, MapDispatch, OwnProps, PreventRenderProps & Props, State>(
  mapState,
  mapDispatch,
  mergeProps,
)(withRenderPrevention(ContextGroupWindows));
