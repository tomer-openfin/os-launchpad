import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import Settings from './Settings';

const setAutoHide = action('setAutoHide');
const setLaunchbarPosition = action('setLaunchbarPosition');
const onEscDown = action('onEscDown');

storiesOf(`${CATEGORIES.COMPONENTS}Settings`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const autoHide = boolean('autoHide', false);

    return <Settings autoHide={autoHide} hideWindow={noop} setAutoHide={setAutoHide} setLaunchbarPosition={setLaunchbarPosition} onEscDown={onEscDown} />;
  });
