import * as React from 'react';

import { getCoordinatesHeight, getCoordinatesWidth } from '../../utils/coordinateHelpers';

import { Plane, StyledButtonTile } from './MonitorControls.css';

export interface MonitorScreen {
  id: number | string;
  rect: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
}

interface Props {
  activeId?: number | string | null;
  handleClick?: (id: string | number) => void;
  height: number;
  monitorScreens: MonitorScreen[];
  width: number;
}

const MonitorControls = ({ activeId, handleClick, height, monitorScreens, width }: Props) => (
  <Plane height={height} width={width}>
    {monitorScreens.map(({ id, rect }) => {
      const handleButtonClick = handleClick ? () => handleClick(id) : undefined;
      const { left, top } = rect;

      return (
        <StyledButtonTile
          key={id}
          borderRadius={8}
          height={getCoordinatesHeight(rect)}
          isActive={activeId === id}
          left={left}
          onClick={handleButtonClick}
          top={top}
          width={getCoordinatesWidth(rect)}
        >
          {id}
        </StyledButtonTile>
      );
    })}
  </Plane>
);

export default MonitorControls;
