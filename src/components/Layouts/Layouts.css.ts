import styled from 'styled-components';

import { DirectionalPosition } from '../../types/commons';

import { isLeftOrRight } from '../../utils/windowPositionHelpers';

interface WrapperProps {
  isExpanded: boolean;
  launcherPosition: DirectionalPosition;
}

export const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  background-color: ${({ isExpanded }) => (isExpanded ? 'rgba(14,13,21,0.96)' : 'rgba(0, 0, 0, 0.33)')};
  display: flex;
  flex-direction: ${({ launcherPosition }) => (isLeftOrRight(launcherPosition) ? 'row' : 'column')};
  height: 100vh;
  justify-content: space-between;
  position: relative;
  width: 100vw;
`;
