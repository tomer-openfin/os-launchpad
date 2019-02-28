import { number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import ImagePreview from './ImagePreview';

storiesOf(`${CATEGORIES.UI}ImagePreview`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const image = text('Image', 'https://github.githubassets.com/images/spinners/octocat-spinner-128.gif');
    const size = number('Size', 100);

    return <ImagePreview size={size} imgSrc={image} />;
  });
