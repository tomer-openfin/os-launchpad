// tslint:disable-next-line:no-var-requires
const StoryRouter = require('storybook-react-router').default;
import { withInfo } from '@storybook/addon-info';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { Store } from 'redux';

import configureStore from '../src/configureStore';
import { initStorybookStore } from './initStorybookStore';

import dragAndDropContextDecorator from './decorators/dragAndDropContextDecorator';
import reduxDecorator from './decorators/reduxDecorator';
import styledThemeDecorator from './decorators/styledThemeDecorator';
import { getWindowViewports } from './utils';

declare global {
  interface Window {
    store: Store;
  }
}

const store = configureStore();
window.store = store;

initStorybookStore(store);

// Global decorators
addDecorator(withInfo);
addDecorator(StoryRouter());
addDecorator(styledThemeDecorator);
addDecorator(dragAndDropContextDecorator);
addDecorator(reduxDecorator(store));

addParameters({
  defaultViewport: 'defaultWindowSize',
  viewport: {
    viewports: {
      ...getWindowViewports(),
    },
  },
});

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
