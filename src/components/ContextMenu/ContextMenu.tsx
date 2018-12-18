import * as React from 'react';

import { Menu, Option } from './ContextMenu.css';

interface Props {
  options: Array<{
    label: string;
    onClick: () => void;
  }>;
}

const ContextMenu = ({ options }: Props) => (
  <Menu>
    {options.map(({ label, onClick }) => (
      <Option key={label} onClick={onClick}>
        {label}
      </Option>
    ))}
  </Menu>
);

export default ContextMenu;
