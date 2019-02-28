import styled from 'styled-components';

import { Color, textEllipsis, Typography } from '../../styles';
import { Icon } from '../SvgIcon';

export const Item = styled.li`
  ${Typography.TypeStyleArcturus}
  ${textEllipsis}

  color: ${Color.SUN};
  flex: 1;
  list-style-type: none;

  &:hover {
    cursor: pointer;
    color: ${Color.JUPITER};
  }
`;

export const Row = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  flex: 1;
  justify-content: space-between;
  position: relative;

  &:not(:hover) {
    ${Icon} {
      display: none;
    }
  }
`;
