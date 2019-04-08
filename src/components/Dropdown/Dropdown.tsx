import * as React from 'react';

import { Display, Indicator, Option, OptionsWrapper, Wrapper } from './Dropdown.css';

export interface Option {
  label: string;
  value: string | number;
}

interface Props {
  open: boolean;
  selected: Option;
  selectedIndex: number;
  options: Option[];
  selectOption: (option: Option) => void;
  width?: number | string;
}

const Dropdown = ({ selectOption, options, open, selected, selectedIndex, width }: Props) => (
  <Wrapper width={width}>
    <Display>
      {selected.label}
      <Indicator open={open} />
    </Display>

    <OptionsWrapper open={open}>
      {options.map((option: Option, i: number) => (
        <Option onClick={() => selectOption(option)} key={i}>
          {option.label}
        </Option>
      ))}
    </OptionsWrapper>
  </Wrapper>
);

export default Dropdown;
