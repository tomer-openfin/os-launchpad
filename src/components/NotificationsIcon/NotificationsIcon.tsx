import * as React from 'react';

import * as notificationsIcon from '../../assets/Notifications.svg';

import { Color } from '../../styles';
import SvgIcon, { defaultProps, Props as SvgIconProps } from '../SvgIcon';
import { Count, Wrapper } from './NotificationsIcon.css';

interface Props extends SvgIconProps {
  count: number;
}

const { hoverColor: defaultHoverColor, size: defaultSize } = defaultProps;

const setContent = count => {
  if (count <= 0) {
    return '--';
  } else if (count <= 99) {
    return `${count}`;
  }
  return '99+';
};

const setColor = count => {
  if (count <= 0) {
    return Color.COMET;
  }
  return Color.JUPITER;
};

const NotificationsIcon = ({ className, disabled, hoverColor = defaultHoverColor, onClick, size = defaultSize, count }: Props) => (
  <Wrapper className={className}>
    <SvgIcon
      color={setColor(count)}
      disabled={disabled}
      hoverColor={hoverColor}
      imgSrc={notificationsIcon}
      onClick={disabled ? undefined : onClick}
      size={size}
    />
    <Count>{setContent(count)}</Count>
  </Wrapper>
);

export default NotificationsIcon;
