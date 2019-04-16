import { connect } from 'react-redux';

import { addContextToChannel } from '../../redux/channels';
import { addContextListener, joinChannel } from '../../utils/openfinFdc3';
import { CHANNELS_CONTEXT_PARAM } from '../Router/consts';

import ContextSubscriber from './ContextSubscriber';

const mapDispatch = { addContextToChannel };

const mergeProps = (_, dispatchProps, ownProps) => {
  const channelId = ownProps.match.params[CHANNELS_CONTEXT_PARAM.replace(':', '')];

  return {
    addContextListener,
    channelId,
    handleChangeContext: (context: unknown) => dispatchProps.addContextToChannel({ context, channelId }),
    joinChannel,
  };
};

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(ContextSubscriber);
