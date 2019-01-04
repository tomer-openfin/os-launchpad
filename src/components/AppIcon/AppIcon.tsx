import * as React from 'react';

import { ContextMenuOption } from '../../redux/contextMenu/types';
import { AppIconSizes, DirectionalPosition } from '../../types/commons';

import DragAndDrop, { Props as DragAndDropProps } from '../DragAndDrop';
import { Icon, StyledAppIndicator, StyledContextMenuZone, Wrapper } from './AppIcon.css';

export interface Props {
  appId: string;
  backgroundColor?: string;
  className?: string;
  contextMenuOptions?: ContextMenuOption[];
  dragAndDropOptions?: DragAndDropProps;
  hasTransition?: boolean;
  imgSrc: string;
  indicatorPosition: DirectionalPosition;
  isDisabled?: boolean;
  isDragAndDroppable?: boolean;
  launchApp: () => void;
  margin?: string;
  size?: AppIconSizes;
}

const defaultProps = {
  hasTransition: false,
  isDisabled: false,
  isDragAndDroppable: false,
  margin: '0',
  size: AppIconSizes.Medium,
};

const renderAppIconContent = ({ contextMenuOptions, imgSrc, size = defaultProps.size }: Props) => (
  <StyledContextMenuZone size={size} options={contextMenuOptions}>
    <Icon imgSrc={imgSrc} />
  </StyledContextMenuZone>
);

const AppIcon = (props: Props) => {
  const {
    appId,
    backgroundColor,
    className,
    dragAndDropOptions,
    hasTransition = defaultProps.hasTransition,
    indicatorPosition,
    isDisabled = defaultProps.isDisabled,
    isDragAndDroppable = defaultProps.isDragAndDroppable,
    launchApp,
    margin = defaultProps.margin,
    size = defaultProps.size,
  } = props;

  return (
    <Wrapper
      backgroundColor={backgroundColor}
      className={className}
      hasTransition={hasTransition}
      isDisabled={isDisabled}
      margin={margin}
      onClick={isDisabled ? undefined : launchApp}
      size={size}
    >
      {isDragAndDroppable && dragAndDropOptions ? (
        <DragAndDrop {...dragAndDropOptions}>{renderAppIconContent(props)}</DragAndDrop>
      ) : (
        renderAppIconContent(props)
      )}

      <StyledAppIndicator appId={appId} position={indicatorPosition} />
    </Wrapper>
  );
};

export default AppIcon;
