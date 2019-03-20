import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import TextArea from './TextArea';

storiesOf(`${CATEGORIES.COMPONENTS}TextArea`, module).add('default', () => {
  return <TextArea value={'hi'} handleChange={() => {}} />;
});
