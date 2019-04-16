import { action } from '@storybook/addon-actions';
import { number, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { ContextChannel } from '../ContextGroupItem';
import ContextGroupList from './ContextGroupList';

const handleEdit = action('handleEdit');

storiesOf(`${CATEGORIES.COMPONENTS}ContextGroupList`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const activeId = text('activeId', '');
    const numberOfChannels = number('numberOfChannels', 2, { range: true, min: 0, max: 100, step: 1 });
    const channels: ContextChannel[] = [];
    for (let i = 1; i <= numberOfChannels; i += 1) {
      const channel = object(`channel ${i}`, {
        color: 'Red',
        contextName: '',
        count: 12,
        id: `Red ${i}`,
        name: `Red ${i}`,
      });

      channels.push(channel);
    }

    return <ContextGroupList activeId={activeId} channels={channels} handleEdit={handleEdit} />;
  });
