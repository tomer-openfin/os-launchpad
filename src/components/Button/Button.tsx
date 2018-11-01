import * as React from 'react';

import { StyledButton } from './Button.css';

interface Props {
  backgroundColor?: string;
  children: React.ReactNode;
  color?: string;
  onClick: () => void;
  width?: number;
}

const defaultProps = {
  backgroundColor: '#fff',
  color: '#000',
  width: 150,
};

const Button = ({
  backgroundColor = defaultProps.backgroundColor,
  children,
  color = defaultProps.color,
  onClick,
  width = defaultProps.width,
}: Props) => (
  <StyledButton
    backgroundColor={backgroundColor}
    color={color}
    onClick={onClick}
    width={width}
  >
    {children}
  </StyledButton>
);

Button.defaultProps = defaultProps;

export default Button;
