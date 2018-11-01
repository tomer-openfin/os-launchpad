import * as React from 'react';

import { AppCard, AppDescription, AppName, Heading, Wrapper } from './';

interface App {
  name: string;
  description: string;
}

interface State {
  appList: App[];
}

const initialState: State = {
  appList: [],
};

/* tslint:disable:no-console */
class AppDirectory extends React.Component<{}, State> {

  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    fetch('https://app-directory.openfin.co/api/v1/apps')
    .then(res => res.json())
    .then(res => this.setState({ appList: res }));
  }

  renderApps() {
    const { appList } = this.state;

    console.log('appList', appList, '\n');

    return appList.map((app: App) => (
      <AppCard key={app.name}>
        <AppName>{app.name}</AppName>
        <AppDescription>{app.description}</AppDescription>
      </AppCard>),
    );
  }

  render() {

    return (
    <Wrapper>
      <Heading>App Directory</Heading>

      {this.renderApps()}
    </Wrapper>
    );
  }
}

export default AppDirectory;
