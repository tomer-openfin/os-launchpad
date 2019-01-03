// tslint:disable-next-line:no-var-requires
const StoryRouter = require('storybook-react-router').default;
import { withInfo } from '@storybook/addon-info';
import { addDecorator, configure } from '@storybook/react';
import { Store } from 'redux';

import configureStore from '../src/configureStore';
import { initStorybookStore } from './initStorybookStore';

import reduxDecorator from './reduxDecorator';
import styledThemeDecorator from './styledThemeDecorator';

declare global {
  interface Window {
    store: Store;
  }
}

const store = configureStore();

initStorybookStore(store);

// Global decorators
addDecorator(withInfo);
addDecorator(StoryRouter());
addDecorator(styledThemeDecorator);
addDecorator(reduxDecorator(store));

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
