import { connect } from 'react-redux';

import { deleteLayout, getAllLayouts, restoreLayout } from '../../redux/layouts';
import { State } from '../../redux/types';
import { hideWindow } from '../../redux/windows';
import { MetaWithAsyncHandlers, UserLayout } from '../../types/commons';

import { LAYOUTS_WINDOW } from '../../config/windows';
import Layouts from './Layouts';

const mapState = (state: State) => ({
  layouts: getAllLayouts(state),
});

const mapDispatch = dispatch => ({
  close: () => dispatch(hideWindow({ name: LAYOUTS_WINDOW })),
  deleteLayout: (id: string, meta: MetaWithAsyncHandlers<UserLayout['id']>) => dispatch(deleteLayout.request(id, meta)),
  restoreLayout: (id: string) => dispatch(restoreLayout.request(id)),
});

export default connect(
  mapState,
  mapDispatch,
)(Layouts);
