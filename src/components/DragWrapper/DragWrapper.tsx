import * as React from 'react';

import { Draggable } from './DragWrapper.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  dataTransferObj: {
    channelId?: string;
    name?: string;
    uuid: string;
  };
}

interface State {
  isDragging: boolean;
}

export const DROP_ALLOWED = 'drop-allowed';

class DragWrapper extends React.Component<Props, State> {
  state = {
    isDragging: false,
  };

  handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const { dataTransferObj, onDragStart } = this.props;

    this.setState({ isDragging: true });

    e.dataTransfer.setData(DROP_ALLOWED, DROP_ALLOWED);

    Object.keys(dataTransferObj).forEach(key => {
      e.dataTransfer.setData(key, dataTransferObj[key]);
    });

    if (onDragStart) {
      onDragStart(e);
    }
  };

  handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const { onDragEnd } = this.props;

    this.setState({ isDragging: false });

    if (onDragEnd) {
      onDragEnd(e);
    }
  };

  render() {
    const { children, draggable, onDragEnd, onDragStart, ...props } = this.props;
    const { isDragging } = this.state;

    return (
      <Draggable draggable onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} isDragging={isDragging} {...props}>
        {children}
      </Draggable>
    );
  }
}

export default DragWrapper;
