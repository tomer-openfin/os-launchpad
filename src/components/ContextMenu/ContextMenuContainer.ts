import { connect } from 'react-redux';

import { closeContextMenu, getContextMenuOptions } from '../../redux/contextMenu';
import { State } from '../../redux/types';
import ContextMenu from './ContextMenu';

const mapState = (state: State) => ({
  options: getContextMenuOptions(state),
});

const mapDispatch = dispatch => ({
  dispatch,
  handleClose: () => dispatch(closeContextMenu.request()),
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
)(ContextMenu);
