import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { openContextMenuRequest } from '../../redux/contextMenu';
import ContextMenuZone from './ContextMenuZone';

const mapDispatch = (dispatch: Dispatch) => ({
  openContextMenu: options => dispatch(openContextMenuRequest(options)),
});

export default connect(
  null,
  mapDispatch,
)(ContextMenuZone);
