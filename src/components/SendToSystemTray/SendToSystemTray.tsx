import * as React from 'react';

import * as minimizeToTrayIcon from '../../assets/MinimizeToTray.svg';

import SvgIcon from '../SvgIcon';
import { Wrapper } from './SendToSystemTray.css';

const SendToSystemTray = ({ launcherPosition, handleClick, size }) => (
  <Wrapper launcherPosition={launcherPosition} onClick={handleClick} title="Send to System Tray">
    <SvgIcon imgSrc={minimizeToTrayIcon} size={size} />
  </Wrapper>
);

export default SendToSystemTray;
