import * as React from 'react';

import { Color } from '../../styles';
import { Action, Text, Wrapper } from './LauncherMenu.css';

import SvgIcon from '../SvgIcon/SvgIcon';

const ICON_SIZE = 42;

interface LauncherMenuOption {
  handleClick: () => void;
  label: string;
  icon: string;
}

export interface Props {
  handleClickOption?: () => void;
  options: LauncherMenuOption[];
}

const LauncherMenu = ({ handleClickOption, options }: Props) => {
  return (
    <Wrapper>
      {options.map(({ handleClick, icon, label }) => {
        const onClickHandler = handleClickOption
          ? () => {
              handleClickOption();
              handleClick();
            }
          : handleClick;

        return (
          <Action key={label} onClick={onClickHandler}>
            <SvgIcon color={Color.SUN} imgSrc={icon} size={ICON_SIZE} />

            <Text>{label}</Text>
          </Action>
        );
      })}
    </Wrapper>
  );
};

export default LauncherMenu;
