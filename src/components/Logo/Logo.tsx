import * as React from 'react';

import { LauncherSize } from '../../types/enums';
import { launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import { LogoIcon } from './Logo.css';

export interface Props {
  className?: string;
  imgSrc: string;
  size?: number;
}

const defaultProps = {
  size: launcherSizeConfigs[LauncherSize.Large].launcher,
};

const Logo = ({ className, imgSrc, size = defaultProps.size }: Props) => <LogoIcon className={className} imgSrc={imgSrc} size={size} />;

export default Logo;
