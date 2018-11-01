import { hot } from 'react-hot-loader';

import Component from './App';

export * from './App.css';

import * as Story from './App.story';

export { Story };

export default hot(module)(Component);
