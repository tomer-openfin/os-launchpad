import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import ImageForm from './ImageForm';

const saveImage = action('saveImage');
const cancel = action('cancel');

storiesOf(`${CATEGORIES.ADMIN}ImageForm`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const byUrl = boolean('By Url', false);

    return <ImageForm byUrl={byUrl} saveImage={saveImage} handleCancel={cancel} />;
  });
