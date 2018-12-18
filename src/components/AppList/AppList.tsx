import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import { AppListItem, AppListTypes, DirectionalPosition } from '../../types/commons';
import { isTopOrBottom } from '../../utils/windowPositionHelpers';

import AppIcon, { APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION } from '../AppIcon';
import AppListToggle from '../AppListToggle';
import { StyledTransitionGroup } from './AppList.css';

interface Props {
  appList: AppListItem[];
  areAppsDisabled: boolean;
  height: number;
  isOverflowExpanded?: boolean;
  launcherPosition: DirectionalPosition;
  width: number;
}

const AppList = ({ appList, areAppsDisabled, height, isOverflowExpanded = false, launcherPosition, width }: Props) => {
  const margin = isTopOrBottom(launcherPosition) ? '15px 10px' : '10px 15px';
  return (
    <StyledTransitionGroup height={height} isExpanded={isOverflowExpanded} launcherPosition={launcherPosition} width={width}>
      {appList.map(({ id, type }) => {
        return (
          <CSSTransition key={id} classNames={APP_ICON_TRANSITION_CLASSNAMES} timeout={APP_ICON_TRANSITION_DURATION} unmountOnExit>
            {type === AppListTypes.Toggle ? (
              <AppListToggle hasTransition isExpanded={isOverflowExpanded} isDisabled={areAppsDisabled} margin={margin} />
            ) : (
              <AppIcon appId={id} hasTransition isDisabled={areAppsDisabled} margin={margin} withContextMenu />
            )}
          </CSSTransition>
        );
      })}
    </StyledTransitionGroup>
  );
};

export default AppList;
