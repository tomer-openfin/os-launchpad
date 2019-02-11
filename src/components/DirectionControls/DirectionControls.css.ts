import styled from 'styled-components';

import { DirectionalPosition } from '../../types/enums';

import ButtonTile from '../ButtonTile';

interface DirectionProps {
  direction: DirectionalPosition;
}

interface WrapperProps {
  size: number;
}

const DirectionToColumnMap = {
  [DirectionalPosition.Top]: 2,
  [DirectionalPosition.Left]: 1,
  [DirectionalPosition.Right]: 3,
  [DirectionalPosition.Bottom]: 2,
};

const DirectionToRowMap = {
  [DirectionalPosition.Top]: 1,
  [DirectionalPosition.Left]: 2,
  [DirectionalPosition.Right]: 2,
  [DirectionalPosition.Bottom]: 3,
};

export const StyledButtonTile = styled(ButtonTile)<DirectionProps>`
  ${({ direction }) => `
    grid-column-start: ${DirectionToColumnMap[direction]};
    grid-column-end: span 1;
    grid-row-start: ${DirectionToRowMap[direction]};
    grid-row-end: span 1;
  `}
`;

export const Wrapper = styled.div<WrapperProps>`
  display: inline-grid;

  ${({ size }) => {
    const gridTemplate = `${size}px ${size}px ${size}px`;
    return `
      grid-template-columns: ${gridTemplate};
      grid-template-rows: ${gridTemplate};
    `;
  }}
`;
