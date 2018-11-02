import { hot } from 'react-hot-loader';

import Component from './HMRTest';
import * as Story from './HMRTest.story';

export * from './HMRTest.css';
export { Story };

export default hot(module)(Component);
