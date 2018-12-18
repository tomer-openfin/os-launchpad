import { connect } from 'react-redux';

import { State } from '../../redux/types';

import { LAYOUTS_WINDOW } from '../../config/windows';
import withFinBlur from '../../hocs/withFinBlur';
import { getDrawerIsExpanded } from '../../redux/application';
import { getLayoutsIds, restoreLayoutRequest, saveLayout } from '../../redux/layouts';
import { getLauncherPosition } from '../../redux/me';
import { blurWindowWithDelay } from '../../redux/windows';

import Layouts from './Layouts';

const mapState = (state: State) => ({
  isApplicationDrawerExpanded: getDrawerIsExpanded(state),
  launcherPosition: getLauncherPosition(state),
  layoutIds: getLayoutsIds(state),
});

const mapDispatch = dispatch => ({
  onBlur: () => {
    dispatch(blurWindowWithDelay(LAYOUTS_WINDOW));
  },
  restoreLayout: (id: string) => dispatch(restoreLayoutRequest(id)),
  saveLayout: (id: string) => dispatch(saveLayout(id)),
});

export default connect(
  mapState,
  mapDispatch,
)(withFinBlur(Layouts));
