import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import UpdatePasswordForm from './UpdatePasswordForm';

const updatePassword = action('updatePassword');

storiesOf(`${CATEGORIES.COMPONENTS}UpdatePasswordForm`, module)
  .addDecorator(withMarginDecorator(30))
  .add('default', () => <UpdatePasswordForm updatePassword={updatePassword} />);
