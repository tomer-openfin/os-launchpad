import * as React from 'react';

import MonitorControls from '../MonitorControls';
import WindowHeader from '../WindowHeader';
import { Content, Wrapper } from './MonitorControlsDialog.css';

export interface Props {
  activeId?: number | string | null;
  handleClick?: (id: string | number) => void;
  gutterSize: number;
  height: number;
  title: string;
  width: number;
}

const MonitorControlsDialog = ({ activeId, gutterSize, handleClick, height, title, width }: Props) => (
  <Wrapper>
    <WindowHeader>{title}</WindowHeader>

    <Content>
      <MonitorControls activeId={activeId} gutterSize={gutterSize} handleClick={handleClick} height={height} width={width} />
    </Content>
  </Wrapper>
);

export default MonitorControlsDialog;
