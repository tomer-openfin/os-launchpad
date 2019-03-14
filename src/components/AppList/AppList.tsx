import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { DirectionalPosition, Orientation } from '../../types/commons';
import { isTopOrBottom } from '../../utils/windowPositionHelpers';

import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';
import AppListToggle, { AppListToggleId } from '../AppListToggle';
import LauncherAppIcon, { APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION } from '../LauncherAppIcon';
import { StyledTransitionGroupWrapper, TRANSITION_GROUP_CLASSNAME } from './AppList.css';

interface Props {
  appList: string[];
  areAppsDisabled?: boolean;
  height: number;
  isOverflowExpanded?: boolean;
  launcherPosition: DirectionalPosition;
  launcherSizeConfig: LauncherSizeConfig;
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
  launcherSizeConfig,
  saveSettings,
  setAppIds,
  setIsDragAndDrop,
  toggleIndex,
  width,
}: Props) => {
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  const gutterMargin = launcherSizeConfig.appIconGutter;
  const edgeMargin = (launcherSizeConfig.launcher - launcherSizeConfig.appIcon) / 2;
  const margin = isOnTopOrBottom ? `${edgeMargin}px ${gutterMargin}px` : `${gutterMargin}px ${edgeMargin}px`;
  const orientation = isOnTopOrBottom ? Orientation.Horizontal : Orientation.Vertical;
  const endSource = () => {
    setIsDragAndDrop(false);
    saveSettings();
  };
  const startSource = () => {
    setIsDragAndDrop(true);
  };

  return (
    <StyledTransitionGroupWrapper
      sizingConfig={launcherSizeConfig}
      height={height}
      isExpanded={isOverflowExpanded}
      launcherPosition={launcherPosition}
      width={width}
    >
      <TransitionGroup className={TRANSITION_GROUP_CLASSNAME}>
        {appList.map((id, index) => {
          return (
            <CSSTransition key={id} classNames={APP_ICON_TRANSITION_CLASSNAMES} timeout={APP_ICON_TRANSITION_DURATION} unmountOnExit>
              {status => {
                return id === AppListToggleId ? (
                  <AppListToggle
                    borderWidth={launcherSizeConfig.appIconBorder}
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
                    size={launcherSizeConfig.appIcon}
                  />
                ) : (
                  <LauncherAppIcon
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
      </TransitionGroup>
    </StyledTransitionGroupWrapper>
  );
};

export default AppList;
