import * as React from 'react';

import { LauncherSize } from '../../types/commons';

import { launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import { Icon, Wrapper } from './AppIcon.css';

export interface Props {
  borderWidth?: number;
  className?: string;
  imgSrc: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  size?: number;
}

const defaultProps = {
  borderWidth: launcherSizeConfigs[LauncherSize.Large].appIconBorder,
  isDisabled: false,
  isLoading: false,
  size: launcherSizeConfigs[LauncherSize.Large].appIcon,
};

const AppIcon = ({
  borderWidth = defaultProps.borderWidth,
  className,
  isDisabled = defaultProps.isDisabled,
  isLoading = defaultProps.isLoading,
  onClick,
  size = defaultProps.size,
  imgSrc,
}: Props) => (
  <Wrapper borderWidth={borderWidth} className={className} isDisabled={isDisabled} isLoading={isLoading} onClick={isDisabled ? undefined : onClick} size={size}>
    <Icon imgSrc={imgSrc} />
  </Wrapper>
);

export default AppIcon;
