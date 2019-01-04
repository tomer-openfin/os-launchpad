import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import { DirectionalPosition, Orientation } from '../../types/commons';
import { isTopOrBottom } from '../../utils/windowPositionHelpers';

import AppIcon, { APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION } from '../AppIcon';
import AppListToggle, { AppListToggleId } from '../AppListToggle';
import { StyledTransitionGroup } from './AppList.css';

interface Props {
  appList: string[];
  areAppsDisabled?: boolean;
  height: number;
  isOverflowExpanded?: boolean;
  launcherPosition: DirectionalPosition;
  saveSettings: () => void;
  setAppIds: (appIds: string[]) => void;
  setIsDragAndDrop: (isDragAndDroppable: boolean) => void;
  toggleIndex: number | null;
  width: number;
}

const moveSource = (appList: string[], setAppIds: (appIds: string[]) => void, toggleIndex: number | null) => (dragIndex: number, hoverIndex: number) => {
  const app = appList[dragIndex];
  const nextAppList = [...appList];

  nextAppList.splice(dragIndex, 1);
  nextAppList.splice(hoverIndex, 0, app);

  // Need to ensure toggle icon does not move
  // Splice it back into its original position
  if (toggleIndex !== null) {
    // Icon moving from before to after of toggle icon
    if (dragIndex < toggleIndex && toggleIndex < hoverIndex) {
      const toggle = nextAppList.splice(toggleIndex - 1, 1)[0];
      nextAppList.splice(toggleIndex, 0, toggle);
    }

    // Icon moving from after to before of toggle icon
    if (dragIndex > toggleIndex && toggleIndex > hoverIndex) {
      const toggle = nextAppList.splice(toggleIndex + 1, 1)[0];
      nextAppList.splice(toggleIndex, 0, toggle);
    }
  }

  setAppIds(nextAppList);
};

const AppList = ({
  appList,
  areAppsDisabled,
  height,
  isOverflowExpanded = false,
  launcherPosition,
  saveSettings,
  setAppIds,
  setIsDragAndDrop,
  toggleIndex,
  width,
}: Props) => {
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const margin = isOnTopOrBottom ? '15px 10px' : '10px 15px';
  const orientation = isOnTopOrBottom ? Orientation.Horizontal : Orientation.Vertical;
  const endSource = () => {
    setIsDragAndDrop(false);
    saveSettings();
  };
  const startSource = () => {
    setIsDragAndDrop(true);
  };

  return (
    <StyledTransitionGroup height={height} isExpanded={isOverflowExpanded} launcherPosition={launcherPosition} width={width}>
      {appList.map((id, index) => {
        return (
          <CSSTransition key={id} classNames={APP_ICON_TRANSITION_CLASSNAMES} timeout={APP_ICON_TRANSITION_DURATION} unmountOnExit>
            {status => {
              return id === AppListToggleId ? (
                <AppListToggle
                  dragAndDropOptions={{
                    dragDisabled: true,
                    id,
                    index,
                    moveSource: moveSource(appList, setAppIds, toggleIndex),
                    orientation,
                  }}
                  hasTransition
                  isExpanded={isOverflowExpanded}
                  isDisabled={areAppsDisabled}
                  isDragAndDroppable={status !== 'entering'}
                  margin={margin}
                />
              ) : (
                <AppIcon
                  appId={id}
                  dragAndDropOptions={{
                    endSource,
                    id,
                    index,
                    moveSource: moveSource(appList, setAppIds, toggleIndex),
                    orientation,
                    startSource,
                  }}
                  hasTransition
                  isDisabled={areAppsDisabled}
                  isDragAndDroppable={status !== 'entering'}
                  margin={margin}
                  withContextMenu
                />
              );
            }}
          </CSSTransition>
        );
      })}
    </StyledTransitionGroup>
  );
};

export default AppList;
