import * as React from 'react';

import { ContextMenuOption } from '../../redux/contextMenu/types';
import { AppIconSizes, DirectionalPosition } from '../../types/commons';

import ContextMenuZone from '../ContextMenuZone';
import { Icon, StyledAppIndicator, Wrapper } from './AppIcon.css';

export interface Props {
  className?: string;
  contextMenuOptions?: ContextMenuOption[];
  imgSrc: string;
  launchApp: () => void;
  appId: string;
  size?: AppIconSizes;
  indicatorPosition: DirectionalPosition;
}

const AppIcon = ({ className, contextMenuOptions, imgSrc, indicatorPosition, launchApp, appId, size = AppIconSizes.Medium }: Props) => {
  if (contextMenuOptions) {
    return (
      <ContextMenuZone className={className} options={contextMenuOptions}>
        <Wrapper onClick={launchApp}>
          <Icon imgSrc={imgSrc} size={size} />

          <StyledAppIndicator appId={appId} position={indicatorPosition} />
        </Wrapper>
      </ContextMenuZone>
    );
  }

  return (
    <Wrapper className={className} onClick={launchApp}>
      <Icon imgSrc={imgSrc} size={size} />

      <StyledAppIndicator appId={appId} position={indicatorPosition} />
    </Wrapper>
  );
};

export default AppIcon;
