import styled from 'styled-components';

import { Color, Typography } from '../../styles';
import { Icon } from '../SvgIcon';

export const Item = styled.li`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 134px;
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
