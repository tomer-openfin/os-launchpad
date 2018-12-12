import * as React from 'react';
import getWindowName from '../../utils/getWindowName';

interface Props {
  children: React.ReactNode;
  windowHidden: (name: string) => void;
  windowShown: (name: string) => void;
}

class FinHideShowTracker extends React.PureComponent<Props> {
  componentDidMount() {
    const { fin } = window;
    if (fin) {
      fin.desktop.Window.getCurrent().addEventListener('hidden', this.handleHidden);
      fin.desktop.Window.getCurrent().addEventListener('shown', this.handleShown);
    }
  }

  componentWillUnmount() {
    const { fin } = window;
    if (fin) {
      fin.desktop.Window.getCurrent().removeEventListener('hidden', this.handleHidden);
      fin.desktop.Window.getCurrent().removeEventListener('shown', this.handleShown);
    }
  }

  handleHidden = () => {
    this.props.windowHidden(getWindowName());
  };

  handleShown = () => {
    this.props.windowShown(getWindowName());
  };

  render() {
    return this.props.children;
  }
}

export default FinHideShowTracker;
