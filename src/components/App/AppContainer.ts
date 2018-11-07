import { connect } from 'react-redux';

import { launchWindow, WindowConfig } from '../../redux/windows';

import App from './App';

const dispatchProps = dispatch => ({
  launchWindowCreator: (window: WindowConfig) => () => dispatch(launchWindow(window)),
});

export default connect(
  null,
  dispatchProps,
)(App);
