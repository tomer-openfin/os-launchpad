import * as React from 'react';

import { Icon } from './SvgIcon.css';

export interface Props {
  className?: string;
  disabled?: boolean;
  imgSrc: string;
  onClick?: () => void;
  size?: number;
}

const SvgIcon = ({ className, disabled, imgSrc, onClick, size = 42 }: Props) => (
  <Icon className={className} disabled={disabled} imgSrc={imgSrc} onClick={onClick} size={size} />
);

export default SvgIcon;
