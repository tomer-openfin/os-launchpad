import * as React from 'react';
import Select from 'react-select';

import * as indicator from '../../assets/DropdownIndicator.svg';

import { ValueType } from 'react-select/lib/types';
import Color from '../../styles/color';
import SvgIcon from '../SvgIcon/index';
import { Display, Option, OptionsWrapper, StyledSelect, Wrapper } from './Dropdown.css';

export interface OptionType {
  label: string;
  value: string;
}

interface State {
  open: boolean;
}

interface Props {
  name?: string;
  // onSelect: (option: OptionType) => void;
  onSelect: (option: ValueType<OptionType>) => void;
  options: OptionType[];
  selected: string;
  width?: number | string;
}

interface ViewProps extends Props, State {
  toggleOpen: () => void;
}
const getLabel = (options: OptionType[], selected: string) => {
  const current = options.find(opt => opt.value === selected);
  return (current && current.label) || selected;
};

export const DropdownView = ({ onSelect, options, open, selected, toggleOpen, width }: ViewProps) => (
  <StyledSelect
    className="react-select-container"
    classNamePrefix="react-select"
    value={options.find(o => o.value === selected)}
    onChange={onSelect}
    options={options}
    isSearchable={false}
    width={width}
  />
);

class Dropdown extends React.Component<Props, State> {
  state = {
    open: false,
  };

  toggleOpen = () => {
    this.setState((prevState: State) => ({ open: !prevState.open }));
  };

  handleSelect = (option: ValueType<OptionType>) => {
    const { onSelect } = this.props;
    this.toggleOpen();
    onSelect(option);
  };

  render() {
    return <DropdownView {...this.props} {...this.state} onSelect={this.handleSelect} toggleOpen={this.toggleOpen} />;
  }
}

export default Dropdown;
