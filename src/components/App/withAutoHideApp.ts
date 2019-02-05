import { connect } from 'react-redux';

import withAutoHide from '../../hocs/withAutoHide';
import { collapseApp, expandApp, getApplicationIsExpanded } from '../../redux/application';
import { getAutoHide } from '../../redux/me';
import { State } from '../../redux/types';
import { getLauncherIsForceExpanded, getWindowBounds } from '../../redux/windows';
import getAppUuid from '../../utils/getAppUuid';

const APP_UUID = getAppUuid();

const mapState = (state: State) => ({
  autoHide: getAutoHide(state),
  bounds: getWindowBounds(state, APP_UUID),
  isExpanded: getApplicationIsExpanded(state),
  isForceExpanded: getLauncherIsForceExpanded(state),
});

const mapDispatch = dispatch => ({
  collapse: () => dispatch(collapseApp()),
  expand: () => dispatch(expandApp()),
});

export default Component =>
  connect(
    mapState,
    mapDispatch,
  )(withAutoHide(Component));
