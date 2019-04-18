import { connect } from 'react-redux';

import { addWindowToChannel, getChannelsActiveId, getContextWindowsByGroup, removeWindowFromChannel } from '../../redux/channels';
import { State } from '../../redux/types';
import { Identity } from '../../types/commons';

import withRenderPrevention, { PreventRenderProps } from '../../hocs/withRenderPrevention';
import { getContextWindowsCount } from '../../redux/selectors';
import ContextWindows, { Props } from './ContextWindows';

interface MapState {
  activeId: ReturnType<typeof getChannelsActiveId>;
  contextWindowsByGroup: ReturnType<typeof getContextWindowsByGroup>;
  contextWindowsCount: ReturnType<typeof getContextWindowsCount>;
}

interface MapDispatch {
  addWindowToChannel: typeof addWindowToChannel.request;
  removeWindowFromChannel: typeof removeWindowFromChannel.request;
}

const mapState = (state: State) => ({
  activeId: getChannelsActiveId(state),
  contextWindowsByGroup: getContextWindowsByGroup(state),
  contextWindowsCount: getContextWindowsCount(state),
});

const mapDispatch = { addWindowToChannel: addWindowToChannel.request, removeWindowFromChannel: removeWindowFromChannel.request };

const mergeProps = (stateProps: MapState, dispatchProps: MapDispatch) => {
  return {
    contextWindowsByGroup: stateProps.contextWindowsByGroup,
    handleAdd: (identity: Identity, id: string) => dispatchProps.addWindowToChannel({ identity, nextId: stateProps.activeId || '', currentId: id }),
    handleDrop: (uuid: string, name: string) => dispatchProps.removeWindowFromChannel({ id: stateProps.activeId || '', identity: { uuid, name } }),
    isEmpty: !stateProps.contextWindowsCount,
    preventRender: !stateProps.activeId,
  };
};

export default connect<MapState, MapDispatch, null, PreventRenderProps & Props, State>(
  mapState,
  mapDispatch,
  mergeProps,
)(withRenderPrevention(ContextWindows));
