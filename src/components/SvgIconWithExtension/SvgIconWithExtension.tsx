import * as React from 'react';

import * as arrowDownIcon from '../../assets/ArrowDown.svg';

import { DirectionalPosition } from '../../types/enums';

import SvgIcon, { defaultProps, Props as SvgIconProps } from '../SvgIcon';
import { CaretSvgIcon, Wrapper } from './SvgIconWithExtension.css';

interface Props extends SvgIconProps {
  extensionPosition: DirectionalPosition;
}

const { color: defaultColor, hoverColor: defaultHoverColor, size: defaultSize } = defaultProps;

const SvgIconWithExtension = ({
  className,
  color = defaultColor,
  disabled,
  hoverColor = defaultHoverColor,
  imgSrc,
  onClick,
  extensionPosition,
  size = defaultSize,
}: Props) => (
  <Wrapper className={className} clickable={!disabled && !!onClick} color={color} hoverColor={hoverColor} extensionPosition={extensionPosition}>
    <SvgIcon color={color} disabled={disabled} hoverColor={hoverColor} imgSrc={imgSrc} onClick={disabled ? undefined : onClick} size={size} />

    <CaretSvgIcon color={color} disabled={disabled} hoverColor={hoverColor} imgSrc={arrowDownIcon} onClick={disabled ? undefined : onClick} size={25} />
  </Wrapper>
);

export default SvgIconWithExtension;
