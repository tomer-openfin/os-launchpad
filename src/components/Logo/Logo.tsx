import * as React from 'react';

import { LogoIcon } from './Logo.css';

export interface Props {
  className?: string;
  imgSrc: string;
  size?: number;
}

const Logo = ({ className, imgSrc, size }: Props) => <LogoIcon className={className} imgSrc={imgSrc} size={size} />;

export default Logo;
