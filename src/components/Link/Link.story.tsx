import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import Link, { RouterLink } from './Link.css';

storiesOf(`${CATEGORIES.UI}Link`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const linkText = text('text', 'Link Text');

    return <Link onClick={action('Button Click')}>{linkText}</Link>;
  })
  .add('react-router-dom Link', () => {
    const linkText = text('text', 'Link Text');

    return <RouterLink to="#">{linkText}</RouterLink>;
  });
