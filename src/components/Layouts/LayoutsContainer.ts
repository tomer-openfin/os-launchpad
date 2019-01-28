import { connect } from 'react-redux';

import { createLayoutRequest, deleteLayoutRequest, getLayouts, restoreLayoutRequest } from '../../redux/layouts';
import { State } from '../../redux/types';
import { hideWindow } from '../../redux/windows';
import { MetaWithCallbacks } from '../../types/commons';

import { LAYOUTS_WINDOW } from '../../config/windows';
import Layouts from './Layouts';

const mapState = (state: State) => ({
  layouts: getLayouts(state),
});

const mapDispatch = dispatch => ({
  close: () => dispatch(hideWindow(LAYOUTS_WINDOW)),
  deleteLayout: (id: string) => dispatch(deleteLayoutRequest(id)),
  restoreLayout: (id: string) => dispatch(restoreLayoutRequest(id)),
  saveLayout: (name: string, meta: MetaWithCallbacks) => dispatch(createLayoutRequest(name, meta)),
});

export default connect(
  mapState,
  mapDispatch,
)(Layouts);
