import * as React from 'react';

import { LauncherSize } from '../../types/commons';

import { launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import { Icon, Wrapper } from './AppIcon.css';

export interface Props {
  borderWidth?: number;
  className?: string;
  imgSrc: string;
  isDisabled?: boolean;
  onClick?: () => void;
  size?: number;
}

const defaultProps = {
  borderWidth: launcherSizeConfigs[LauncherSize.Large].appIconBorder,
  isDisabled: false,
  size: launcherSizeConfigs[LauncherSize.Large].appIcon,
};

const AppIcon = (props: Props) => {
  const { borderWidth = defaultProps.borderWidth, className, isDisabled = defaultProps.isDisabled, onClick, size = defaultProps.size, imgSrc } = props;

  return (
    <Wrapper borderWidth={borderWidth} className={className} isDisabled={isDisabled} onClick={isDisabled ? undefined : onClick} size={size}>
      <Icon imgSrc={imgSrc} />
    </Wrapper>
  );
};

export default AppIcon;
