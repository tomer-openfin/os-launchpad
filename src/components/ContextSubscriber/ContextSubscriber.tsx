import * as React from 'react';

import { Identity } from '../../types/fin';
import { broadcast } from '../../utils/openfinFdc3';

type ContextListener = (context: unknown) => void;

interface Props {
  channelId: string;
  addContextListener: (listener: ContextListener) => void;
  joinChannel: (channelId: string) => void;
  handleChangeContext: ContextListener;
  members: Identity[];
}

class ContextSubscriber extends React.Component<Props> {
  componentDidMount() {
    const { addContextListener, channelId, handleChangeContext, joinChannel } = this.props;
    addContextListener(handleChangeContext);
    joinChannel(channelId);
  }

  componentDidUpdate(prevProps: Props) {
    // TODO - handling history should probably be on the fdc3-service eventually
    //      - remove once history is handled by the service
    // If members goes down to 0, reset channel to empty state
    if (!!prevProps.members.length && !this.props.members.length) {
      broadcast(undefined);
    }
  }

  render() {
    return <div>ContextSubscriber - Channel: {this.props.channelId}</div>;
  }
}

export default ContextSubscriber;
