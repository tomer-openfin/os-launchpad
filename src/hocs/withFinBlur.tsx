import * as React from 'react';

interface Props {
  onBlur: () => void;
}

const withFinBlur = <P extends Props>(Component: React.ComponentType<P>) =>
  class ComponentWithAutoHide extends React.PureComponent<P> {
    componentDidMount() {
      fin.desktop.Window.getCurrent().addEventListener('blurred', this.handleBlur);
    }

    componentWillUnmount() {
      fin.desktop.Window.getCurrent().removeEventListener('blurred', this.handleBlur);
    }

    handleBlur = () => {
      this.props.onBlur();
    };

    render() {
      return <Component {...this.props} />;
    }
  };

export default withFinBlur;
