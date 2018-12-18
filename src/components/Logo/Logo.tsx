import * as React from 'react';

import { LogoIcon } from './Logo.css';

export interface Props {
  className?: string;
  imgSrc: string;
}

const Logo = ({ className, imgSrc }: Props) => <LogoIcon className={className} imgSrc={imgSrc} />;

export default Logo;
