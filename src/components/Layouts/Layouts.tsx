import * as React from 'react';

import * as restoreLayoutIcon from '../../assets/RestoreLayout.svg';
import * as saveLayoutIcon from '../../assets/SaveLayout.svg';

import { noop } from 'redux-saga/utils';
import { LAYOUTS_WINDOW } from '../../config/windows';
import IconSpace from '../IconSpace/index';
import { Wrapper } from './Layouts.css';

interface Props {
  addWindowListener: Function;
  hideWindow: Function;
  launcherPosition: string;
  removeWindowListener: Function;
  restoreCurrentLayout: Function;
  saveCurrentLayout: Function;
}

const defaultProps = {
  addWindowListener: noop,
  hideWindow: noop,
  launcherPosition: 'TOP',
  removeWindowListener: noop,
  restoreCurrentLayout: noop,
  saveCurrentLayout: noop,
};

class Layouts extends React.PureComponent<Props> {
  static defaultProps = defaultProps;

  componentDidMount() {
    this.props.addWindowListener(LAYOUTS_WINDOW, 'blurred', () => this.props.hideWindow(LAYOUTS_WINDOW));
  }

  componentWillUnmount() {
    this.props.removeWindowListener(LAYOUTS_WINDOW, 'blurred', () => this.props.hideWindow(LAYOUTS_WINDOW));
  }

  handleSaveCurrentLayout = () => this.props.saveCurrentLayout();
  handleRestoreCurrentLayout = () => this.props.restoreCurrentLayout();

  render() {
    const { launcherPosition } = this.props;

    return (
      <Wrapper launcherPosition={launcherPosition}>
        <IconSpace iconImg={saveLayoutIcon} onClick={this.handleSaveCurrentLayout} hover />

        <IconSpace iconImg={restoreLayoutIcon} onClick={this.handleRestoreCurrentLayout} hover />
      </Wrapper>
    );
  }
}

export default Layouts;
