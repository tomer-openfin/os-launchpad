import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import ErrorMessage from '../ErrorMessage';
import Input from '../Input';
import Label from './Label';

storiesOf(`${CATEGORIES.UI}Label`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const label = text('label', 'Label');

    return <Label label={label} />;
  })
  .add('with Input', () => {
    const label = text('label', 'Label');

    return (
      <Label label={label}>
        <Input />
      </Label>
    );
  })
  .add('with ErrorMessage', () => {
    const label = text('label', 'Label');
    const errorMessage = text('errorMessage', 'Error');

    const renderError = () => <ErrorMessage>{errorMessage}</ErrorMessage>;

    return (
      <Label label={label} renderError={renderError}>
        <Input hasError={!!errorMessage} />
      </Label>
    );
  });
