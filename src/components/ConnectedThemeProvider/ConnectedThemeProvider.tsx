import * as React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { getOrganizationActiveTheme } from '../../redux/organization/index';
import { State } from '../../redux/types';
import { Theme } from '../../types/commons';

interface Props {
  children: React.ReactChild;
  theme: Theme;
}

const mapState = (state: State) => ({
  theme: getOrganizationActiveTheme(state),
});

const ConnectedThemeProvider = ({ children, theme }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default connect(mapState)(ConnectedThemeProvider);
