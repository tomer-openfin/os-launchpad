import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { SETTINGS_WINDOW } from '../../config/windows';
import { getIsEnterprise } from '../../redux/application';
import { State } from '../../redux/types';
import { hideWindow } from '../../redux/windows';

import Settings from './Settings';

const mapState = (state: State) => ({
  isEnterprise: getIsEnterprise(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  hideWindow: () => {
    dispatch(hideWindow.request({ name: SETTINGS_WINDOW }));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Settings);
