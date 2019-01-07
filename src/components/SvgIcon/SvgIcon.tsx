import * as React from 'react';

import { Color } from '../../styles';

import { Icon } from './SvgIcon.css';

export interface Props {
  className?: string;
  color?: string;
  disabled?: boolean;
  hoverColor?: string;
  imgSrc: string;
  onClick?: () => void;
  size?: string | number;
}

const defaultProps: Partial<Props> = {
  color: Color.COMET,
  hoverColor: Color.JUPITER,
  size: 42,
};

const { color: defaultColor, hoverColor: defaultHoverColor, size: defaultSize } = defaultProps;

const SvgIcon = ({ className, color = defaultColor, disabled, hoverColor = defaultHoverColor, imgSrc, onClick, size = defaultSize }: Props) => (
  <Icon className={className} color={color} disabled={disabled} hoverColor={hoverColor} imgSrc={imgSrc} onClick={onClick} size={size} />
);

export default SvgIcon;
