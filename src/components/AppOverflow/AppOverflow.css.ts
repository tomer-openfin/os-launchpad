import styled from 'styled-components';

import { Color } from '../../styles/index';

import { Wrapper as AppList } from '../AppList';

export const Window = styled.div`
  background: ${Color.CHARCOAL};
  display: flex;
  flex-direction: column;
  height: 100vh;

  ${AppList} {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;
