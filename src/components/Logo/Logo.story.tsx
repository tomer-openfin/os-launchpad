import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import Logo from './Logo';

storiesOf(`${CATEGORIES.UI}Logo`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const imgSrc = text('imgSrc', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');

    return <Logo imgSrc={imgSrc} />;
  });
