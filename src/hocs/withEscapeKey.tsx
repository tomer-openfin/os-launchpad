import * as React from 'react';

interface Props {
  onEscDown: () => void;
}

const withEscapeKey = <P extends Props>(Component: React.ComponentType<P>) =>
  class ComponentWithEscapeKey extends React.PureComponent<P> {
    componentDidMount() {
      document.addEventListener('keydown', this.handleEscKeyPressed);
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleEscKeyPressed);
    }

    handleEscKeyPressed = (e: KeyboardEvent) => {
      const { onEscDown } = this.props;
      const ESC_KEY_CODE = 27;

      if (e.keyCode === ESC_KEY_CODE) {
        onEscDown();
      }
    };

    render() {
      return <Component {...this.props} />;
    }
  };

export default withEscapeKey;
