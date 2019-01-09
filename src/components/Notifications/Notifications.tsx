import * as React from 'react';

import * as notificationsIcon from '../../assets/Notifications.svg';

import { Count, NotificationsIcon, Wrapper } from './Notifications.css';

interface Props {
  count: number;
}

const setContent = count => {
  if (count <= 0) {
    return '--';
  } else if (count > 0 && count <= 99) {
    return `${count}`;
  } else {
    return '99+';
  }
};

const Notifications = ({ count }: Props) => (
  <Wrapper>
    <NotificationsIcon count={count} imgSrc={notificationsIcon} />
    <Count>{setContent(count)}</Count>;
  </Wrapper>
);

export default Notifications;
