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
  setAutoHide: autoHide => dispatch(setAutoHide(autoHide)),
  setLaunchbarPosition: position => dispatch(setLaunchbarPosition(position)),
});

export default connect(
  stateProps,
  dispatchProps,
)(withEscapeKey(Settings));
