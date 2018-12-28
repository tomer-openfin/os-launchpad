import * as React from 'react';

import * as CloseCircle from '../../assets/CloseCircle.svg';
import { Color } from '../../styles';

import SvgIcon from '../SvgIcon/SvgIcon';

export interface Props {
  className?: string;
  color?: string;
  disabled?: boolean;
  hoverColor?: string;
  onClick?: () => void;
  size?: number;
}

const defaultProps: Partial<Props> = {
  hoverColor: Color.MARS,
  size: 25,
};

const { size: defaultSize, hoverColor: defaultHoverColor } = defaultProps;

const CloseButton = ({ className, color, disabled, hoverColor = defaultHoverColor, onClick, size = defaultSize }: Props) => (
  <SvgIcon className={className} color={color} disabled={disabled} hoverColor={hoverColor} imgSrc={CloseCircle} onClick={onClick} size={size} />
);

export default CloseButton;
