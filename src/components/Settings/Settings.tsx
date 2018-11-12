/* tslint:disable:jsx-no-lambda */

import * as React from 'react';

import { CTA, Window } from './Settings.css';

import noop from '../../utils/noop';

interface Props {
  addHideOnBlurListener;
  autoHide: boolean;
  removeHideOnBlurListener;
  setAutoHide;
  setLaunchbarPosition;
}

const defaultProps: Props = {
  addHideOnBlurListener: noop,
  autoHide: false,
  removeHideOnBlurListener: noop,
  setAutoHide: noop,
  setLaunchbarPosition: noop,
};

class AppOverflow extends React.Component<Props, {}> {
  static defaultProps = defaultProps;

  componentDidMount() {
    this.props.addHideOnBlurListener();
  }

  componentWillUnmount() {
    this.props.removeHideOnBlurListener();
  }

  render() {
    const { autoHide, setAutoHide, setLaunchbarPosition } = this.props;

    return (
      <Window>
        <CTA onClick={() => (autoHide ? setAutoHide(false) : setAutoHide(true))}>{autoHide ? 'Auto Show' : 'Auto Hide'}</CTA>

        <CTA onClick={() => setLaunchbarPosition('TOP')}>Top</CTA>

        <CTA onClick={() => setLaunchbarPosition('RIGHT')}>Right</CTA>

        <CTA onClick={() => setLaunchbarPosition('LEFT')}>Left</CTA>

        <CTA onClick={() => setLaunchbarPosition('BOTTOM')}>Bottom</CTA>
      </Window>
    );
  }
}

export default AppOverflow;
