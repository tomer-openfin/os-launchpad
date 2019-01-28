import * as React from 'react';

import * as logoutIcon from '../../assets/Logout.svg';
import * as ShutdownIcon from '../../assets/Shutdown.svg';

import { Color } from '../../styles/index';

import SvgIcon from '../SvgIcon/SvgIcon';
import { Action, Text, Wrapper } from './Logout.css';

const ICON_SIZE = 42;

interface Props {
  exit: () => void;
  logout: () => void;
}

const Logout = ({ exit, logout }: Props) => {
  return (
    <Wrapper>
      <Action onClick={logout}>
        <SvgIcon color={Color.SUN} imgSrc={logoutIcon} size={ICON_SIZE} />

        <Text>Log Out</Text>
      </Action>

      <Action onClick={exit}>
        <SvgIcon color={Color.SUN} imgSrc={ShutdownIcon} size={ICON_SIZE} />

        <Text>Close OpenFin</Text>
      </Action>
    </Wrapper>
  );
};

export default Logout;
