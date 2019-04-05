import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import ImageUpload from './ImageUpload';

const saveImage = action('saveImage');
const cancel = action('cancel');

storiesOf(`${CATEGORIES.ADMIN}ImageUpload`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const headerText = text('Header Text', 'Upload new image asset');

    return <ImageUpload headerText={headerText} saveImage={saveImage} handleCancel={cancel} />;
  });
