import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import LogoInput from './LogoInput';

const handleFileChange = action('handleFileChange');

storiesOf(`${CATEGORIES.ADMIN}LogoInput`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const logo = text('logo', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');
    return <LogoInput logo={logo} name="story" handleFileChange={handleFileChange} />;
  });
