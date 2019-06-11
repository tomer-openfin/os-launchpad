import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { exampleUserLayout } from '../../samples/LayoutData';
import { CATEGORIES } from '../../utils/storyCategories';

import Layouts from './Layouts';

storiesOf(`${CATEGORIES.COMPONENTS}Layouts`, module).add('default', () => (
  <Layouts
    close={action('close')}
    deleteLayout={action('deleteLayout clicked')}
    layouts={[exampleUserLayout]}
    restoreLayout={action('restoreLayout clicked')}
    shareLayout={action('shareLayout clicked')}
  />
));
