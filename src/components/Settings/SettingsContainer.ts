import { Window } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';

import { SETTINGS_WINDOW } from '../../config/windows';
import { getAutoHide, setAutoHide, setLaunchbarPosition } from '../../redux/me';

import withEscapeKey from '../../hocs/withEscapeKey';
import Settings from './Settings';

const stateProps = state => ({
  autoHide: getAutoHide(state),
});

const dispatchProps = dispatch => ({
  onEscDown: () => {
    dispatch(Window.hideWindow({ id: SETTINGS_WINDOW }));
  },
  setAutoHide,
  setLaunchbarPosition,
});

export default connect(
  stateProps,
  dispatchProps,
)(withEscapeKey(Settings));
