import { connect } from 'react-redux';

import { addWindowToChannel, getChannelsActiveId, getContextWindowsByGroup, removeWindowFromChannel } from '../../redux/channels';
import { State } from '../../redux/types';
import { Identity } from '../../types/commons';

import withRenderPrevention, { PreventRenderProps } from '../../hocs/withRenderPrevention';
import { getContextWindowsCount } from '../../redux/selectors';
import { clearSnapshot, getSnapshotIdentity, setSnapshot } from '../../redux/snapshot';
import { getOwnIdentity } from '../../utils/getOwnUuid';
import ContextWindows, { Props } from './ContextWindows';

interface MapState {
  activeId: ReturnType<typeof getChannelsActiveId>;
  contextWindowsByGroup: ReturnType<typeof getContextWindowsByGroup>;
  contextWindowsCount: ReturnType<typeof getContextWindowsCount>;
  snapshotIdentity: Identity | null;
}

interface MapDispatch {
  addWindowToChannel: typeof addWindowToChannel.request;
  clearSnapshot: typeof clearSnapshot;
  removeWindowFromChannel: typeof removeWindowFromChannel.request;
  setSnapshot: typeof setSnapshot;
}

const mapState = (state: State) => ({
  activeId: getChannelsActiveId(state),
  contextWindowsByGroup: getContextWindowsByGroup(state),
  contextWindowsCount: getContextWindowsCount(state),
  snapshotIdentity: getSnapshotIdentity(state),
});

const mapDispatch = { addWindowToChannel: addWindowToChannel.request, clearSnapshot, removeWindowFromChannel: removeWindowFromChannel.request, setSnapshot };

const mergeProps = (stateProps: MapState, dispatchProps: MapDispatch) => {
  const { snapshotIdentity } = stateProps;
  return {
    contextWindowsByGroup: stateProps.contextWindowsByGroup,
    handleAdd: (identity: Identity, id: string) => {
      if (snapshotIdentity && snapshotIdentity.uuid === identity.uuid && snapshotIdentity.name === identity.name) {
        dispatchProps.clearSnapshot();
      }
      dispatchProps.addWindowToChannel({ identity, nextId: stateProps.activeId || '', currentId: id });
    },
    handleDrop: (uuid: string, name: string) => {
      dispatchProps.removeWindowFromChannel({ id: stateProps.activeId || '', identity: { uuid, name } });
    },
    handleSnapshot: (identity: Identity) => {
      if (snapshotIdentity && snapshotIdentity.uuid === identity.uuid && snapshotIdentity.name === identity.name) {
        dispatchProps.clearSnapshot();
      } else {
        dispatchProps.setSnapshot({ anchorIdentity: getOwnIdentity(), snapshotIdentity: identity });
      }
    },
    isEmpty: !stateProps.contextWindowsCount,
    preventRender: !stateProps.activeId,
    snapshotIdentity,
  };
};

export default connect<MapState, MapDispatch, null, PreventRenderProps & Props, State>(
  mapState,
  mapDispatch,
  mergeProps,
)(withRenderPrevention(ContextWindows));
