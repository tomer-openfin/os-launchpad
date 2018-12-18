import * as React from 'react';

import { ContextMenuOption } from '../../redux/contextMenu/types';
import { AppIconSizes, DirectionalPosition } from '../../types/commons';

import { Icon, StyledAppIndicator, StyledContextMenuZone, Wrapper } from './AppIcon.css';

export interface Props {
  appId: string;
  backgroundColor?: string;
  className?: string;
  contextMenuOptions?: ContextMenuOption[];
  hasTransition?: boolean;
  imgSrc: string;
  indicatorPosition: DirectionalPosition;
  isDisabled?: boolean;
  launchApp: () => void;
  margin?: string;
  size?: AppIconSizes;
}

const AppIcon = ({
  appId,
  backgroundColor,
  className,
  contextMenuOptions,
  hasTransition = false,
  isDisabled = false,
  imgSrc,
  indicatorPosition,
  launchApp,
  margin = '0',
  size = AppIconSizes.Medium,
}: Props) => {
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
      <StyledContextMenuZone size={size} options={contextMenuOptions}>
        <Icon imgSrc={imgSrc} />
      </StyledContextMenuZone>

      <StyledAppIndicator appId={appId} position={indicatorPosition} />
    </Wrapper>
  );
};

export default AppIcon;
