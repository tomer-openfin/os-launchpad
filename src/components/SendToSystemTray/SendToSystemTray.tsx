import * as React from 'react';

import * as CloseCircleIcon from '../../assets/CloseCircle.svg';

import SvgIcon from '../SvgIcon';
import { Wrapper } from './SendToSystemTray.css';

const SendToSystemTray = ({ launcherPosition, handleClick, size }) => (
  <Wrapper size={size} launcherPosition={launcherPosition} onClick={handleClick} title="Send to System Tray">
    <SvgIcon imgSrc={CloseCircleIcon} size={size} />
  </Wrapper>
);

export default SendToSystemTray;
