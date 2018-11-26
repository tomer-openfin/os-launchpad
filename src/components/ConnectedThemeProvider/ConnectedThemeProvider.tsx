import * as React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { getOrganizationTheme } from '../../redux/organization/index';
import { State, Theme } from '../../redux/types';

interface Props {
  children: React.ReactNode;
  theme: Theme;
}

const mapState = (state: State) => ({
  theme: getOrganizationTheme(state),
});

const ConnectedThemeProvider = ({ children, theme }: Props) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default connect(mapState)(ConnectedThemeProvider);
