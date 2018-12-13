import * as React from 'react';

import { Icon } from './SvgIcon.css';

export interface Props {
  className?: string;
  imgSrc: string;
  onClick?: () => void;
  size?: number;
}

const SvgIcon = ({ className, imgSrc, onClick, size = 42 }: Props) => <Icon className={className} imgSrc={imgSrc} onClick={onClick} size={size} />;

export default SvgIcon;
