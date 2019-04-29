import { connect } from 'react-redux';

import { addContextToChannel, getChannelsMembersById } from '../../redux/channels';
import { State } from '../../redux/types';
import { addContextListener, joinChannel } from '../../utils/openfinFdc3';
import { CHANNELS_CONTEXT_PARAM } from '../Router/consts';

import ContextSubscriber from './ContextSubscriber';

const mapState = (state: State) => ({
  membersById: getChannelsMembersById(state),
});

const mapDispatch = { addContextToChannel };

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const channelId = ownProps.match.params[CHANNELS_CONTEXT_PARAM.replace(':', '')];
  const members = stateProps.membersById[channelId] || [];

  return {
    addContextListener,
    channelId,
    handleChangeContext: (context: unknown) => dispatchProps.addContextToChannel({ context, channelId }),
    joinChannel,
    members,
  };
};

export default connect(
  mapState,
  mapDispatch,
  mergeProps,
)(ContextSubscriber);
