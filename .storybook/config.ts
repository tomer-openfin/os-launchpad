import { withInfo } from '@storybook/addon-info';
import { addDecorator, configure } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import reduxDecorator from './reduxDecorator';

// Global decorators
addDecorator(StoryRouter());
addDecorator(reduxDecorator);
addDecorator(withInfo);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
