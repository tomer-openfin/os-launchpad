import * as React from 'react';

import ConnectedThemeProvider from '../src/components/ConnectedThemeProvider';

const themeDecorator = story => <ConnectedThemeProvider>{story()}</ConnectedThemeProvider>;

export default themeDecorator;
