import * as React from 'react';

import { ContextMenuOption } from '../../redux/contextMenu/types';
import { AppIconSizes, DirectionalPosition } from '../../types/commons';

import { AppStatusStates } from '../../redux/apps/types';
import { getOppositeDirection } from '../../utils/directionalPositionHelpers';

import AppIcon from '../AppIcon';
import ContextMenuZone from '../ContextMenuZone';
import DragAndDrop, { Props as DragAndDropProps } from '../DragAndDrop';
import LoadingAnimator from '../LoadingAnimator';
import { StyledAppIndicator, Wrapper } from './LauncherAppIcon.css';

export interface Props {
  appId: string;
  appStatusState?: AppStatusStates;
  className?: string;
  contextMenuOptions?: ContextMenuOption[];
  dragAndDropOptions?: DragAndDropProps;
  hasTransition?: boolean;
  imgSrc: string;
  launcherPosition: DirectionalPosition;
  isDisabled?: boolean;
  isDragAndDroppable?: boolean;
  launchApp: () => void;
  margin?: string;
  size?: AppIconSizes;
}

const defaultProps = {
  appStatusState: AppStatusStates.Closed,
  hasTransition: false,
  isDisabled: false,
  isDragAndDroppable: false,
  margin: '0',
  size: AppIconSizes.Medium,
};

const renderAppIconContent = ({ appStatusState, contextMenuOptions, imgSrc, isDisabled, launchApp, launcherPosition }: Props) => (
  <LoadingAnimator direction={launcherPosition} loading={appStatusState === AppStatusStates.Loading}>
    <ContextMenuZone options={contextMenuOptions}>
      <AppIcon imgSrc={imgSrc} isDisabled={isDisabled} onClick={launchApp} />
    </ContextMenuZone>
  </LoadingAnimator>
);

const LauncherAppIcon = (props: Props) => {
  const {
    appStatusState = defaultProps.appStatusState,
    className,
    dragAndDropOptions,
    hasTransition = defaultProps.hasTransition,
    launcherPosition,
    isDisabled = defaultProps.isDisabled,
    isDragAndDroppable = defaultProps.isDragAndDroppable,
    margin = defaultProps.margin,
    size = defaultProps.size,
  } = props;

  return (
    <Wrapper className={className} hasTransition={hasTransition} isDisabled={isDisabled} margin={margin} size={size}>
      {isDragAndDroppable && dragAndDropOptions ? (
        <DragAndDrop {...dragAndDropOptions}>{renderAppIconContent(props)}</DragAndDrop>
      ) : (
        renderAppIconContent(props)
      )}

      <StyledAppIndicator appStatusState={appStatusState} position={getOppositeDirection(launcherPosition)} />
    </Wrapper>
  );
};

export default LauncherAppIcon;
