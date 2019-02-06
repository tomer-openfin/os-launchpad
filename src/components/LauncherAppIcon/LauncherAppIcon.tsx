import * as React from 'react';

import { ContextMenuOption } from '../../redux/contextMenu/types';
import { AppStatusStates, DirectionalPosition } from '../../types/commons';

import { getOppositeDirection } from '../../utils/directionalPositionHelpers';
import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';

import AppIcon from '../AppIcon';
import ContextMenuZone from '../ContextMenuZone';
import DragAndDrop, { Props as DragAndDropProps } from '../DragAndDrop';
import LoadingAnimator from '../LoadingAnimator';
import { StyledAppIndicator, Wrapper } from './LauncherAppIcon.css';

export interface Props {
  appId: string;
  appStatusState?: AppStatusStates;
  appStatusMessage?: string;
  appTitle: string;
  className?: string;
  contextMenuOptions?: ContextMenuOption[];
  dragAndDropOptions?: DragAndDropProps;
  hasTransition?: boolean;
  imgSrc: string;
  launcherPosition: DirectionalPosition;
  launcherSizeConfig: LauncherSizeConfig;
  isDisabled?: boolean;
  isDragAndDroppable?: boolean;
  launchApp: () => void;
  margin?: string;
}

const defaultProps = {
  appStatusState: AppStatusStates.Closed,
  hasTransition: false,
  isDisabled: false,
  isDragAndDroppable: false,
  margin: '0',
};

const renderAppIconContent = ({ appStatusState, contextMenuOptions, imgSrc, isDisabled, launchApp, launcherPosition, launcherSizeConfig }: Props) => (
  <LoadingAnimator direction={launcherPosition} loading={appStatusState === AppStatusStates.Loading}>
    <ContextMenuZone options={contextMenuOptions}>
      <AppIcon
        borderWidth={launcherSizeConfig.appIconBorder}
        imgSrc={imgSrc}
        isDisabled={isDisabled}
        isLoading={appStatusState === AppStatusStates.Loading}
        onClick={launchApp}
        size={launcherSizeConfig.appIcon}
      />
    </ContextMenuZone>
  </LoadingAnimator>
);

const LauncherAppIcon = (props: Props) => {
  const {
    appStatusMessage,
    appStatusState = defaultProps.appStatusState,
    appTitle,
    className,
    dragAndDropOptions,
    hasTransition = defaultProps.hasTransition,
    launcherPosition,
    launcherSizeConfig,
    isDisabled = defaultProps.isDisabled,
    isDragAndDroppable = defaultProps.isDragAndDroppable,
    margin = defaultProps.margin,
  } = props;

  return (
    <Wrapper className={className} hasTransition={hasTransition} isDisabled={isDisabled} margin={margin} size={launcherSizeConfig.appIcon} title={appTitle}>
      {isDragAndDroppable && dragAndDropOptions ? (
        <DragAndDrop {...dragAndDropOptions}>{renderAppIconContent(props)}</DragAndDrop>
      ) : (
        renderAppIconContent(props)
      )}

      <StyledAppIndicator
        appStatusState={appStatusState}
        message={appStatusMessage}
        sizingConfig={launcherSizeConfig}
        position={getOppositeDirection(launcherPosition)}
        size={launcherSizeConfig.appIndicator}
      />
    </Wrapper>
  );
};

export default LauncherAppIcon;
