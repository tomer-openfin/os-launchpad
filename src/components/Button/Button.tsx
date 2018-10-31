import * as React from 'react';

interface Props {
  onClick: () => void;
}

const Button = ({ onClick }: Props) => (
  <button onClick={onClick}>increment</button>
);

export default Button;
