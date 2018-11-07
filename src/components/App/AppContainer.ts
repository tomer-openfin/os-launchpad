import { connect } from 'react-redux';

import { launchWindow, WindowConfig } from '../../redux/windows';

import App from './App';

const stateToProps = state => {
  const { launcherPosition } = state.me.settings;

  return {
    launcherPosition,
  };
};

const dispatchProps = dispatch => ({
  launchWindowCreator: (window: WindowConfig) => () => dispatch(launchWindow(window)),
});

export default connect(
  stateToProps,
  dispatchProps,
)(App);
