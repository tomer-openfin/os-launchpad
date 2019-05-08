import { action } from '@storybook/addon-actions';
import { number, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { ContextChannel } from '../ContextGroupItem';
import ContextManager from './ContextManager';

const COLORS = ['Red', 'Blue', 'Green', 'Yellow', 'DodgerBlue', 'Tomato', 'GoldenRod', 'Salmon', 'BlanchedAlmond'];

const clearSnapshot = action('clearSnapshot');
const handleClose = action('handleClose');
const handleEdit = action('handleEdit');

storiesOf(`${CATEGORIES.COMPONENTS}ContextManager`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const activeId = text('activeId', '');
    const numberOfChannels = number('numberOfChannels', 3, { range: true, min: 0, max: COLORS.length, step: 1 });

    const channels: ContextChannel[] = [];
    for (let i = 0; i < numberOfChannels; i += 1) {
      const channel = object(`channel ${i}`, {
        color: COLORS[i],
        contextName: '',
        count: Math.round(Math.random() * 100),
        id: COLORS[i],
        name: COLORS[i],
      });

      channels.push(channel);
    }

    return <ContextManager activeId={activeId} channels={channels} clearSnapshot={clearSnapshot} handleClose={handleClose} handleEdit={handleEdit} />;
  });
