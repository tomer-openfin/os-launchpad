import * as React from 'react';

import { ContextMenuOption } from '../../redux/contextMenu/types';
import { AppIconSizes, DirectionalPosition } from '../../types/commons';
import * as SIZE from '../../utils/sizingConstants';

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
  margin?: number;
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
  margin = 0,
  size = SIZE.APP_ICON,
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
