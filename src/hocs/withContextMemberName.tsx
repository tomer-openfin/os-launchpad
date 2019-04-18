import * as React from 'react';
import { Identity } from '../types/fin';
import { Subtract } from '../types/utils';

const INTERVAL_MS = 1500;

interface NameProp {
  name: string;
}

interface Props {
  appName: string;
  identity: Identity;
  isPollingActive: boolean;
}

interface State {
  isNotDefault: boolean;
  title: string;
}

type WithoutPassedProps<T> = Subtract<T, NameProp>;

const withContextMemberName = <P extends NameProp>(Component: React.ComponentType<P>) =>
  class ComponentWithContextMemberName extends React.Component<Props & WithoutPassedProps<P>, State> {
    interval?: number;

    state = {
      isNotDefault: false,
      title: '',
    };

    componentDidMount() {
      const { isPollingActive, identity } = this.props;

      this.getAndSetTitle(identity);

      if (isPollingActive) {
        this.setupInterval();
      }
    }

    componentWillUnmount() {
      this.teardownInterval();
    }

    componentDidUpdate(prevProps: Props) {
      if (prevProps.isPollingActive && !this.props.isPollingActive) {
        this.teardownInterval();
      }

      if (!prevProps.isPollingActive && this.props.isPollingActive) {
        this.getAndSetTitle(this.props.identity);

        this.setupInterval();
      }
    }

    handleInterval = () => {
      const { fin } = window;
      const { isPollingActive, identity } = this.props;

      if (!isPollingActive || !fin) {
        return;
      }

      this.getAndSetTitle(identity);
    };

    setupInterval = () => {
      this.teardownInterval();

      this.interval = window.setInterval(this.handleInterval, INTERVAL_MS);
    };

    teardownInterval = () => {
      clearInterval(this.interval);
    };

    getName = () => {
      const { isNotDefault, title } = this.state;
      const { appName, identity } = this.props;

      // Return an empty space so height of row doesn't shift from line height differences
      if (!isNotDefault) {
        return '\u00a0';
      }

      const windowName = title || identity.name;
      return windowName ? `${windowName} / ${appName}` : appName;
    };

    getAndSetTitle = (identity: Identity) => {
      const { uuid, name } = identity;
      if (!name) {
        return;
      }

      const finWindow = fin.desktop.Window.wrap(uuid, name);
      // TODO - remove any
      // tslint:disable-next-line:no-any
      (finWindow as any).getInfo(({ title }) => this.setState({ isNotDefault: true, title }));
    };

    render() {
      const { appName, identity, isPollingActive, ...props } = this.props;

      // TODO - remove any
      // tslint:disable-next-line:no-any
      return <Component {...props as any} name={this.getName()} />;
    }
  };

export default withContextMemberName;
