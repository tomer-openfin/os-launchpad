import * as React from 'react';

import { Color } from '../../styles';

import { Icon } from './SvgIcon.css';

export interface Props {
  className?: string;
  color?: string;
  disabled?: boolean;
  hoverColor?: string;
  imgSrc: string;
  isActive?: boolean;
  onClick?: () => void;
  size?: string | number;
  title?: string;
}

export const defaultProps: Partial<Props> = {
  color: Color.COMET,
  hoverColor: Color.JUPITER,
  size: 42,
};

const { color: defaultColor, hoverColor: defaultHoverColor, size: defaultSize } = defaultProps;

const SvgIcon = ({
  className,
  color = defaultColor,
  disabled, hoverColor = defaultHoverColor,
  imgSrc,
  isActive,
  onClick,
  size = defaultSize,
  title,
}: Props) => (
  <Icon
    className={className}
    color={color}
    disabled={disabled}
    hoverColor={hoverColor}
    imgSrc={imgSrc}
    isActive={isActive}
    onClick={disabled ? undefined : onClick}
    size={size}
    title={title}
  />
);

export default SvgIcon;
