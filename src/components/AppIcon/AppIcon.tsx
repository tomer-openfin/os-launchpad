import * as React from 'react';

import { ContextMenuOption } from '../../redux/contextMenu/types';
import { AppIconSizes, DirectionalPosition } from '../../types/commons';
import * as SIZE from '../../utils/sizingConstants';

import ContextMenuZone from '../ContextMenuZone';
import { Icon, IconWrapper, StyledAppIndicator, Wrapper } from './AppIcon.css';

export interface Props {
  appId: string;
  className?: string;
  contextMenuOptions?: ContextMenuOption[];
  imgSrc: string;
  indicatorPosition: DirectionalPosition;
  isDisabled: boolean;
  launchApp: () => void;
  size?: AppIconSizes;
}

const AppIcon = ({ className, contextMenuOptions, isDisabled, imgSrc, indicatorPosition, launchApp, appId, size = SIZE.APP_ICON }: Props) => {
  if (contextMenuOptions) {
    return (
      <ContextMenuZone className={className} options={contextMenuOptions}>
        <Wrapper isDisabled={isDisabled} onClick={launchApp}>
          <IconWrapper size={size}>
            <Icon imgSrc={imgSrc} />
          </IconWrapper>

          <StyledAppIndicator appId={appId} position={indicatorPosition} />
        </Wrapper>
      </ContextMenuZone>
    );
  }

  return (
    <Wrapper isDisabled={isDisabled} className={className} onClick={launchApp}>
      <IconWrapper size={size}>
        <Icon imgSrc={imgSrc} />
      </IconWrapper>

      <StyledAppIndicator appId={appId} position={indicatorPosition} />
    </Wrapper>
  );
};

export default AppIcon;
