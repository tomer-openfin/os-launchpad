import styled from 'styled-components';

import { Color } from '../../styles';
import { getBackgroundColor } from '../ConnectedThemeProvider';

export const Menu = styled.div``;

export const Option = styled.div`
  background-color: ${getBackgroundColor};
  color: ${props => (props.theme.id === 'dark' ? Color.WHITE : Color.BLACK)};
  cursor: pointer;
  font-size: 11px;
  padding: 10px;

  &:hover {
    /* TODO: Apply hover background color based on theme */
    background-color: ${Color.DUSTY_GREY};
  }
`;
