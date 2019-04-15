import { connect } from 'react-redux';

import { closeContextMenu, getContextMenuOptions } from '../../redux/contextMenu';
import { State } from '../../redux/types';
import { EventType, sendAnalytics } from '../../utils/analytics';

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
      sendAnalytics({ type: EventType.Click, label: 'ContextMenu', context: { action } }, { includeAppList: true, includeFinWindows: true });
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
