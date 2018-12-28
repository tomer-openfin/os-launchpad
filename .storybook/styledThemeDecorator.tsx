import * as React from 'react';

import ConnectedThemeProvider from '../src/components/ConnectedThemeProvider';
import { GlobalStyle } from '../src/styles/globals.css';

const styledThemeDecorator = story => {
  return (
    <ConnectedThemeProvider>
      <>
        <GlobalStyle />

        {story()}
      </>
    </ConnectedThemeProvider>
  );
};

export default styledThemeDecorator;
