import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import NewAppForm from './NewAppForm';

const createApp = action('createApp');
const onEscDown = action('onEscDown');

storiesOf(`${CATEGORIES.ADMIN}NewAppForm`, module).add('default', () => <NewAppForm createApp={createApp} onEscDown={onEscDown} pushRoute={noop} />);
