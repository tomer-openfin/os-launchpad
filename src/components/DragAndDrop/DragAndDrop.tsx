import * as React from 'react';
import {
  ConnectDragSource,
  ConnectDropTarget,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd';
import { findDOMNode } from 'react-dom';

import { Orientation, XYCoord } from '../../types/commons';

export interface Props {
  children?: React.ReactNode;
  dragDisabled?: boolean;
  id: string;
  index: number;
  moveSource: (dragIndex: number, hoverIndex: number) => void;
  orientation: Orientation;
  endSource?: () => void;
  startSource?: () => void;
  styles?: React.CSSProperties;
}

const defaultProps: Partial<Props> = {
  styles: {},
};

interface SourceCollectedProps {
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
}

interface TargetCollectedProps {
  connectDropTarget: ConnectDropTarget;
}

const dndSource = {
  beginDrag(props: Props) {
    const { id, index, startSource } = props;

    if (startSource) {
      startSource();
    }

    return {
      id,
      index,
    };
  },
  canDrag(props: Props) {
    return !props.dragDisabled;
  },
  endDrag(props: Props) {
    const { endSource } = props;
    if (endSource) {
      endSource();
    }
  },
};

const dndTarget = {
  hover(props: Props, monitor: DropTargetMonitor, component: React.ReactInstance | null) {
    const { dragDisabled, index: hoverIndex, orientation } = props;
    if (!component || dragDisabled) {
      return null;
    }

    const dragIndex = monitor.getItem().index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    const isHorizontal = orientation === Orientation.Horizontal;

    // Determine rectangle on screen
    const hoverBoundingRect = (findDOMNode(component) as Element).getBoundingClientRect();
    const hoverMainCoord = isHorizontal ? hoverBoundingRect.right : hoverBoundingRect.bottom;
    const hoverSecondaryCoord = isHorizontal ? hoverBoundingRect.left : hoverBoundingRect.top;

    // Get vertical middle
    const hoverMiddle = (hoverMainCoord - hoverSecondaryCoord) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    const clientOffsetCoord = isHorizontal ? (clientOffset as XYCoord).x : (clientOffset as XYCoord).y;

    // Get pixels to the top
    const hoverClient = clientOffsetCoord - hoverSecondaryCoord;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging further from origin
    if (dragIndex < hoverIndex && hoverClient < hoverMiddle) {
      return;
    }

    // Dragging close to origin
    if (dragIndex > hoverIndex && hoverClient > hoverMiddle) {
      return;
    }

    // Time to actually perform the action
    props.moveSource(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;

    return;
  },
};

class DragAndDrop extends React.Component<Props & SourceCollectedProps & TargetCollectedProps> {
  render() {
    const { children, isDragging, connectDragSource, connectDropTarget, styles = defaultProps.styles } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(<div style={{ display: 'inline-block', lineHeight: 0, ...styles, opacity }}>{children}</div>));
  }
}

export default DropTarget<Props, TargetCollectedProps>('draggable', dndTarget, (connect: DropTargetConnector) => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource<Props, SourceCollectedProps>('draggable', dndSource, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(DragAndDrop),
);
