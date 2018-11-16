import styled from 'styled-components';

import { LauncherPosition } from '../../types/commons';

import { isLeftOrRight } from '../../utils/launcherPosition';

interface WrapperProps {
  launcherPosition: LauncherPosition;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? 'row' : 'column')};
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
