import styled from 'styled-components';

import { Color, Typography } from '../../styles';

import ContextGroupItem, { Cell as ContextGroupItemCell, Wrapper as ContextGroupItemWrapper } from '../ContextGroupItem';

const COL_MARGIN = 10;
const COL_1 = 173;
const COL_2 = 155;

const GridLayout = `
  &:nth-child(1) {
    margin-right: ${COL_MARGIN}px;
    width: ${COL_1 - COL_MARGIN}px;
  }

  &:nth-child(2) {
    margin-right: ${COL_MARGIN}px;
    width: ${COL_2 - COL_MARGIN}px;
  }
`;

enum Phase {
  Default,
  Active,
  Hidden,
}

const getPhase = (isActive?: boolean, isHidden?: boolean): Phase => {
  if (isActive && !isHidden) {
    return Phase.Active;
  }

  if (!isActive && isHidden) {
    return Phase.Hidden;
  }

  return Phase.Default;
};

export const StyledContextGroupItem = styled(ContextGroupItem)<{ index: number; isActive?: boolean; isHidden?: boolean; yTransformSize: number }>`
  transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
  position: absolute;

  ${({ index, isActive, isHidden, yTransformSize }) => {
    const phase = getPhase(isActive, isHidden);

    return `
      top: 0;
      opacity: ${phase === Phase.Hidden ? 0 : 1};
      transform: translate3d(0, ${yTransformSize * index}px, 0);
      transition-delay: ${phase === Phase.Default ? '600ms' : '0ms'};
      ${
        phase === Phase.Active
          ? `
            transform: translate3d(0, 0, 0);
          `
          : ''
      }
    `;
  }}
`;

export const Header = styled.div<{ margin: number }>`
  ${Typography.TypeStyleNaos}

  color: ${Color.MERCURY};
  display: inline-block;
  text-overflow: nowrap;
  text-transform: uppercase;

  ${({ margin }) => `
    margin-bottom: ${margin}px;
  `}
`;

export const HeaderLabel = styled.div`
  ${GridLayout}

  display: inline-block;
`;

export const Item = styled.div<{ height: number }>`
  ${({ height }) => `
    min-height: ${height}px;
    max-height: ${height}px;
  `}
`;

export const ItemWrapper = styled.div<{ margin: number }>`
  position: relative;

  ${Item} + ${Item} {
    ${({ margin }) => `
      margin-top: ${margin}px;
    `}
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${ContextGroupItemWrapper} > ${ContextGroupItemCell} {
    ${GridLayout}
  }
`;
