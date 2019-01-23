import { TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import { DirectionalPosition } from '../../types/commons';
import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';
import { isBottomOrRight, isTopOrBottom } from '../../utils/windowPositionHelpers';

interface TransitionGroupProps {
  sizingConfig: LauncherSizeConfig;
  height: number;
  isExpanded: boolean;
  launcherPosition: DirectionalPosition;
  width: number;
}

export const StyledTransitionGroup = styled(TransitionGroup)<TransitionGroupProps>`
  align-items: center;
  display: flex;

  ${({ sizingConfig, height, isExpanded, launcherPosition, width }) => {
    const edgePadding = sizingConfig.appIconGutter;

    return `
      flex-direction: ${isTopOrBottom(launcherPosition) ? 'row' : 'column'};
      flex-wrap: ${isBottomOrRight(launcherPosition) ? 'wrap-reverse' : 'wrap'};
      height: ${height ? `${height}px` : 'auto'};
      overflow: ${isExpanded ? 'visible' : 'hidden'};
      padding: ${isTopOrBottom(launcherPosition) ? `0 ${edgePadding}px` : `${edgePadding}px 0`};
      width: ${width ? `${width}px` : 'auto'};
    `;
  }}
`;
