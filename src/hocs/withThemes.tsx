import * as React from 'react';
import { Omit } from 'react-redux';

import ApiService from '../services/ApiService';
import { ResponseStatus, Theme } from '../types/commons';

enum Consts {
  Themes = 'themes',
}

interface WithThemesProps {
  themes: Theme[];
}

interface State {
  error: string | null;
  themes: Theme[] | null;
}

const withThemes = <P extends WithThemesProps>(Component: React.ComponentType<P>) =>
  class ComponentWithThemes extends React.PureComponent<Omit<P, Consts.Themes>, State> {
    state = {
      error: null,
      themes: null,
    };

    componentDidMount() {
      ApiService.getOrgSettings()
        .then(response => {
          if (response && response.themes && response.status !== ResponseStatus.FAILURE) {
            const { themes } = response;
            this.setState({ themes });
          }
        })
        .catch(error => this.setState({ error }));
    }

    render() {
      const { error, themes } = this.state;

      if (error) {
        return <div>Error loading themes.</div>;
      }

      if (themes === null) {
        return <div>Loading Themes...</div>;
      }

      return <Component {...this.props} themes={themes} />;
    }
  };

export default withThemes;
