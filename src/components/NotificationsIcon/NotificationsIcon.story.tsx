import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import * as notificationsIcon from '../../assets/Notifications.svg';
import { CATEGORIES } from '../../utils/storyCategories';

import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import NotificationsIcon from '../NotificationsIcon';
import { defaultProps } from '../SvgIcon/index';

const defaultSize = typeof defaultProps.size! === 'string' ? String(defaultProps.size!) : `${defaultProps.size!}px`;

const onClick = action('Click Notification Center Toggle');

storiesOf(`${CATEGORIES.COMPONENTS}NotificationsIcon`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const count = number('count', 23);
    const size = text('size', defaultSize);
    const disabled = boolean('disabled', false);

    return <NotificationsIcon disabled={disabled} imgSrc={notificationsIcon} count={count} onClick={onClick} size={size} />;
  });
