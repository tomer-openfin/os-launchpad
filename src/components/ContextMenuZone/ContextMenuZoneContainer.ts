import { connect } from 'react-redux';

import { openContextMenuRequest } from '../../redux/contextMenu/index';
import ContextMenuZone from './ContextMenuZone';

const mapDispatch = dispatch => ({
  openContextMenu: options => dispatch(openContextMenuRequest(options)),
});

export default connect(
  null,
  mapDispatch,
)(ContextMenuZone);
