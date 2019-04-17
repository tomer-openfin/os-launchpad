import * as React from 'react';
import { components } from 'react-select';
import { IndicatorProps } from 'react-select/lib/components/indicators';
import { ValueType } from 'react-select/lib/types';

import * as indicator from '../../assets/DropdownIndicator.svg';

import Color from '../../styles/color';
import SvgIcon from '../SvgIcon';
import { StyledSelect } from './Dropdown.css';

export interface OptionType {
  label: string;
  value: string;
}

interface Props {
  name?: string;
  onSelect: (option: ValueType<OptionType>) => void;
  options: OptionType[];
  selected: string;
  width?: number | string;
}

const getLabel = (options: OptionType[], selected: string) => {
  const current = options.find(opt => opt.value === selected);
  return (current && current.label) || selected;
};

const DropdownIndicator = (props: IndicatorProps<OptionType>) => {
  return (
    <components.DropdownIndicator {...props}>
      <SvgIcon imgSrc={indicator} size={12} color={Color.STAR} />
    </components.DropdownIndicator>
  );
};

export const Dropdown = ({ onSelect, options, selected, width }: Props) => (
  <StyledSelect
    className="react-select-container"
    components={{ DropdownIndicator }}
    classNamePrefix="react-select"
    value={options.find(o => o.value === selected)}
    onChange={onSelect}
    options={options}
    isSearchable={false}
    width={width}
  />
);

export default Dropdown;
