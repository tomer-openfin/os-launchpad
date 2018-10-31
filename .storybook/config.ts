import { withInfo } from '@storybook/addon-info';
import { addDecorator, configure } from '@storybook/react';

// Global decorators
addDecorator(withInfo);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
