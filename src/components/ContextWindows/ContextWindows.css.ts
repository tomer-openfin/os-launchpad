import styled from 'styled-components';

import { Color, Typography } from '../../styles';

import ContextManagerEmptyState from '../ContextManagerEmptyState';
import { Draggable } from '../DragWrapper';

export const StyledContextManagerEmptyState = styled(ContextManagerEmptyState)`
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction:column;
  flex: 1;
  position: relative;

  ${Draggable} + ${Draggable} {
    margin-top: 5px;
  }
`;

export const Header = styled.div`
  ${Typography.TypeStyleNaos}

  margin-bottom: 10px;
  color: ${Color.MERCURY};
  text-transform: uppercase;
`;

export const ItemsWrapper = styled.div`
  flex: 1;
  overflow: auto;
`;

export const Wrapper = styled.div`
  background-color: ${Color.KUIPER_BELT};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px 20px;
`;
