import { connect } from 'react-redux';

import { deleteLayout, getAllLayouts, restoreLayout } from '../../redux/layouts';
import { State } from '../../redux/types';
import { hideWindow } from '../../redux/windows';

import { LAYOUTS_WINDOW } from '../../config/windows';
import Layouts from './Layouts';

const mapState = (state: State) => ({
  layouts: getAllLayouts(state),
});

const mapDispatch = dispatch => ({
  close: () => dispatch(hideWindow({ name: LAYOUTS_WINDOW })),
  deleteLayout: (id: string) => dispatch(deleteLayout.request(id)),
  restoreLayout: (id: string) => dispatch(restoreLayout.request(id)),
});

export default connect(
  mapState,
  mapDispatch,
)(Layouts);
