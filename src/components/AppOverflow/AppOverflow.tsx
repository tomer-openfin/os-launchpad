import * as React from 'react';

import * as searchIcon from '../../assets/Search.svg';

import {
  Window,
} from './AppOverflow.css';

import noop from '../../utils/noop';
import AppList from '../AppList';

interface Props {
  addHideOnBlurListener;
  removeHideOnBlurListener;
}

const defaultProps: Props = {
  addHideOnBlurListener: noop,
  removeHideOnBlurListener: noop,
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
    return(
      <Window>
        <AppList />
      </Window>
    );
  }
}

export default AppOverflow;
