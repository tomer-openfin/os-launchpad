import { connect } from 'react-redux';

import { closeContextMenuRequest, getContextMenuOptions } from '../../redux/contextMenu';
import { State } from '../../redux/types';
import ContextMenu from './ContextMenu';
import withFinBlurApplied from './withFinBlurApplied';

const mapState = (state: State) => ({
  options: getContextMenuOptions(state),
});

const mapDispatch = dispatch => ({
  dispatch,
  handleClose: () => dispatch(closeContextMenuRequest()),
});

const mergeProps = ({ options }, { dispatch, handleClose }) => ({
  options: options.map(({ action, label }) => ({
    label,
    onClick: () => {
      dispatch(action);
      handleClose();
    },
  })),
});

export default connect(
  mapState,
  mapDispatch,
  mergeProps,
)(withFinBlurApplied(ContextMenu));
