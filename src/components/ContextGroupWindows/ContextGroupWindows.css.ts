import styled from 'styled-components';

import { Color, Typography } from '../../styles';

import { Draggable } from '../DragWrapper';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
`;

export const ItemsWrapper = styled.div`
  ${Draggable} + ${Draggable} {
    margin-top: 5px;
  }
`;

export const Header = styled.div`
  ${Typography.TypeStyleNaos}

  color: ${Color.MERCURY};
  margin-bottom: 16px;
  text-align: center;
  text-transform: uppercase;
`;

export const Wrapper = styled.div`
  background-color: ${Color.KUIPER_BELT};
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
`;
