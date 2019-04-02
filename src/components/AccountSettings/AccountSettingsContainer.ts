import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import windowsConfig from '../../config/windows';
import { getMeEmail, getMeName } from '../../redux/me';
import { State } from '../../redux/types';
import { launchWindow } from '../../redux/windows';

import AccountSettings from './AccountSettings';

const mapState = (state: State) => ({
  email: getMeEmail(state),
  name: getMeName(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  showSupport: () => dispatch(launchWindow(windowsConfig.support)),
});

export default connect(
  mapState,
  mapDispatch,
)(AccountSettings);
