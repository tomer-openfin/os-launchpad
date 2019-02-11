import * as React from 'react';

import { DirectionalPosition } from '../../types/enums';

import { StyledButtonTile, Wrapper } from './DirectionControls.css';

const { Bottom, Left, Right, Top } = DirectionalPosition;

interface Props {
  direction: DirectionalPosition;
  handleChange: (direction: DirectionalPosition) => void;
  size?: number;
}

export const defaultProps = {
  size: 17,
};

const borderRadius = `${(4 / defaultProps.size) * 100}%`;

const DirectionControls = ({ direction, handleChange, size = defaultProps.size }: Props) => (
  <Wrapper size={size}>
    <StyledButtonTile borderRadius={borderRadius} direction={Top} isActive={direction === Top} onClick={handleChange.bind(null, Top)}>
      Top
    </StyledButtonTile>

    <StyledButtonTile borderRadius={borderRadius} direction={Left} isActive={direction === Left} onClick={handleChange.bind(null, Left)}>
      Left
    </StyledButtonTile>

    <StyledButtonTile borderRadius={borderRadius} direction={Right} isActive={direction === Right} onClick={handleChange.bind(null, Right)}>
      Right
    </StyledButtonTile>

    <StyledButtonTile borderRadius={borderRadius} direction={Bottom} isActive={direction === Bottom} onClick={handleChange.bind(null, Bottom)}>
      Bottom
    </StyledButtonTile>
  </Wrapper>
);

export default DirectionControls;
