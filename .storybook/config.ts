// tslint:disable-next-line:no-var-requires
const StoryRouter = require('storybook-react-router').default;
import { withInfo } from '@storybook/addon-info';
import { addDecorator, configure } from '@storybook/react';

import reduxDecorator from './reduxDecorator';
import themeDecorator from './themeDecorator';

// Global decorators
addDecorator(withInfo);
addDecorator(StoryRouter());
addDecorator(themeDecorator);
addDecorator(reduxDecorator);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
