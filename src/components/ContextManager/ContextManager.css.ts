import styled from 'styled-components';

import { Color } from '../../styles';

import Borders from '../Borders';
import Button from '../Button';
import ContextGroupWindows from '../ContextGroupWindows';

const MIN_ROWS = 3;

export const HEADER_MARGIN = 8;
const PADDING_BOTTOM = 18;
const PADDING_TOP = 14;
const PADDING_HORIZONTAL = 20;
export const ROW_HEIGHT = 22;
export const ROW_MARGIN = 22;
const WINDOW_HEADER_HEIGHT = 60;

const HEADER_HEIGHT = 15 + HEADER_MARGIN;
const GROUP_FROM_TOP = 12 + HEADER_HEIGHT + PADDING_TOP + ROW_HEIGHT;
const BASE_HEIGHT = WINDOW_HEADER_HEIGHT + HEADER_HEIGHT + PADDING_TOP + PADDING_BOTTOM;
const REVEAL_HEIGHT = 216;

export const getContextManagerHeight = (rowCount: number) => {
  const count = Math.max(MIN_ROWS, rowCount);
  const contentHeight = count * ROW_HEIGHT + (count - 1) * ROW_MARGIN;
  return BASE_HEIGHT + contentHeight;
};

export const StyledBorders = styled(Borders)<{ isHidden?: boolean }>`
  flex-shrink: 0;

  ${({ isHidden }) => `${isHidden ? 'pointer-events: none;' : ''}`}
`;

export const StyledEditButton = styled(Button)<{ isHidden?: boolean }>`
  margin-top: 15px;
`;

export const StyledContextGroupWindows = styled(ContextGroupWindows)`
  height: ${REVEAL_HEIGHT}px;
`;

export const Content = styled.div`
  background-color: ${Color.ASTEROID_BELT};
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${PADDING_TOP}px ${PADDING_HORIZONTAL}px ${PADDING_BOTTOM}px;
  position: relative;
`;

export const RevealWrapper = styled.div`
  overflow: hidden;
`;

export const GroupWrapper = styled.div<{ isHidden?: boolean }>`
  left: 0;
  padding: 0 ${PADDING_HORIZONTAL}px;
  position: absolute;
  top: ${GROUP_FROM_TOP}px;
  width: 100%;

  ${({ isHidden }) => `
    ${isHidden ? `pointer-events: none;` : ''};

    ${RevealWrapper} {
      height: ${isHidden ? 0 : `${REVEAL_HEIGHT}px`};
      transition: height 300ms ease-in-out 300ms;
    }

    ${StyledContextGroupWindows} {
      opacity: ${isHidden ? 0 : 1};
      transition: opacity 300ms ease-in-out 300ms;
    }

    ${StyledEditButton} {
      opacity: ${isHidden ? 0 : 1};
      transition: opacity 300ms ease-in-out;
      transition-delay: ${isHidden ? '0ms' : '600ms'};
    }
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Layout = styled.div`
  display: flex;

  ${Borders} {
    display: inline-block;
  }
`;
