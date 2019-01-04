import * as React from 'react';

interface Props {
  preventBlur?: boolean;
  onBlur: () => void;
}

const withFinBlur = <P extends Props>(Component: React.ComponentType<P>) =>
  class ComponentWithAutoHide extends React.PureComponent<P> {
    componentDidMount() {
      const { fin } = window;
      if (fin) {
        fin.desktop.Window.getCurrent().addEventListener('blurred', this.handleBlur);
      }
    }

    componentWillUnmount() {
      const { fin } = window;
      if (fin) {
        fin.desktop.Window.getCurrent().removeEventListener('blurred', this.handleBlur);
      }
    }

    handleBlur = () => {
      if (this.props.preventBlur) {
        return;
      }

      this.props.onBlur();
    };

    render() {
      return <Component {...this.props} />;
    }
  };

export default withFinBlur;
