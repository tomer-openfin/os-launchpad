import * as React from 'react';

import { LogoIcon } from './Logo.css';

export interface Props {
  imgSrc: string;
  backgroundColor?: string;
}

const Logo = ({ imgSrc, backgroundColor }: Props) => <LogoIcon backgroundColor={backgroundColor} imgSrc={imgSrc} />;

export default Logo;
