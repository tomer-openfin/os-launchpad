import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Layouts from './Layouts';

import { exampleUserLayout } from '../../samples/LayoutData';
import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

storiesOf(`${CATEGORIES.COMPONENTS}Layouts`, module).add('default', () => (
  <Layouts
    deleteLayout={action('deleteLayout clicked')}
    layouts={[exampleUserLayout]}
    onBlur={noop}
    restoreLayout={action('restoreLayout clicked')}
    saveLayout={action('saveLayout clicked')}
  />
));
