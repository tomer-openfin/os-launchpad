import * as React from 'react';

type ContextListener = (context: unknown) => void;

interface Props {
  channelId: string;
  addContextListener: (listener: ContextListener) => void;
  joinChannel: (channelId: string) => void;
  handleChangeContext: ContextListener;
}

class ContextSubscriber extends React.Component<Props> {
  componentDidMount() {
    const { addContextListener, channelId, handleChangeContext, joinChannel } = this.props;
    addContextListener(handleChangeContext);
    joinChannel(channelId);
  }

  render() {
    return <div>ContextSubscriber - Channel: {this.props.channelId}</div>;
  }
}

export default ContextSubscriber;
