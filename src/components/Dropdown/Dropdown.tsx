import * as React from 'react';

import * as indicator from '../../assets/DropdownIndicator.svg';

import { boolean } from '@storybook/addon-knobs';
import Color from '../../styles/color';
import SvgIcon from '../SvgIcon/index';
import { Display, Indicator, Option, OptionsWrapper, Wrapper } from './Dropdown.css';

export interface Option {
  label: string;
  value: string | number;
}

interface State {
  open: boolean;
}

interface Props {
  selected: Option;
  options: Option[];
  onSelect: (option: Option) => void;
  width?: number | string;
}

interface ViewProps extends Props, State {
  toggleOpen: () => void;
}

export const DropdownView = ({ onSelect, options, open, selected, toggleOpen, width }: ViewProps) => (
  <Wrapper width={width}>
    <Display onClick={toggleOpen}>
      {selected.label || selected.value}

      <SvgIcon imgSrc={indicator} size={12} color={Color.STAR} />
    </Display>

    <OptionsWrapper open={open}>
      {options.map((option: Option, i: number) => {
        const createOnClick = (currentOpt: Option) => () => onSelect(currentOpt);

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

  render() {
    return <DropdownView {...this.props} {...this.state} toggleOpen={this.toggleOpen} />;
  }
}

export default Dropdown;
