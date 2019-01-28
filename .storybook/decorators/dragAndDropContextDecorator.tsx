import * as React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const dragDropContextDecorator = story => {
  return <DragDropContextProvider backend={HTML5Backend}>{story()}</DragDropContextProvider>;
};

export default dragDropContextDecorator;
