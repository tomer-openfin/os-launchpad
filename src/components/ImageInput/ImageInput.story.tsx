import { action } from '@storybook/addon-actions';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import Imageinput from './ImageInput';

const handleFileChange = action('handleFileChange');

storiesOf(`${CATEGORIES.UI}ImageInput`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const imgSrc = text('ImageSource', 'https://openfin.co/android-chrome-256x256.png');
    const size = number('Size', 100);

    return <Imageinput previewSize={size} imgSrc={imgSrc} name="story" handleFileChange={handleFileChange} />;
  });
