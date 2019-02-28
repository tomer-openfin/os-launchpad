import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { dismissUndoUpdateLayoutRequest, saveLayoutRequest, undoUpdateLayoutRequest } from '../../redux/layouts';

import LayoutsUserActions from './LayoutsUserActions';

const mapDispatch = (dispatch: Dispatch) => ({
  dismissUndoLayout: () => dispatch(dismissUndoUpdateLayoutRequest()),
  saveLayout: (name: string, meta: { successCb: (updated: boolean) => void; errorCb: () => void }) => {
    const successCb = ({ updated }) => meta.successCb(updated);

    dispatch(saveLayoutRequest(name, { ...meta, successCb }));
  },
  undoLayout: (meta: { successCb: () => void; errorCb: () => void }) => dispatch(undoUpdateLayoutRequest(meta)),
});

export default connect(
  null,
  mapDispatch,
)(LayoutsUserActions);
