import * as React from 'react';

import * as indicator from '../../assets/DropdownIndicator.svg';

import { boolean } from '@storybook/addon-knobs';
import Color from '../../styles/color';
import SvgIcon from '../SvgIcon/index';
import { Display, Indicator, Option, OptionsWrapper, Wrapper } from './Dropdown.css';

export interface OptionType {
  label: string;
  value: string;
}

interface State {
  open: boolean;
}

interface Props {
  selected: string;
  options: OptionType[];
  onSelect: (option: OptionType) => void;
  width?: number | string;
  name?: string;
}

interface ViewProps extends Props, State {
  toggleOpen: () => void;
}
const getLabel = (options: OptionType[], selected: string) => {
  const current = options.find(opt => opt.value === selected);
  return (current && current.label) || selected;
};

export const DropdownView = ({ onSelect, options, open, selected, toggleOpen, width }: ViewProps) => (
  <Wrapper width={width}>
    <Display onClick={toggleOpen}>
      {getLabel(options, selected)}

      <SvgIcon imgSrc={indicator} size={12} color={Color.STAR} />
    </Display>

    <OptionsWrapper open={open}>
      {options.map((option: OptionType, i: number) => {
        const createOnClick = (currentOpt: OptionType) => () => onSelect(currentOpt);

        return (
          <Option onClick={createOnClick(option)} key={i}>
            {option.label}
          </Option>
        );
      })}
    </OptionsWrapper>
  </Wrapper>
);

class Dropdown extends React.Component<Props, State> {
  state = {
    open: false,
  };

  toggleOpen = () => {
    this.setState((prevState: State) => ({ open: !prevState.open }));
  };

  handleSelect = (option: OptionType) => {
    const { onSelect } = this.props;
    this.toggleOpen();
    onSelect(option);
  };

  render() {
    return <DropdownView {...this.props} {...this.state} onSelect={this.handleSelect} toggleOpen={this.toggleOpen} />;
  }
}

export default Dropdown;
