import throttle from 'lodash-es/throttle';
import * as React from 'react';

import { Bounds, DirectionalCoordinates } from '../types/commons';
import { isPosInBounds } from '../utils/coordinateHelpers';
import { getSystemMousePosition } from '../utils/openfinPromises';

interface Props {
  autoHide: boolean;
  bounds: Bounds | undefined;
  collapse: () => void;
  expand: () => void;
  isExpanded: boolean;
}

/**
 * HOC for hiding and showing window
 *
 * @param Component
 *
 * @returns Component
 */
const withAutoHide = <P extends Props>(Component: React.ComponentType<P>) =>
  class ComponentWithAutoHide extends React.PureComponent<P> {
    interval?: number;

    constructor(props: P) {
      super(props);

      this.handleMouseEnterWindow = throttle(this.handleMouseEnterWindow.bind(this), 225, { leading: true, trailing: false });
      this.handleMouseLeaveWindow = throttle(this.handleMouseLeaveWindow.bind(this), 225, { leading: true, trailing: false });
    }

    componentDidMount() {
      this.bindMouseEvents();
    }

    componentWillUnmount() {
      this.unbindMouseEvents();
    }

    bindMouseEvents = () => {
      this.interval = window.setInterval(this.handleInterval, 250);
      window.addEventListener('mouseover', this.handleMouseEnterWindow);
    };

    unbindMouseEvents = () => {
      this.clearInterval();
      window.removeEventListener('mouseover', this.handleMouseEnterWindow);
    };

    clearInterval = () => {
      if (this.interval) {
        clearInterval(this.interval);
      }
    };

    handleInterval = async () => {
      const { bounds, isExpanded } = this.props;

      if (!isExpanded || !bounds) {
        return;
      }

      const pos = await getSystemMousePosition();
      if (pos && !isPosInBounds(pos as DirectionalCoordinates, bounds as Bounds)) {
        this.handleMouseLeaveWindow();
      }
    };

    handleMouseEnterWindow() {
      if (!this.props.autoHide) {
        return;
      }

      if (!this.props.isExpanded) {
        this.props.expand();
      }
    }

    handleMouseLeaveWindow() {
      if (!this.props.autoHide) {
        return;
      }

      if (this.props.isExpanded) {
        this.props.collapse();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  };

export default withAutoHide;
