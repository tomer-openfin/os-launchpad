import styled from 'styled-components';

import { isLeftOrRight, LauncherPositionProps } from '../../utils/launcherPosition';

export const Wrapper = styled.div<LauncherPositionProps>`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: ${props => (isLeftOrRight(props) ? 'row' : 'column')};
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
