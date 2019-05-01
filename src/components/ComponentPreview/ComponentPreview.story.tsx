import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import ComponentPreviewShortcut from '../ComponentPreviewShortcut/ComponentPreviewShortcut';
import ComponentPreviewSplash from '../ComponentPreviewSplash/ComponentPreviewSplash';
import { LoginView, Stage } from '../Login/Login';
import ComponentPreview from './ComponentPreview';

const handleClose = action('handleClose');

storiesOf(`${CATEGORIES.ADMIN}ComponentPreview`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <ComponentPreview handleClose={handleClose} />;
  })
  .add('Login', () => {
    return (
      <ComponentPreview handleClose={handleClose}>
        <LoginView closeApplication={noop} handleError={noop} message="" error={false} session="" stage={Stage.Login} username="" />
      </ComponentPreview>
    );
  })
  .add('Splash Screen', () => {
    const splashScreenImageUrl = text('Splash Screen Image URL', 'https://via.placeholder.com/450');
    return (
      <ComponentPreview handleClose={handleClose}>
        <ComponentPreviewSplash imageSrc={splashScreenImageUrl} />
      </ComponentPreview>
    );
  })
  .add('Shortcut', () => {
    const shortcutName = text('Shortcut Text', 'OS Launcher');
    const shortcutImageUrl = text('Shortcut Image URL', 'https://via.placeholder.com/64');
    return (
      <ComponentPreview handleClose={handleClose}>
        <ComponentPreviewShortcut imageSrc={shortcutImageUrl} shortcutName={shortcutName} />
      </ComponentPreview>
    );
  });
