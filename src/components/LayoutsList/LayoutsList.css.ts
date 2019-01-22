import styled from 'styled-components';

import { Color, Typography } from '../../styles';

interface Props {
  showFullList: boolean;
}

export const EmptyCopy = styled.p`
  ${Typography.TypeStyleDeneb}

  color: ${Color.SUN};
  font-style: italic;
  margin: 0;
  padding: 0;
`;

export const ListHeader = styled.h6`
  ${Typography.TypeStyleNaos}

  margin: 0;
  padding: 0;
  color: ${Color.MERCURY};
  text-transform: uppercase;
`;

export const LayoutNamesWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  padding: 11px 10px 0 12px;
  height: 100%;
  width: 100%;
`;

export const LoadMoreCTA = styled.div`
  ${Typography.TypeStyleEnif}

  align-self: center;
  color: ${Color.JUPITER};
  margin: 0;
  padding-top: 9px;
  text-transform: uppercase;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }
`;

export const UL = styled.ul<Props>`
  margin: 0;
  max-height: 132px;
  overflow-x: hidden;
  overflow-y: ${props => (props.showFullList ? 'scroll' : 'hidden')};
  padding: 0;
`;
