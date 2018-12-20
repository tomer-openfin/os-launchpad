import { TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import { DirectionalPosition } from '../../types/commons';
import { isBottomOrRight, isTopOrBottom } from '../../utils/windowPositionHelpers';

interface TransitionGroupProps {
  height: number;
  isExpanded: boolean;
  launcherPosition: DirectionalPosition;
  width: number;
}

export const StyledTransitionGroup = styled(TransitionGroup)<TransitionGroupProps>`
  display: flex;

  ${({ height, isExpanded, launcherPosition, width }) => `
    flex-direction: ${isTopOrBottom(launcherPosition) ? 'row' : 'column'};
    flex-wrap: ${isBottomOrRight(launcherPosition) ? 'wrap-reverse' : 'wrap'};
    height: ${height ? `${height}px` : 'auto'};
    overflow: ${isExpanded ? 'visible' : 'hidden'};
    padding: ${isTopOrBottom(launcherPosition) ? '0 10px' : '10px 0'};
    width: ${width ? `${width}px` : 'auto'};
  `}
`;
