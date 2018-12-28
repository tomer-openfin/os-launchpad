import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import LogoForm from './LogoForm';

const setLogo = action('setLogo');
const saveLogo = action('saveLogo');

storiesOf(`${CATEGORIES.ADMIN}LogoForm`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const imgSrc = text('imgSrc', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');

    return <LogoForm logo={imgSrc} saveLogo={saveLogo} setLogo={setLogo} />;
  });
