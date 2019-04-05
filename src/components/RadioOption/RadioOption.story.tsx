import { action } from '@storybook/addon-actions';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import RadioOption from './RadioOption';

storiesOf(`${CATEGORIES.UI}RadioOption`, module)
  .addDecorator(withKnobs)
  .add('default, single radio option', () => {
    const label = text('label', 'App URL');
    const onChange = action('onChange');
    const option = text('option', 'appUrl');
    const optionName = text('optionName', 'manifestType');
    const selectedOption = select('selectedOption', { appUrl: 'appUrl', manifest_url: 'manifest_url' }, 'appUrl');

    return <RadioOption label={label} onChange={onChange} optionName={optionName} selectedOption={selectedOption} option={option} />;
  })
  .add('multiple radio options', () => {
    const onChange = action('onChange');

    const label1 = text('label', 'label1');
    const label2 = text('label', 'label2');
    const label3 = text('label', 'label3');
    const option1 = text('option', 'option1');
    const option2 = text('option', 'option2');
    const option3 = text('option', 'option3');
    const optionName = text('optionName', 'sharedName');

    const selectedOption = select('selectedOption', { option1: 'option1', option2: 'option2', option3: 'option3' }, 'option1');

    return (
      <>
        <RadioOption label={label1} onChange={onChange} optionName={optionName} selectedOption={selectedOption} option={option1} />
        <RadioOption label={label2} onChange={onChange} optionName={optionName} selectedOption={selectedOption} option={option2} />
        <RadioOption label={label3} onChange={onChange} optionName={optionName} selectedOption={selectedOption} option={option3} />
      </>
    );
  });
