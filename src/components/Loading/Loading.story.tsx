import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import Loading, { defaultProps } from './Loading';

storiesOf(`${CATEGORIES.UI}Loading`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator(15))
  .add('default', () => {
    const size = number('size', defaultProps.size);
    const count = number('count', defaultProps.count);

    return <Loading size={size} count={count} />;
  });
