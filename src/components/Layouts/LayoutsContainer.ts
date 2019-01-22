import { connect } from 'react-redux';

import { State } from '../../redux/types';

import { LAYOUTS_WINDOW } from '../../config/windows';
import withFinBlur from '../../hocs/withFinBlur';
import { createLayoutRequest, deleteLayoutRequest, getLayouts, restoreLayoutRequest } from '../../redux/layouts';
import { blurWindowWithDelay, DEFAULT_BLUR_WINDOW_DELAY } from '../../redux/windows';

import { MetaWithCallbacks } from '../../types/commons';
import Layouts from './Layouts';

const mapState = (state: State) => ({
  layouts: getLayouts(state),
});

const mapDispatch = dispatch => ({
  deleteLayout: (id: string) => dispatch(deleteLayoutRequest(id)),
  onBlur: () => {
    dispatch(blurWindowWithDelay(LAYOUTS_WINDOW, DEFAULT_BLUR_WINDOW_DELAY));
  },
  restoreLayout: (id: string) => dispatch(restoreLayoutRequest(id)),
  saveLayout: (name: string, meta: MetaWithCallbacks) => dispatch(createLayoutRequest(name, meta)),
});

export default connect(
  mapState,
  mapDispatch,
)(withFinBlur(Layouts));
