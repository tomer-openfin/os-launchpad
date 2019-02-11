import styled from 'styled-components';

import ButtonTile from '../ButtonTile';

interface StyledButtonTileProps {
  left: number;
  top: number;
}

interface PlaneProps {
  height: number;
  width: number;
}

export const StyledButtonTile = styled(ButtonTile)<StyledButtonTileProps>`
  position: absolute;

  ${({ left, top }) => `
    left: ${left}px;
    top: ${top}px;
  `}
`;

export const Plane = styled.div<PlaneProps>`
  position: relative;

  ${({ height, width }) => `
    height: ${height}px;
    width: ${width}px;
  `}
`;
