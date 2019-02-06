import styled from 'styled-components';

import { Color } from '../../styles';

import { StyledTransitionGroup as AppList } from '../AppList';

export const Window = styled.div`
  background: ${Color.ASTEROID_BELT};
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;

  ${AppList} {
    height: 100%;
    width: 100%;
  }
`;
