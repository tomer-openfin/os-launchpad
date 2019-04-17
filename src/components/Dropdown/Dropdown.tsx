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

interface State {
  open: boolean;
}

interface Props {
  name?: string;
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

const DropdownIndicator = (props: IndicatorProps<OptionType>) => {
  return (
    <components.DropdownIndicator {...props}>
      <SvgIcon imgSrc={indicator} size={12} color={Color.STAR} />
    </components.DropdownIndicator>
  );
};

export const DropdownView = ({ onSelect, options, open, selected, toggleOpen, width }: ViewProps) => (
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
