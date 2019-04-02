import * as React from 'react';

interface Props {
  isActive: boolean;
  timeout: number;
}

interface Passed {
  reset: () => void;
}

const withTimeout = <P extends Passed>(Component: React.ComponentType<P>) =>
  class ComponentWithErrorTimeout extends React.PureComponent<P & Props> {
    timer: ReturnType<typeof setTimeout> | null = null;

    componentDidUpdate(prevProps: Props) {
      if (this.props.isActive && !prevProps.isActive) {
        this.start();
      } else if (!this.props.isActive && prevProps.isActive) {
        this.clearTimer();
      }
    }

    componentWillUnmount() {
      this.clearTimer();
    }

    start = () => (this.timer = setTimeout(this.reset, this.props.timeout));

    reset = () => {
      this.props.reset();
      this.clearTimer();
    };

    clearTimer = () => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    };

    render() {
      return <Component {...this.props} reset={this.reset} />;
    }
  };

export default withTimeout;
