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
  isBackground?: boolean;
  onClick?: () => void;
  size?: string | number;
  title?: string;
}

export const defaultProps: Partial<Props> = {
  color: Color.COMET,
  hoverColor: Color.JUPITER,
  isBackground: false,
  size: 42,
};

const { color: defaultColor, hoverColor: defaultHoverColor, isBackground: defaultIsBackground, size: defaultSize } = defaultProps;

const SvgIcon = ({
  className,
  color = defaultColor,
  disabled,
  hoverColor = defaultHoverColor,
  imgSrc,
  isActive,
  isBackground = defaultIsBackground,
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
    isBackground={isBackground}
    onClick={disabled ? undefined : onClick}
    size={size}
    title={title}
  />
);

export default SvgIcon;
