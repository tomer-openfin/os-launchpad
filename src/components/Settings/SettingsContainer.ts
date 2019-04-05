import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { SETTINGS_WINDOW } from '../../config/windows';
import { getIsEnterprise } from '../../redux/application';
import { State } from '../../redux/types';
import { hideWindow } from '../../redux/windows';

import Settings from './Settings';

const stateProps = (state: State) => ({
  isEnterprise: getIsEnterprise(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  hideWindow: () => {
    dispatch(hideWindow({ name: SETTINGS_WINDOW }));
  },
});

export default connect(
  stateProps,
  dispatchProps,
)(Settings);
