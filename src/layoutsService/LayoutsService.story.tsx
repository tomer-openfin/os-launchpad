import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Color } from '../styles';
import { withMarginDecorator } from '../utils/storybookHelpers';
import { CATEGORIES } from '../utils/storyCategories';

import template from './titleBar/template';

storiesOf(CATEGORIES.LAYOUTS, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator(30))
  .add('titleBar', () => {
    const title = text('title', 'Title here');

    return (
      <div style={{ border: `2px solid ${Color.JUPITER}` }}>
        <div dangerouslySetInnerHTML={{ __html: template(title, 'relative')}} />

        <div style={{ background: 'white', minHeight: '100px', padding: '20px', textAlign: 'center' }}>Some Web App</div>
      </div>
    );
  });
