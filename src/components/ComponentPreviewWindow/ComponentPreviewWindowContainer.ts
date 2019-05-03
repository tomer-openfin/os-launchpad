import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { PREVIEW_WINDOW } from '../../config/windows';
import { getAdminPreviewTypeState } from '../../redux/admin';
import { State } from '../../redux/types';
import { hideWindow } from '../../redux/windows';

import ComponentPreviewWindow from './ComponentPreviewWindow';

const mapState = (state: State) => ({
  previewType: getAdminPreviewTypeState(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  handleClose: () => dispatch(hideWindow({ name: PREVIEW_WINDOW })),
});

export default connect(
  mapState,
  mapDispatch,
)(ComponentPreviewWindow);
