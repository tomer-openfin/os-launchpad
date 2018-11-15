import { connect } from 'react-redux';

import withAutoHide from '../../hocs/withAutoHide';
import { collapseApp, expandApp, getApplicationIsExpanded } from '../../redux/application/index';
import { getAutoHide } from '../../redux/me/index';
import { State } from '../../redux/types';
import { getWindowBounds } from '../../redux/windows/index';
import getAppUuid from '../../utils/getAppUuid';

const APP_UUID = getAppUuid();

const mapState = (state: State) => ({
  autoHide: getAutoHide(state),
  bounds: getWindowBounds(state, APP_UUID),
  isExpanded: getApplicationIsExpanded(state),
});

const mapDispatch = dispatch => ({
  collapse: () => dispatch(collapseApp()),
  expand: () => dispatch(expandApp()),
});

export default Component => connect(mapState, mapDispatch)(withAutoHide(Component));
