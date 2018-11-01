import * as React from 'react';

import { GlobalStyle } from '../../styles/globals.css';
import AppList from '../AppList';
import { Logo, LogoWrapper, Wrapper } from './';

const App = ({}) => (
  <Wrapper>
    <GlobalStyle />

    <LogoWrapper>
      <Logo />
    </LogoWrapper>

    <AppList />
  </Wrapper>);

export default App;
