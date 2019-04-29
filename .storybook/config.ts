import { withInfo } from '@storybook/addon-info';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { Store } from 'redux';
import StoryRouter from 'storybook-react-router';

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

const getRouterDecorator = () => StoryRouter();

const store = configureStore();
window.store = store;

initStorybookStore(store);

// Global decorators
addDecorator(withInfo);
addDecorator(getRouterDecorator());
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
