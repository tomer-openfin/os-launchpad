import * as React from 'react';

import * as arrowDownIcon from '../../assets/ArrowDown.svg';

import { DirectionalPosition } from '../../types/enums';

import SvgIcon, { defaultProps, Props as SvgIconProps } from '../SvgIcon';
import { CaretSvgIcon, Wrapper } from './SvgIconWithExtension.css';

interface Props extends SvgIconProps {
  caretSize: number;
  extensionPosition: DirectionalPosition;
}

const { color: defaultColor, hoverColor: defaultHoverColor, isBackground: defaultIsBackground, size: defaultSize } = defaultProps;

const SvgIconWithExtension = ({
  caretSize,
  className,
  color = defaultColor,
  disabled,
  hoverColor = defaultHoverColor,
  imgSrc,
  isActive,
  isBackground = defaultIsBackground,
  onClick,
  extensionPosition,
  size = defaultSize,
  title,
}: Props) => (
  <Wrapper
    className={className}
    clickable={!disabled && !!onClick}
    color={color}
    extensionPosition={extensionPosition}
    hoverColor={hoverColor}
    isBackground={isBackground}
  >
    <SvgIcon
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

    <CaretSvgIcon
      color={color}
      disabled={disabled}
      hoverColor={isBackground ? color : hoverColor}
      imgSrc={arrowDownIcon}
      isActive={isActive}
      onClick={disabled ? undefined : onClick}
      size={caretSize}
    />
  </Wrapper>
);

export default SvgIconWithExtension;
