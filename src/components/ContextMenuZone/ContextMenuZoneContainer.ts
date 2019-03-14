import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ContextMenuRequestPayload, openContextMenu } from '../../redux/contextMenu';
import ContextMenuZone from './ContextMenuZone';

const mapDispatch = (dispatch: Dispatch) => ({
  openContextMenu: (options: ContextMenuRequestPayload) => dispatch(openContextMenu.request(options)),
});

export default connect(
  null,
  mapDispatch,
)(ContextMenuZone);
