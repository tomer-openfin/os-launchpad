import { hot } from 'react-hot-loader';

import Component from './App';
import * as Story from './App.story';

export * from './App.css';

export { Story };

export default hot(module)(Component);
