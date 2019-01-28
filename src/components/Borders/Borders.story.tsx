import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { CATEGORIES } from '../../utils/storyCategories';

import { Borders } from './Borders.css';

storiesOf(`${CATEGORIES.UI}Borders`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const width = text('width', '100vw');
    const height = text('height', '100vh');

    return <Borders height={height} width={width} />;
  });
