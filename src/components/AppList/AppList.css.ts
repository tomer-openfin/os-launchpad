import styled from 'styled-components';

import { DirectionalPosition } from '../../types/commons';
import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';
import { isBottomOrRight, isTopOrBottom } from '../../utils/windowPositionHelpers';

export const TRANSITION_GROUP_CLASSNAME = 'transition-group';

interface TransitionGroupProps {
  appCount: number;
  sizingConfig: LauncherSizeConfig;
  height: number;
  isExpanded: boolean;
  launcherPosition: DirectionalPosition;
  width: number;
}

export const StyledTransitionGroupWrapper = styled.div<TransitionGroupProps>`
  .${TRANSITION_GROUP_CLASSNAME} {
    align-items: center;
    display: flex;
    transition: padding 300ms ease-in-out;

    ${({ appCount, sizingConfig, height, isExpanded, launcherPosition, width }) => {
      const edgePadding = sizingConfig.appIconGutter;

      return `
      flex-direction: ${isTopOrBottom(launcherPosition) ? 'row' : 'column'};
      flex-wrap: ${isBottomOrRight(launcherPosition) ? 'wrap-reverse' : 'wrap'};
      height: ${height ? `${height}px` : 'auto'};
      overflow: ${isExpanded ? 'visible' : 'hidden'};
      padding: ${isTopOrBottom(launcherPosition) ? `0 ${appCount ? edgePadding : 0}px` : `${appCount ? edgePadding : 0}px 0`};
      width: ${width ? `${width}px` : 'auto'};
    `;
    }}
  }
`;
